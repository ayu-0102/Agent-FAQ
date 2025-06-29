import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    similarityThreshold: 0.85,
    adminNotificationCount: 3,
    autoLearnEnabled: true,
    apiKey: '••••••••••••••••',
    exportFormat: 'json'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    // Mock export functionality
    const data = {
      faqs: [
        { question: "Sample question", answer: "Sample answer" }
      ],
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faq-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Configure your FAQ bot settings and manage data exports.</p>
      </div>

      {/* Bot Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bot Configuration</h3>
        
        <div className="space-y-6">
          {/* Similarity Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Similarity Threshold
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={settings.similarityThreshold}
                onChange={(e) => handleSettingChange('similarityThreshold', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
                {(settings.similarityThreshold * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Questions with similarity above this threshold will be automatically answered
            </p>
          </div>

          {/* Admin Notification Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Notification Threshold
            </label>
            <select
              value={settings.adminNotificationCount}
              onChange={(e) => handleSettingChange('adminNotificationCount', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>After 1 question</option>
              <option value={2}>After 2 questions</option>
              <option value={3}>After 3 questions</option>
              <option value={5}>After 5 questions</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Notify admin when a question is asked this many times
            </p>
          </div>

          {/* Auto Learning */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.autoLearnEnabled}
                onChange={(e) => handleSettingChange('autoLearnEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Enable Auto-Learning</span>
                <p className="text-xs text-gray-500">
                  Automatically track unknown questions and suggest new FAQs
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">API Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Gemini API key"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Test
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Required for generating embeddings and semantic similarity
            </p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={settings.exportFormat}
              onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              📥 Export FAQs
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              📤 Import FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-red-500">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
            <div>
              <h4 className="font-medium text-red-800">Clear All FAQs</h4>
              <p className="text-sm text-red-600">This will permanently delete all FAQ data</p>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
              Clear All
            </button>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
            <div>
              <h4 className="font-medium text-red-800">Reset Bot Settings</h4>
              <p className="text-sm text-red-600">Reset all settings to default values</p>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          💾 Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;