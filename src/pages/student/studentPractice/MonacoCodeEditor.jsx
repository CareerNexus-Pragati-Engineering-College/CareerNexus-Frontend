import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const MonacoCodeEditor = ({ code, selectedLanguage, selectedTheme, onCodeChange }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    return (
        <div className="h-full w-full flex flex-col rounded-lg overflow-hidden border border-gray-700 shadow-xl min-h-0">
            <Editor
                height="100%"
                language={selectedLanguage}
                theme={selectedTheme}
                value={code}
                onMount={handleEditorDidMount}
                onChange={(newValue) => {
                    onCodeChange(newValue);
                }}
                options={{
                    fontSize: 16,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollbar: {
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8,
                        arrowSize: 8,
                        verticalSliderSize: 8,
                        horizontalSliderSize: 8,
                        verticalScrollbarColor: '#3d3d3d',
                        horizontalScrollbarColor: '#3d3d3d',
                        verticalSliderColor: '#6b6b6b',
                        horizontalSliderColor: '#6b6b6b',
                    }
                }}
            />
        </div>
    );
};

export default MonacoCodeEditor;