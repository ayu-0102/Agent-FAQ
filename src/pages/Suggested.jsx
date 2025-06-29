import React, { useState } from 'react';

const Suggested = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedGuild, setSelectedGuild] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ question, answer, selectedGuild });
  };

  const suggestedAnswer = "To reset your password, please follow these steps: 1) Go to the login page and click \"Forgot Password\", 2) Enter your email address, 3) Check your email for a reset link, 4) Click the link and create a new password. If you don't receive the email within 5 minutes, please check your spam folder or contact support.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ← Back to FAQs
            </button>
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
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New FAQ</h1>
          <p className="text-gray-600">Create a new frequently asked question and answer</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Guild/Event Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guild/Event
            </label>
            <select
              value={selectedGuild}
              onChange={(e) => setSelectedGuild(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Guild/Event</option>
              <option value="guild1">Tech Community</option>
              <option value="guild2">Dev Server</option>
              <option value="guild3">General Chat</option>
            </select>
          </div>

          {/* Question */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the frequently asked question..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Answer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <button
                type="button"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>✨</span>
                <span>AI Suggest</span>
              </button>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the detailed answer to this question..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              Provide a clear, comprehensive answer that addresses the question completely.
            </p>
          </div>

          {/* AI Suggested Answer */}
          <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-purple-600">✨</span>
              <h3 className="text-sm font-medium text-purple-800">AI Suggested Answer</h3>
            </div>
            <p className="text-sm text-purple-700 mb-4">
              Based on your question, here's a suggested answer that you can use or modify:
            </p>
            <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
              <p className="text-sm text-gray-700">{suggestedAnswer}</p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
              >
                Use This Answer
              </button>
              <button
                type="button"
                className="text-purple-600 hover:text-purple-700 px-4 py-2 text-sm font-medium"
              >
                Regenerate
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Suggested;