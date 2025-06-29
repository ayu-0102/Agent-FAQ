import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import FAQManager from './pages/FAQManager';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Suggested from './pages/Suggested';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Main App Routes */}
        <Route path="/*" element={
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/faq" element={<FAQManager />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/suggested" element={<Suggested />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}