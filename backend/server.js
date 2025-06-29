const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Faq = require('../models/Faq');
const UnknownQuestion = require('../models/UnknownQuestion');
const { getEmbedding } = require('./embedding');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected for API server"))
.catch((err) => console.error("❌ MongoDB error", err));

// Routes

// Get all FAQs for a guild
app.get('/api/faqs/:guildId', async (req, res) => {
  try {
    const { guildId } = req.params;
    const faqs = await Faq.find({ guildId }).sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all FAQs (for admin dashboard)
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new FAQ
app.post('/api/faqs', async (req, res) => {
  try {
    const { guildId, question, answer } = req.body;
    
    // Generate embedding for the question
    const embedding = await getEmbedding(question);
    if (!embedding) {
      return res.status(400).json({ error: 'Failed to generate embedding' });
    }

    const faq = new Faq({
      guildId,
      question,
      answer,
      embedding,
      createdAt: new Date()
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update FAQ
app.put('/api/faqs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    
    // Generate new embedding if question changed
    const embedding = await getEmbedding(question);
    if (!embedding) {
      return res.status(400).json({ error: 'Failed to generate embedding' });
    }

    const faq = await Faq.findByIdAndUpdate(
      id,
      { question, answer, embedding, updatedAt: new Date() },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete FAQ
app.delete('/api/faqs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);
    
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get unknown questions
app.get('/api/unknown-questions', async (req, res) => {
  try {
    const unknownQuestions = await UnknownQuestion.find().sort({ count: -1, createdAt: -1 });
    res.json(unknownQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convert unknown question to FAQ
app.post('/api/unknown-questions/:id/convert', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    
    const unknownQuestion = await UnknownQuestion.findById(id);
    if (!unknownQuestion) {
      return res.status(404).json({ error: 'Unknown question not found' });
    }

    // Create new FAQ
    const faq = new Faq({
      guildId: unknownQuestion.guildId,
      question: unknownQuestion.text,
      answer,
      embedding: unknownQuestion.embedding,
      createdAt: new Date()
    });

    await faq.save();
    await UnknownQuestion.findByIdAndDelete(id);

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete unknown question
app.delete('/api/unknown-questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const unknownQuestion = await UnknownQuestion.findByIdAndDelete(id);
    
    if (!unknownQuestion) {
      return res.status(404).json({ error: 'Unknown question not found' });
    }

    res.json({ message: 'Unknown question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats
app.get('/api/stats', async (req, res) => {
  try {
    const totalFaqs = await Faq.countDocuments();
    const unknownQuestions = await UnknownQuestion.countDocuments();
    
    // Mock data for now - you can implement real analytics later
    const stats = {
      totalFaqs,
      unknownQuestions,
      accuracy: 94.2,
      todaysQuestions: 18,
      recentQuestions: await Faq.find().sort({ createdAt: -1 }).limit(5)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI Suggest endpoint (mock for now)
app.post('/api/ai-suggest', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Mock AI suggestion - you can integrate with your preferred AI service
    const suggestions = {
      "how to reset password": "To reset your password, please follow these steps: 1) Go to the login page and click 'Forgot Password', 2) Enter your email address, 3) Check your email for a reset link, 4) Click the link and create a new password.",
      "system requirements": "Our system requires a modern web browser with JavaScript enabled, minimum 4GB RAM, and a stable internet connection.",
      "contact support": "You can reach our support team through email at support@example.com or through our Discord server.",
      "pricing": "We offer flexible pricing plans starting from $9.99/month for basic features up to $49.99/month for enterprise solutions."
    };

    const lowerQuestion = question.toLowerCase();
    let suggestion = "I'd be happy to help you create an answer for this question. Please provide the detailed response you'd like users to see.";

    for (const [key, value] of Object.entries(suggestions)) {
      if (lowerQuestion.includes(key)) {
        suggestion = value;
        break;
      }
    }

    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});