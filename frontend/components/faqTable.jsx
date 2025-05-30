import React from "react";

function FAQTable({ faqs, onDelete }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">📋 FAQ List</h2>
      <table className="min-w-full border text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Question</th>
            <th className="p-2 border">Answer</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq, i) => (
            <tr key={i}>
              <td className="p-2 border">{faq.question}</td>
              <td className="p-2 border">{faq.answer}</td>
              <td className="p-2 border">
                <button
                  onClick={() => onDelete(i)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FAQTable;
