import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faPalette,
  faPlay,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const EditorHeader = ({
  selectedLanguage,
  selectedTheme,
  handleLanguageChange,
  handleThemeChange,
  handleRunCode,
  isExecuting,
}) => {
  const availableLanguages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Java", value: "java" },
    { name: "Python", value: "python" },
    { name: "C++", value: "cpp" },
    { name: "C", value: "c" },
  ];

  const availableThemes = [
    { name: "VS Dark", value: "vs-dark" },
    { name: "VS Light", value: "vs-light" },
  ];

  return (
    <div className="flex justify-between items-center p-4">

      <h1 className="text-2xl font-bold text-green-400">
        Coding Practice
      </h1>

      <div className="flex items-center gap-4">

        {/* Language */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded">
          <FontAwesomeIcon icon={faLanguage} />
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="bg-transparent outline-none"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded">
          <FontAwesomeIcon icon={faPalette} />
          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="bg-transparent outline-none"
          >
            {availableThemes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Run Button */}
        <button
          onClick={handleRunCode}
          disabled={isExecuting}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
        >
          {isExecuting ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <>
              <FontAwesomeIcon icon={faPlay} /> Run
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;