import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLanguage, faPalette, faPlay, faSpinner, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const EditorHeader = ({
    selectedLanguage,
    selectedTheme,
    availableLanguages,
    availableThemes,
    handleLanguageChange,
    handleThemeChange,
    handleRunCode,
    handleLeaveSession,
    isExecuting,
    isLightMode
}) => {
    const headerStyles = {
        iconBg: isLightMode ? 'bg-violet-100 border-violet-200 text-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.1)]' : 'bg-violet-500/10 border-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.15)]',
        title: isLightMode ? 'text-gray-900' : 'text-white',
        buttonBg: isLightMode ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700' : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300 hover:text-white',
        dropdownContainer: isLightMode ? 'bg-white border-gray-200 hover:border-violet-300 shadow-sm' : 'bg-white/5 border-violet-500/20 hover:border-violet-500/40 shadow-sm',
        dropdownText: isLightMode ? 'text-gray-800' : 'text-gray-200',
        dropdownOption: isLightMode ? 'bg-white text-gray-800' : 'bg-[#1a1528] text-gray-200',
    };

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between mb-4 pb-4 border-b ${isLightMode ? 'border-gray-200' : 'border-violet-500/20'} gap-4`}>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <button
                    onClick={handleLeaveSession}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-colors backdrop-blur-md ${headerStyles.buttonBg}`}
                    title="Back to Dashboard"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl border ${headerStyles.iconBg}`}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 15 1.936.516 4-15z"></path></svg>
                </div>
                <div>
                    <h2 className={`text-xl font-bold tracking-wide ${headerStyles.title}`}>Workspace</h2>
                </div>
            </div>

            <div className="flex items-center space-x-4 flex-wrap justify-start sm:justify-end gap-3 w-full sm:w-auto">
                {/* Language Selector */}
                <div className={`flex items-center px-4 py-2.5 rounded-xl text-sm border transition-colors backdrop-blur-md ${headerStyles.dropdownContainer}`}>
                    <FontAwesomeIcon icon={faLanguage} className="mr-2 text-violet-500" />
                    <select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className={`bg-transparent outline-none focus:ring-0 focus:border-transparent cursor-pointer appearance-none pr-2 font-medium ${headerStyles.dropdownText}`}
                    >
                        {availableLanguages.map(lang => (
                            <option key={lang.value} value={lang.value} className={headerStyles.dropdownOption}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Theme Selector */}
                <div className={`flex items-center px-4 py-2.5 rounded-xl text-sm border transition-colors backdrop-blur-md ${headerStyles.dropdownContainer}`}>
                    <FontAwesomeIcon icon={faPalette} className="mr-2 text-fuchsia-500" />
                    <select
                        value={selectedTheme}
                        onChange={handleThemeChange}
                        className={`bg-transparent outline-none focus:ring-0 focus:border-transparent cursor-pointer appearance-none pr-2 font-medium ${headerStyles.dropdownText}`}
                    >
                        {availableThemes.map(theme => (
                            <option key={theme.value} value={theme.value} className={headerStyles.dropdownOption}>
                                {theme.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Run Code Button */}
                <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="group relative flex items-center justify-center bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] border border-white/10"
                    title="Run the current code"
                >
                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-in-out skew-x-12"></div>
                    <span className="relative z-10 flex items-center">
                        {isExecuting ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                        ) : (
                            <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        )}
                        Run Code
                    </span>
                </button>

            </div>
        </div>
    );
};

export default EditorHeader;