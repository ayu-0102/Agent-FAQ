import React, { useState } from 'react';
import FAQForm from '../components/faqForm';
import FAQTable from '../components/faqTable';

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);

  const handleAdd = (faq) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const handleDelete = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage FAQs</h2>
      <FAQForm onAdd={handleAdd} />
      <div className="mt-8">
        <FAQTable faqs={faqs} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default FAQManager;

