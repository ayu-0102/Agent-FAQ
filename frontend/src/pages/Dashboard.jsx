import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Total FAQs', value: '24', icon: '❓', color: 'bg-blue-500' },
    { label: 'Questions Answered', value: '156', icon: '✅', color: 'bg-green-500' },
    { label: 'Active Servers', value: '3', icon: '🏠', color: 'bg-purple-500' },
    { label: 'Pending Suggestions', value: '7', icon: '⏳', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to the FAQ Bot Admin Dashboard. Monitor your bot's performance and manage settings.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} rounded-full p-3 text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New FAQ added', details: '"How to setup the bot?"', time: '2 minutes ago', type: 'success' },
            { action: 'Question answered', details: 'User asked about installation', time: '5 minutes ago', type: 'info' },
            { action: 'Suggestion received', details: 'New FAQ suggestion pending', time: '10 minutes ago', type: 'warning' },
            { action: 'Server connected', details: 'Bot joined "Tech Community"', time: '1 hour ago', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;