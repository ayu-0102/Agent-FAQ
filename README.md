# FAQ-Agent
# 🤖 FAQ Agent — Smart Discord FAQ Bot

FAQ Agent is an intelligent Discord bot that answers frequently asked questions using semantic similarity. Built with embeddings and natural language understanding, it learns from your responses and becomes smarter over time.

---

## 🚀 Features

- 💬 **Semantic FAQ Matching** — Understands and matches user queries using embeddings.
- 🤝 **Admin Training Mode** — Notifies admins when a question is asked 3+ times and allows them to respond with an answer.
- 🧠 **Self-learning** — New questions and answers get added dynamically to the server-specific FAQ.
- 💾 **Server-specific Storage** — Each server has its own `faq-<guildId>.json` file for data isolation.
- 🌐 **Multi-server Support** — Works seamlessly across multiple Discord servers.
- 🔒 **Environment-Safe** — No sensitive data (like your `.env`) is tracked by Git.

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

git clone https://github.com/YourUsername/FAQ-Agent.git
cd FAQ-Agent
2. Install Dependencies

npm install

3. Create Your .env File
Make a .env file in the root directory with the following content:

DISCORD_TOKEN=your_discord_bot_token

4. Run the Bot

node index.js

 Example Usage
A user asks a question.

The bot checks all known FAQs using semantic similarity.

If a match is found (score ≥ 0.85), the bot replies with the answer.

If no match is found, and the same question (or similar) is asked 3+ times, the bot DMs the server owner/admin to add it as a new FAQ.
