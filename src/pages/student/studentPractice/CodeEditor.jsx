import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/request';
import EditorHeader from './EditorHeader';
import MonacoCodeEditor from './MonacoCodeEditor';
import OutputConsole from './OutputConsole';

import QuestionPanel from "./QuestionPanel";

const CODE_TEMPLATES = {
    javascript: "console.log('Hello World!');",
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}`,
    python: "print('Hello World!')",
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!";\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello World!");\n    return 0;\n}`
};

const DEFAULT_START_MESSAGE = "// Start coding...\n// Happy Coding!";

const CodeEditor = ({ sessionId, username, initialLanguage = "javascript", initialTheme = "vs-dark", question: externalQuestion, onCodeChange, onLanguageChange }) => {
    const [code, setCode] = useState(CODE_TEMPLATES[initialLanguage] || DEFAULT_START_MESSAGE);
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [executionOutput, setExecutionOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [question, setQuestion] = useState(null);
    const [customInput, setCustomInput] = useState("");

    const navigate = useNavigate();

    const availableLanguages = [
        { name: "JavaScript", value: "javascript", version: "18.15.0" },
        { name: "Java", value: "java", version: "15.0.2" },
        { name: "Python", value: "python", version: "3.10.0" },
        { name: "C++", value: "cpp", version: "10.2.0" },
        { name: "C", value: "c", version: "10.2.0" },
    ];

    const availableThemes = [
        { name: "VS Dark", value: "vs-dark" },
        { name: "VS Light", value: "vs-light" },
        { name: "High Contrast Dark", value: "hc-black" },
        { name: "High Contrast Light", value: "hc-light" }
    ];

    // --- useEffect for question rendering ---
    useEffect(() => {
        if (externalQuestion) {
            setQuestion(externalQuestion);
            return;
        }
        const fetchQuestion = async () => {
            try {
                const res = await api.get(`/api/practice/question/${sessionId}`);
                if (res.data?.question) {
                    setQuestion(res.data.question);
                } else {
                    setQuestion(null);
                }
            } catch (error) {
                setQuestion(null);
            }
        };

        fetchQuestion();
    }, [sessionId, externalQuestion]);

    // Callback for changing the selected programming language
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        if (onLanguageChange) onLanguageChange(newLanguage);
        
        // Apply default template if the editor is currently empty or holding an existing template
        const currentTrimmedCode = code.trim();
        const isDefaultCode = currentTrimmedCode === "" || 
                              currentTrimmedCode === DEFAULT_START_MESSAGE.trim() ||
                              Object.values(CODE_TEMPLATES).some(template => template.trim() === currentTrimmedCode);
        
        if (isDefaultCode && CODE_TEMPLATES[newLanguage]) {
            const newCode = CODE_TEMPLATES[newLanguage];
            setCode(newCode);
        }
    };

    // Callback for changing the editor theme
    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
    };

    // Callback for handling the user leaving the session
    const handleLeaveSession = () => {
        navigate('/dashboard');
    };

    // Callback for running the code through the backend's compilation/execution service
    const handleRunCode = async () => {
        setIsExecuting(true);
        setExecutionOutput("Running code...");

        const currentLangConfig = availableLanguages.find(lang => lang.value === selectedLanguage);
        if (!currentLangConfig || !currentLangConfig.version || currentLangConfig.version === "latest") {
            setExecutionOutput("Error: Selected language might not be executable.");
            toast.error("Unsupported language for execution.");
            setIsExecuting(false);
            return;
        }

        const requiresInputRegEx = /(?:input\s*\()|(?:Scanner\s*\()|(?:cin\s*>>)|(?:scanf\s*\()/;
        if (requiresInputRegEx.test(code) && !customInput.trim()) {
            toast.error("Input required! Please add it to the Custom Input box.");
            setIsExecuting(false);
            setExecutionOutput("Execution blocked.\nPlease provide the required input in the 'Custom Input' box below before running.");
            return;
        }

        try {
            const response = await api.post(
                '/student/code/run',
                {
                    language: currentLangConfig.value,
                    code: code,
                    stdin: customInput,
                }
            );

            const result = response.data;
            let output = "";

            if (result.compileStdout) { output += "COMPILE OUTPUT:\n" + result.compileStdout + "\n"; }
            if (result.compileStderr) { output += "COMPILE ERROR:\n" + result.compileStderr + "\n"; }
            if (result.stdout) { output += "OUTPUT:\n" + result.stdout; }
            if (result.stderr) { output += "RUNTIME ERROR:\n" + result.stderr; }
            if (result.error) {
                if (output) output += "\n";
                output += "SERVICE ERROR: " + result.error;
            }
            if (result.executionTime !== undefined && result.executionTime !== null) {
                if (output) output += "\n\n";
                output += `--- Execution Time: ${result.executionTime}ms ---`;
            }
            setExecutionOutput(output || "Execution completed with no output.");

        } catch (error) {
            console.error("Error executing code:", error);
            if (error.response) {
                setExecutionOutput(`ERROR: ${error.response.status} - ${error.response.data.message || error.response.data.error || 'Unknown error'}`);
                toast.error(`Code execution failed: ${error.response.status}`);
            } else {
                setExecutionOutput("Network error or server unreachable.");
                toast.error("Failed to connect to execution server.");
            }
        } finally {
            setIsExecuting(false);
        }
    };

    const handleCodeChangeForParent = (newCode) => {
        setCode(newCode);
        if (onCodeChange) onCodeChange(newCode);
    };

    return (
        <div className="flex flex-col h-screen text-gray-200 p-4 rounded-xl shadow-2xl border border-gray-700 ">
            <EditorHeader
                selectedLanguage={selectedLanguage}
                selectedTheme={selectedTheme}
                availableLanguages={availableLanguages}
                availableThemes={availableThemes}
                handleLanguageChange={handleLanguageChange}
                handleThemeChange={handleThemeChange}
                handleRunCode={handleRunCode}
                handleLeaveSession={handleLeaveSession}
                isExecuting={isExecuting}
            />

            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
                    {question ? (
                        <>
                            <div className="w-full lg:w-1/2 h-full overflow-y-auto border-r border-gray-800 bg-gray-900">
                                <QuestionPanel question={question} />
                            </div>
                            <div className="w-full lg:w-1/2 h-full flex flex-col min-h-0">
                                <div className="flex-1 min-h-0">
                                    <MonacoCodeEditor
                                        code={code}
                                        selectedLanguage={selectedLanguage}
                                        selectedTheme={selectedTheme}
                                        onCodeChange={handleCodeChangeForParent}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col min-h-0">
                            <div className="flex-1 min-h-0">
                                <MonacoCodeEditor
                                    code={code}
                                    selectedLanguage={selectedLanguage}
                                    selectedTheme={selectedTheme}
                                    onCodeChange={handleCodeChangeForParent}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-64 border-t border-gray-800 bg-gray-900 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 border-r border-gray-800 flex flex-col">
                        <div className="bg-gray-800 px-4 py-2 font-semibold border-b border-gray-700">
                            Custom Input
                        </div>
                        <textarea
                            className="flex-1 w-full bg-transparent p-4 text-gray-300 resize-none outline-none font-mono placeholder-gray-600"
                            placeholder="Enter custom standard input here..."
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col">
                        <OutputConsole executionOutput={executionOutput} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;