import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFaqs: 0,
    unknownQuestions: 0,
    accuracy: 0,
    todaysQuestions: 0,
    recentQuestions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-2xl font-bold text-gray-900">{stats.totalFaqs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Unknown Questions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unknownQuestions}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.todaysQuestions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Questions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent FAQs</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentQuestions.length > 0 ? (
                stats.recentQuestions.map((faq, index) => (
                  <div key={faq._id || index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                      <p className="text-xs text-gray-500">
                        Guild: {faq.guildId} • Created: {new Date(faq.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent FAQs found.</p>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => window.location.href = '/activity'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
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