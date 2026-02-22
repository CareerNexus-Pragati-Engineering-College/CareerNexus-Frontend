import React from "react";

const QuestionPanel = ({ question }) => {
  if (!question) return <div className="p-6 text-gray-500">No question data available.</div>;

  return (
    <div className="h-full overflow-y-auto bg-gray-900 text-gray-200 p-6 min-h-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{question.title}</h2>
        <div className="flex gap-4 text-xs font-semibold">
            <span className="px-2 py-1 bg-green-900/40 text-green-400 rounded">Points: {question.points}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-400 mb-2 border-b border-gray-800 pb-1">Description</h3>
        <div className="whitespace-pre-wrap leading-relaxed text-sm text-gray-300">
          {question.description}
        </div>
      </div>

      {question.constraints && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2 border-b border-gray-800 pb-1">Constraints</h3>
          <div className="whitespace-pre-wrap leading-relaxed text-sm text-gray-400 italic">
            {question.constraints}
          </div>
        </div>
      )}

      {question.publicTestCases && question.publicTestCases.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2 border-b border-gray-800 pb-1">Example Test Cases</h3>
          <div className="space-y-4">
            {question.publicTestCases.map((tc, idx) => (
              <div key={idx} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block mb-1">Input:</span>
                    <pre className="text-xs bg-black/30 p-2 rounded">{tc.input || "(Empty)"}</pre>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 block mb-1">Expected Output:</span>
                    <pre className="text-xs bg-black/30 p-2 rounded">{tc.expectedOutput}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;