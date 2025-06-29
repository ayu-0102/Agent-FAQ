import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useFaqs = (guildId = null) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getFaqs(guildId);
      setFaqs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createFaq = async (faqData) => {
    try {
      const newFaq = await ApiService.createFaq(faqData);
      setFaqs(prev => [newFaq, ...prev]);
      return newFaq;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateFaq = async (id, faqData) => {
    try {
      const updatedFaq = await ApiService.updateFaq(id, faqData);
      setFaqs(prev => prev.map(faq => faq._id === id ? updatedFaq : faq));
      return updatedFaq;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFaq = async (id) => {
    try {
      await ApiService.deleteFaq(id);
      setFaqs(prev => prev.filter(faq => faq._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [guildId]);

  return {
    faqs,
    loading,
    error,
    createFaq,
    updateFaq,
    deleteFaq,
    refetch: fetchFaqs
  };
};