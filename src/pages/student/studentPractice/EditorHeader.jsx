import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWifi, faCircleNodes, faCodeBranch, faUsers, faShareNodes, faCopy, faCheck,
    faLanguage, faPalette, faRightFromBracket, faPlay, faSpinner,
    faUser // Make sure faUser is imported
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast'; // Ensure toast is imported if used directly here, though it's typically used in parent

const EditorHeader = ({
    sessionId,
    username,
    connectionStatus,
    isCopied,
    activeUsers,
    selectedLanguage,
    selectedTheme,
    availableLanguages,
    availableThemes,
    handleCopySessionId,
    handleLanguageChange,
    handleThemeChange,
    handleRunCode,
    handleLeaveSession,
    isExecuting,
    getStatusColor,
    current_added_user, // Prop is received but primarily used for toasts in parent (CodeEditor.jsx)
    lastUpdatedUser // New prop to display the last user who made a change
}) => {
    
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-3 border-b border-gray-700 gap-y-2">
            

            {/* Controls and Info Badges */}
            <div className="flex items-center space-x-4 flex-wrap justify-start sm:justify-end gap-2">
                {/* Language Selector */}
                <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">
                    <FontAwesomeIcon icon={faLanguage} className="mr-2 text-green-400" />
                    <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="bg-transparent text-gray-300 outline-none focus:ring-0 focus:border-transparent cursor-pointer"
                    >
                        {availableLanguages.map(lang => (
                            <option key={lang.value} value={lang.value} className="bg-gray-800 text-white">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">
                    <FontAwesomeIcon icon={faPalette} className="mr-2 text-orange-400" />
                    <select
                        value={selectedTheme}
                        onChange={handleThemeChange}
                        className="bg-transparent text-gray-300 outline-none focus:ring-0 focus:border-transparent cursor-pointer"
                    >
                        {availableThemes.map(theme => (
                            <option key={theme.value} value={theme.value} className="bg-gray-800 text-white">
                                {theme.name}
                            </option>
                        ))}
                    </select>
                </div>

                
                

             

               

                {/* Run Code Button */}
                <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Run the current code"
                >
                    {isExecuting ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    )}
                    Run Code
                </button>

            </div>
        </div>
    );
};

export default EditorHeader;
