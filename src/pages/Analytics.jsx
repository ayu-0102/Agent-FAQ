import React from 'react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Statistics</h1>
            <p className="text-gray-600 mt-1">Insights into your FAQ performance and user engagement</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <span>📊</span>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">❓</span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +12%</span>
              <span className="text-gray-500 ml-1">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Match Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">87.3%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +2.1%</span>
              <span className="text-gray-500 ml-1">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">0.8s</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">⚡</span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ 15%</span>
              <span className="text-gray-500 ml-1">faster</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">User Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">4.6/5</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">⭐</span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">↗ +0.2</span>
              <span className="text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Questions Over Time */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Questions Over Time</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Unanswered</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full flex flex-col space-y-1">
                    <div className={`bg-blue-500 rounded-t ${index === 4 ? 'h-32' : index === 3 ? 'h-24' : index === 1 ? 'h-20' : 'h-16'}`}></div>
                    <div className="bg-red-500 h-4 rounded-b"></div>
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy Trend */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Accuracy Trend</h3>
              <span className="text-sm text-green-600 font-medium">↗ Improving</span>
            </div>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  points="0,150 50,140 100,130 150,120 200,110 250,100 300,90 350,80 400,70"
                />
                <circle cx="400" cy="70" r="4" fill="#10B981" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Asked FAQs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Asked FAQs</h3>
            <div className="space-y-4">
              {[
                { question: "How do I reset my password?", category: "Security & Account", count: 847 },
                { question: "What are your business hours?", category: "General Information", count: 623 },
                { question: "How do I cancel my subscription?", category: "Billing & Payments", count: 456 },
                { question: "Where can I find my invoice?", category: "Billing & Payments", count: 389 },
                { question: "How do I contact support?", category: "Support & Help", count: 312 },
              ].map((faq, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                    <p className="text-xs text-gray-500">{faq.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{faq.count}</p>
                    <p className="text-xs text-gray-500">asks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Questions by Category */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Questions by Category</h3>
            <div className="space-y-4">
              {[
                { category: "Security & Account", percentage: 35, color: "bg-blue-500" },
                { category: "Billing & Payments", percentage: 28, color: "bg-green-500" },
                { category: "General Information", percentage: 22, color: "bg-purple-500" },
                { category: "Support & Help", percentage: 15, color: "bg-yellow-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Peak Question Hours */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Peak Question Hours</h4>
              <div className="flex items-end justify-between space-x-1 h-16">
                {['9AM', '11AM', '2PM', '4PM', '6PM', '8PM'].map((time, index) => (
                  <div key={time} className="flex flex-col items-center space-y-1 flex-1">
                    <div className={`bg-blue-500 rounded-t w-full ${
                      index === 2 || index === 3 ? 'h-12' : index === 1 ? 'h-8' : 'h-6'
                    }`}></div>
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;