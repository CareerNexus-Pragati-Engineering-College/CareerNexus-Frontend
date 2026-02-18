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
            <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faCodeBranch} className="text-purple-400 text-2xl" />
                <h2 className="text-xl font-bold text-white whitespace-nowrap">Collaborative Editor</h2>
                
                {/* Connection Status Indicator */}
                <div className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(connectionStatus)} animate-pulse`}></div>
                    <span className="text-sm text-gray-400 capitalize">{connectionStatus}</span>
                </div>
            </div>

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

                {/* Session ID Display and Copy */}
                <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">
                    <FontAwesomeIcon icon={faCircleNodes} className="mr-2 text-blue-400" />
                    <span className="font-mono text-gray-300 mr-2 select-all">{sessionId}</span>
                    <button
                        onClick={handleCopySessionId}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                        title="Copy Session ID"
                    >
                        <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className={isCopied ? "text-green-400" : ""} />
                    </button>
                </div>
                
                {/* Current User Info and Last Updated User Display */}
                {/* Modified to display lastUpdatedUser clearly within the existing span */}
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700 capitalize">
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-yellow-400" />
                    {username}
                    {/* Display lastUpdatedUser only if it exists and is different from the current username */}
                    {lastUpdatedUser && lastUpdatedUser !== username && (
                        ` (Last updated by: ${lastUpdatedUser})` // No new Tailwind classes, just a text string
                    )}
                </span>

                {/* Active Users Display (only if there are users) */}
                {activeUsers.length > 0 && (
                    <span
                        className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700"
                        title={
                            `Active: ${activeUsers.map(u => `${u}`).join(', ')}` 
                        }
                    >
                        <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-400" />
                        {activeUsers.length} active
                    </span>
                )}

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

                {/* Leave Session Button */}
                <button
                    onClick={handleLeaveSession}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
                    title="Leave this collaborative session"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Leave Session
                </button>
            </div>
        </div>
    );
};

export default EditorHeader;
