require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { getEmbedding } = require('./embedding');
const { cosineSimilarity } = require('./similarity');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: ['CHANNEL'],
});

const faqCache = new Map(); // guildId => [FAQs]
const pendingFaqReplies = new Map(); // adminId => { guildId, question }
const unknownQuestions = new Map(); // guildId => [questions]

function getFaqFilePath(guildId) {
  return path.join(__dirname, `faq-${guildId}.json`);
}

async function loadFaqsForGuild(guildId) {
  if (faqCache.has(guildId)) return faqCache.get(guildId);

  const filePath = getFaqFilePath(guildId);
  let faqs = [];
  if (fs.existsSync(filePath)) {
    faqs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  for (const faq of faqs) {
    if (!faq.embedding) {
      console.log(`🔄 Generating embedding for: "${faq.question}" in guild ${guildId}`);
      faq.embedding = await getEmbedding(faq.question);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(faqs, null, 2));
  faqCache.set(guildId, faqs);
  return faqs;
}

function saveFaqsForGuild(guildId, faqs) {
  const filePath = getFaqFilePath(guildId);
  fs.writeFileSync(filePath, JSON.stringify(faqs, null, 2));
  faqCache.set(guildId, faqs);
}

client.once('ready', () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const isDM = message.channel.type === 1;
  const userMsg = message.content.toLowerCase().trim();

  // Handle admin replies in DMs
  if (isDM) {
    const pending = pendingFaqReplies.get(message.author.id);
    if (pending) {
      const { guildId, question } = pending;

      if (userMsg === 'skip') {
        await message.reply("✅ Skipped saving the question.");
        pendingFaqReplies.delete(message.author.id);
        return;
      }

      const embedding = await getEmbedding(question);
      const faqs = await loadFaqsForGuild(guildId);
      faqs.push({ question, answer: message.content.trim(), embedding });
      saveFaqsForGuild(guildId, faqs);

      await message.reply("✅ New FAQ saved successfully!");
      console.log(`✅ Saved new FAQ for guild ${guildId}: "${question}" -> "${message.content.trim()}"`);

      pendingFaqReplies.delete(message.author.id);
      return;
    }
  }

  // Ignore messages not in a guild
  if (!message.guild) return;

  const guildId = message.guild.id;
  const faqs = await loadFaqsForGuild(guildId);
  const userEmbedding = await getEmbedding(userMsg);
  if (!userEmbedding) return;

  let bestMatch = null;
  let bestScore = 0.0;

  for (const faq of faqs) {
    const score = cosineSimilarity(userEmbedding, faq.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestScore >= 0.85) {
    console.log(`🧠 Matched with "${bestMatch.question}" in guild ${guildId} (score: ${bestScore.toFixed(2)})`);
    message.channel.send(bestMatch.answer);
    return;
  }

  // Track unknown questions
  if (!unknownQuestions.has(guildId)) unknownQuestions.set(guildId, []);
  const unknowns = unknownQuestions.get(guildId);
  unknowns.push({ text: userMsg, embedding: userEmbedding });

  // Match unknowns
  const matchCounts = new Map();

  for (let i = 0; i < unknowns.length; i++) {
    for (let j = i + 1; j < unknowns.length; j++) {
      const score = cosineSimilarity(unknowns[i].embedding, unknowns[j].embedding);
      if (score >= 0.8) {
        const key = unknowns[i].text;
        matchCounts.set(key, (matchCounts.get(key) || 1) + 1);

        if (matchCounts.get(key) >= 3) {
          // Find admin to notify
          let adminUser;
          try {
            const owner = await message.guild.fetchOwner();
            adminUser = owner.user;
          } catch {
            const members = await message.guild.members.fetch();
            const admins = members.filter(m =>
              m.permissions.has(PermissionsBitField.Flags.Administrator) && !m.user.bot
            );
            adminUser = admins.first()?.user;
          }

          if (!adminUser) {
            console.warn(`⚠️ No admin found to notify in guild: ${message.guild.name}`);
            return;
          }

          await adminUser.send(
            `❓ A similar unknown question has been asked 3+ times in **${message.guild.name}**:\n\n**"${key}"**\n\nReply with an answer or type \`skip\` to ignore.`
          );
          pendingFaqReplies.set(adminUser.id, { guildId, question: key });
          unknowns.length = 0;
          return;
        }
      }
    }
  }

  message.channel.send("🤔 I'm not sure how to answer that yet.");
});

client.login(process.env.DISCORD_TOKEN);
