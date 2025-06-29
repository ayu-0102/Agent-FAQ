import React from "react";

function FAQTable({ faqs, onDelete }) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📋 FAQ List</h2>
        <p className="text-gray-500 text-center py-8">No FAQs added yet. Add your first FAQ above!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">📋 FAQ List ({faqs.length})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border border-gray-300 text-left font-medium text-gray-700">Question</th>
              <th className="p-3 border border-gray-300 text-left font-medium text-gray-700">Answer</th>
              <th className="p-3 border border-gray-300 text-center font-medium text-gray-700 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300 max-w-xs">
                  <div className="break-words">{faq.question}</div>
                </td>
                <td className="p-3 border border-gray-300 max-w-md">
                  <div className="break-words">{faq.answer}</div>
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  <button
                    onClick={() => onDelete(i)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 text-sm"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FAQTable;