const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // FAQ endpoints
  async getFaqs(guildId = null) {
    const endpoint = guildId ? `/faqs/${guildId}` : '/faqs';
    return this.request(endpoint);
  }

  async createFaq(faqData) {
    return this.request('/faqs', {
      method: 'POST',
      body: JSON.stringify(faqData),
    });
  }

  async updateFaq(id, faqData) {
    return this.request(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    });
  }

  async deleteFaq(id) {
    return this.request(`/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  // Unknown questions endpoints
  async getUnknownQuestions() {
    return this.request('/unknown-questions');
  }

  async convertUnknownQuestion(id, answer) {
    return this.request(`/unknown-questions/${id}/convert`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    });
  }

  async deleteUnknownQuestion(id) {
    return this.request(`/unknown-questions/${id}`, {
      method: 'DELETE',
    });
  }

  // Stats endpoint
  async getStats() {
    return this.request('/stats');
  }

  // AI Suggest endpoint
  async getAiSuggestion(question) {
    return this.request('/ai-suggest', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  }
}

export default new ApiService();