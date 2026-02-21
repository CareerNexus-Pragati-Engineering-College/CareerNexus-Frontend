import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useCallback } from 'react';

const MonacoCodeEditor = ({ code, selectedLanguage, selectedTheme, editQueue, onEditsApplied, onLocalChange ,onCodeChange}) => {
    const editorRef = useRef(null);
    
    const monacoRef = useRef(null);

      const isApplyingRemoteEdit = useRef(false);

  useEffect(() => {
        // Only run if the queue has items and the editor is ready.
        if (editorRef.current && monacoRef.current && editQueue.length > 0) {
            isApplyingRemoteEdit.current = true;

            // FIX #6: Process the ENTIRE queue.
            // Map over every edit in the queue and transform it into the format Monaco needs.
             const resetAction = editQueue.find(edit => edit.type === 'FULL_RESET');

        if (resetAction) {
            // If a reset action is found, it takes priority.
            // We ignore all other small changes in the queue and reset the entire editor's content.
            // editor.setValue() is the most direct way to do this.
            console.log("Applying FULL_RESET with new content.");
            editorRef.current.setValue(resetAction.content);
            
        } else {
            const monacoEdits = editQueue.map(edit => {
               
                const range = new monacoRef.current.Range(
                    edit.range.startLineNumber,
                    edit.range.startColumn,
                    edit.range.endLineNumber,
                    edit.range.endColumn
                );
                return {
                    range: range,
                    text: edit.text,
                    forceMoveMarkers: true,
                };
            });

            // FIX #7: Apply ALL edits from the queue in a single, efficient operation.
            editorRef.current.executeEdits("remote-source", monacoEdits);

        }

            // FIX #8: Tell the parent component to clear the queue now that we're done.
            onEditsApplied(editQueue.length);

            setTimeout(() => {
                isApplyingRemoteEdit.current = false;
            }, 0);
        
    }
    }, [editQueue]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        editor.onDidChangeModelContent((event) => {
            if (isApplyingRemoteEdit.current || event.isFlush) {
                return;
            }

            for (const change of event.changes) {
                const editPayload = {
                    range: change.range,
                    text: change.text,
                };
                onLocalChange(editPayload);
            }
        });
    };

    return (

        <div className="h-full w-full flex flex-col rounded-lg overflow-hidden border border-gray-700 shadow-xl min-h-0">
            {/* min-h-0 is crucial for flex items to correctly constrain their size within a flex container if content overflows */}
            <Editor
                height="100%"
                language={selectedLanguage}
                theme={selectedTheme}
                defaultValue={code}
                onMount={handleEditorDidMount}
                // onChange={handleEditorChange}
                 onChange={(newValue, event) => {
                  
                    if (isApplyingRemoteEdit.current || event.isFlush) {
                        return;
                    }
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