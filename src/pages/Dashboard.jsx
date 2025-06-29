import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Monitor your FAQ system performance and activity</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">❓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total FAQs</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Unanswered</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">🕐</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Questions</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Questions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent User Questions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { question: "How do I reset my password?", status: "matched", time: "2 minutes ago", color: "blue" },
                { question: "What are the system requirements?", status: "matched", time: "15 minutes ago", color: "green" },
                { question: "Can I integrate with third-party tools?", status: "no-match", time: "1 hour ago", color: "orange" },
                { question: "How do I export my data?", status: "matched", time: "2 hours ago", color: "blue" },
                { question: "What is the pricing structure?", status: "matched", time: "3 hours ago", color: "green" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    item.color === 'blue' ? 'bg-blue-500' :
                    item.color === 'green' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.question}</p>
                    <p className="text-xs text-gray-500">
                      Asked {item.time} • {item.status === 'matched' ? 'Matched with existing FAQ' : 'No match found'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Review Unknown Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;