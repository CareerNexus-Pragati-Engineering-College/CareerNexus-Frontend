import React from "react";

const OutputConsole = ({ executionOutput }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 px-4 py-2 font-semibold border-b border-gray-700">
        Console
      </div>
      <pre className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap text-gray-300">
        {executionOutput || "Click Run to see output..."}
      </pre>
    </div>
  );
};

export default OutputConsole;