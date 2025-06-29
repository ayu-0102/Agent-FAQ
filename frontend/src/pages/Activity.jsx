import React from 'react';

const Activity = () => {
  const recentQuestions = [
    { question: "How do I install the bot?", similarity: 0.92, answered: true, server: "Tech Community", time: "2 min ago" },
    { question: "What are the requirements?", similarity: 0.87, answered: true, server: "Dev Server", time: "5 min ago" },
    { question: "How to configure settings?", similarity: 0.45, answered: false, server: "Help Desk", time: "8 min ago" },
    { question: "Is this bot free?", similarity: 0.91, answered: true, server: "General Chat", time: "12 min ago" },
    { question: "Can I customize responses?", similarity: 0.38, answered: false, server: "Tech Community", time: "15 min ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Recent Questions & Semantic Activity</h2>
        <p className="text-gray-600">Monitor user questions, semantic similarity scores, and bot performance.</p>
      </div>

      {/* Semantic Threshold Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-lg">🎯</span>
          <div>
            <h3 className="font-semibold text-blue-800">Semantic Similarity Threshold</h3>
            <p className="text-sm text-blue-600">Questions with similarity ≥ 0.85 are automatically answered</p>
          </div>
        </div>
      </div>

      {/* Recent Questions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Recent User Questions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Similarity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentQuestions.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{item.question}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.server}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-sm font-medium ${
                        item.similarity >= 0.85 ? 'text-green-600' : 
                        item.similarity >= 0.5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(item.similarity * 100).toFixed(0)}%
                      </div>
                      <div className={`ml-2 w-16 bg-gray-200 rounded-full h-2`}>
                        <div 
                          className={`h-2 rounded-full ${
                            item.similarity >= 0.85 ? 'bg-green-500' : 
                            item.similarity >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.similarity * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.answered 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.answered ? '✅ Answered' : '❌ No Match'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Successfully Answered</div>
              <div className="text-2xl font-bold text-gray-900">87%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">?</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Avg. Similarity Score</div>
              <div className="text-2xl font-bold text-gray-900">0.73</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-blue-600 font-semibold">#</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Questions Today</div>
              <div className="text-2xl font-bold text-gray-900">42</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;