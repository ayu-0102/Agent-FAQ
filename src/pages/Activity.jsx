import React, { useState } from 'react';

const Activity = () => {
  const [questions] = useState([
    { 
      question: "How do I integrate with Slack?", 
      priority: "High", 
      suggestedAnswer: "To integrate with Slack, you'll need to create a Slack app and configure webhooks...",
      color: "red"
    },
    { 
      question: "Can I export user data?", 
      priority: "Medium", 
      suggestedAnswer: "Yes, you can export user data by going to Settings > Data Export...",
      color: "yellow"
    },
    { 
      question: "What's the API rate limit?", 
      priority: "Low", 
      suggestedAnswer: "Our API has a rate limit of 1000 requests per hour for standard accounts...",
      color: "green"
    },
    { 
      question: "How to setup webhooks?", 
      priority: "High", 
      suggestedAnswer: "Webhooks can be configured in your dashboard under Integrations...",
      color: "red"
    },
  ]);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleSelectQuestion = (index) => {
    setSelectedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === questions.length 
        ? [] 
        : questions.map((_, index) => index)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Unknown Questions</h1>
            <p className="text-gray-600 mt-1">Review and manage unrecognized questions</p>
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
        {/* Bulk Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedQuestions.length === questions.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
            {selectedQuestions.length > 0 && (
              <div className="flex items-center space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                  Bulk Add to FAQs ({selectedQuestions.length})
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                  Bulk Delete ({selectedQuestions.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(index)}
                  onChange={() => handleSelectQuestion(index)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : item.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    "{item.question}"
                  </h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-blue-600">🤖</span>
                      <h4 className="text-sm font-medium text-blue-800">AI Suggested Answer</h4>
                    </div>
                    <p className="text-sm text-blue-700">{item.suggestedAnswer}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                      Add to FAQs
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 px-4 py-2 text-sm font-medium">
                      Edit Answer
                    </button>
                    <button className="text-red-600 hover:text-red-700 px-4 py-2 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Load More Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;