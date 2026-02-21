import React from "react";

const QuestionPanel = ({ question }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-900 text-gray-200 p-6 min-h-0">
      <h2 className="text-xl font-bold text-green-400 mb-4">
        Programming Question
      </h2>

      <div className="whitespace-pre-wrap leading-relaxed text-sm">
        {question}
      </div>
    </div>
  );
};

export default QuestionPanel;