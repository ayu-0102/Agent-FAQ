import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {/* 404 Icon */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gray-400 text-4xl">🔍</span>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium inline-block"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/faq"
              className="w-full text-blue-600 border border-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium inline-block"
            >
              Browse FAQs
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/activity" className="text-blue-600 hover:text-blue-700">
                Unknown Questions
              </Link>
              <Link to="/suggested" className="text-blue-600 hover:text-blue-700">
                Add FAQ
              </Link>
              <Link to="/settings" className="text-blue-600 hover:text-blue-700">
                Team Management
              </Link>
              <Link to="/analytics" className="text-blue-600 hover:text-blue-700">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;