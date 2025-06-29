import React, { useState } from 'react';

const FAQManager = () => {
  const [faqs] = useState([
    { question: "How do I reset my password?", answer: "To reset your password, go to the login page and click...", created: "2 days ago" },
    { question: "What are the system requirements?", answer: "Our system requires a modern web browser with...", created: "3 days ago" },
    { question: "How do I export my data?", answer: "You can export your data by navigating to Settings...", created: "1 week ago" },
    { question: "What is the pricing structure?", answer: "We offer flexible pricing plans starting from...", created: "2 weeks ago" },
    { question: "How do I contact support?", answer: "You can reach our support team through email...", created: "3 weeks ago" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FAQs Management</h1>
            <p className="text-gray-600 mt-1">Manage your frequently asked questions</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Welcome, John Doe</span>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
              <option>Sort by: Most Asked</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
            <span>➕</span>
            <span>Add New FAQ</span>
          </button>
        </div>

        {/* FAQ Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {faq.question}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md truncate">
                      {faq.answer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {faq.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">✏️</button>
                    <button className="text-red-600 hover:text-red-900">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing 1 to 5 of 247 results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Previous</button>
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">2</button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">3</button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQManager;