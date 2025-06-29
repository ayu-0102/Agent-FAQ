import React, { useState } from 'react';
import FAQForm from '../components/faqForm';
import FAQTable from '../components/faqTable';

const FAQManager = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How do I contribute to this project?",
      answer: "You can contribute by forking the repository, making your changes, and submitting a pull request."
    },
    {
      question: "What technologies are used in this bot?",
      answer: "This bot uses Discord.js, MongoDB, Google Gemini AI for embeddings, and React for the admin interface."
    }
  ]);

  const handleAdd = (faq) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const handleDelete = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage FAQs</h2>
        <p className="text-gray-600">Add, edit, and manage frequently asked questions for your Discord bot.</p>
      </div>
      
      <FAQForm onAdd={handleAdd} />
      
      <FAQTable faqs={faqs} onDelete={handleDelete} />
    </div>
  );
};

export default FAQManager;