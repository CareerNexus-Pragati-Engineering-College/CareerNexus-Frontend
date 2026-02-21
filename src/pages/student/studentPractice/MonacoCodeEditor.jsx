import React from "react";
import Editor from "@monaco-editor/react";

const MonacoCodeEditor = ({
  code,
  selectedLanguage,
  selectedTheme,
  onCodeChange,
}) => {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={selectedLanguage}
        theme={selectedTheme}
        value={code}
        onChange={(value) => onCodeChange(value)}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default MonacoCodeEditor;