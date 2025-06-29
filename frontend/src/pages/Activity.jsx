import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const Activity = () => {
  const [unknownQuestions, setUnknownQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answerModal, setAnswerModal] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchUnknownQuestions();
  }, []);

  const fetchUnknownQuestions = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getUnknownQuestions();
      setUnknownQuestions(data);
    } catch (error) {
      console.error('Failed to fetch unknown questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuestion = (index) => {
    setSelectedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === unknownQuestions.length 
        ? [] 
        : unknownQuestions.map((_, index) => index)
    );
  };

  const handleConvertToFaq = async (question, answerText) => {
    try {
      await ApiService.convertUnknownQuestion(question._id, answerText);
      setUnknownQuestions(prev => prev.filter(q => q._id !== question._id));
      setAnswerModal(null);
      setAnswer('');
    } catch (error) {
      console.error('Failed to convert question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await ApiService.deleteUnknownQuestion(questionId);
      setUnknownQuestions(prev => prev.filter(q => q._id !== questionId));
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const getPriorityColor = (count) => {
    if (count >= 5) return 'red';
    if (count >= 3) return 'yellow';
    return 'green';
  };

  const getPriorityLabel = (count) => {
    if (count >= 5) return 'High';
    if (count >= 3) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading unknown questions...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Unknown Questions</h1>
            <p className="text-gray-600 mt-1">Review and manage unrecognized questions ({unknownQuestions.length} pending)</p>
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
        {unknownQuestions.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedQuestions.length === unknownQuestions.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Select All</span>
              </label>
              {selectedQuestions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedQuestions.length} selected</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {unknownQuestions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">All caught up!</h3>
              <p className="text-gray-500">No unknown questions at the moment.</p>
            </div>
          ) : (
            unknownQuestions.map((question, index) => {
              const priority = getPriorityLabel(question.count);
              const priorityColor = getPriorityColor(question.count);
              
              return (
                <div key={question._id} className="bg-white rounded-xl border border-gray-200 p-6">
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
                          priorityColor === 'red' 
                            ? 'bg-red-100 text-red-800' 
                            : priorityColor === 'yellow'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {priority} Priority
                        </span>
                        <span className="text-sm text-gray-500">
                          Asked {question.count} time{question.count !== 1 ? 's' : ''}
                        </span>
                        <span className="text-sm text-gray-500">
                          Guild: {question.guildId}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        "{question.text}"
                      </h3>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setAnswerModal(question)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                        >
                          Add to FAQs
                        </button>
                        <button 
                          onClick={() => handleDeleteQuestion(question._id)}
                          className="text-red-600 hover:text-red-700 px-4 py-2 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Answer Modal */}
        {answerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Add Answer for Question
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="font-medium text-gray-700">Question:</p>
                  <p className="text-gray-600">"{answerModal.text}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Asked {answerModal.count} times in Guild: {answerModal.guildId}
                  </p>
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
                      setAnswerModal(null);
                      setAnswer('');
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConvertToFaq(answerModal, answer)}
                    disabled={!answer.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Save as FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;