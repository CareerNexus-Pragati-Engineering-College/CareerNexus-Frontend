import React from 'react';

const OutputConsole = ({ executionOutput }) => {
    return (
 
<div className="flex flex-col rounded-lg shadow-xl border border-gray-700 bg-gray-800 text-sm overflow-hidden flex-grow min-h-0 max-h-full md:max-lg:h-auto md:max-lg:flex-grow">
    {/* flex-grow and min-h-0 ensure this component takes available vertical space and its children flex correctly */}
    <div className="bg-gray-700 px-4 py-2 font-semibold text-white border-b border-gray-600">
        Output Console
    </div>
    <pre className="flex-grow p-4 text-gray-200 overflow-y-auto whitespace-pre-wrap min-h-0 custom-scrollbar max-h-full">
        {/* flex-grow and min-h-0 here allow the <pre> to take all remaining space after the header */}
        {/* overflow-y-auto ensures a scrollbar appears only when content overflows vertically */}
        {executionOutput || "Click 'Run Code' to see output."}
    </pre>
</div>

    )
};

export default OutputConsole;
