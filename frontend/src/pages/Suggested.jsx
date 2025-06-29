import React, { useState } from 'react';

const Suggested = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      question: "How do I reset my password?",
      count: 5,
      server: "Tech Community",
      firstAsked: "2 days ago",
      lastAsked: "30 min ago",
      status: "pending"
    },
    {
      id: 2,
      question: "What are the system requirements?",
      count: 3,
      server: "Dev Server",
      firstAsked: "1 day ago",
      lastAsked: "2 hours ago",
      status: "pending"
    },
    {
      id: 3,
      question: "Can I use this commercially?",
      count: 4,
      server: "General Chat",
      firstAsked: "3 days ago",
      lastAsked: "1 hour ago",
      status: "pending"
    }
  ]);

  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [answer, setAnswer] = useState('');

  const handleApprove = (id, answerText) => {
    setSuggestions(prev => 
      prev.map(s => s.id === id ? { ...s, status: 'approved' } : s)
    );
    setSelectedSuggestion(null);
    setAnswer('');
    // Here you would typically send the approved FAQ to your backend
  };

  const handleIgnore = (id) => {
    setSuggestions(prev => 
      prev.map(s => s.id === id ? { ...s, status: 'ignored' } : s)
    );
  };

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Pending Suggestions</h2>
        <p className="text-gray-600">Review and approve frequently asked questions that need answers.</p>
      </div>

      {/* Alert for pending suggestions */}
      {pendingSuggestions.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-orange-600 text-lg">⚠️</span>
            <div>
              <h3 className="font-semibold text-orange-800">
                {pendingSuggestions.length} question{pendingSuggestions.length !== 1 ? 's' : ''} need{pendingSuggestions.length === 1 ? 's' : ''} your attention
              </h3>
              <p className="text-sm text-orange-600">These questions have been asked multiple times by users.</p>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions List */}
      <div className="space-y-4">
        {pendingSuggestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">All caught up!</h3>
            <p className="text-gray-500">No pending suggestions at the moment.</p>
          </div>
        ) : (
          pendingSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-orange-500">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    "{suggestion.question}"
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span>🔢</span>
                      <span>Asked {suggestion.count} times</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>🏠</span>
                      <span>{suggestion.server}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>⏰</span>
                      <span>Last asked {suggestion.lastAsked}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedSuggestion(suggestion)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    ✅ Answer
                  </button>
                  <button
                    onClick={() => handleIgnore(suggestion.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
                  >
                    🚫 Ignore
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Answer Modal */}
      {selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add Answer for Question
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-700">Question:</p>
                <p className="text-gray-600">"{selectedSuggestion.question}"</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Enter a helpful answer for this question..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedSuggestion(null);
                    setAnswer('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApprove(selectedSuggestion.id, answer)}
                  disabled={!answer.trim()}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Save FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggested;