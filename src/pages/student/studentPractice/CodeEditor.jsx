import React, { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/request';
import EditorHeader from './EditorHeader';
import MonacoCodeEditor from './MonacoCodeEditor';
import OutputConsole from './OutputConsole';

import QuestionPanel from "./QuestionPanel";
// import ChatPanel from './ChatPanel';

const CODE_TEMPLATES = {
    javascript: "console.log('Hello World!');",
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}`,
    python: "print('Hello World!')",
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!";\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello World!");\n    return 0;\n}`
};

const DEFAULT_START_MESSAGE = "// Start coding...\n// Welcome to the collaborative editor!";

const CodeEditor = ({ sessionId, username, initialLanguage = "javascript", initialTheme = "vs-dark" }) => {
    const [code, setCode] = useState(CODE_TEMPLATES[initialLanguage] || DEFAULT_START_MESSAGE);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [isCopied, setIsCopied] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [activeUsers, setActiveUsers] = useState([]);
    const [executionOutput, setExecutionOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [currentChatMessage, setCurrentChatMessage] = useState("");
    const [editQueue, setEditQueue] = useState([]);
    const [question, setQuestion] = useState(null);
    const [customInput, setCustomInput] = useState("");

    // State for tracking newly joined user and last code updater
    const [current_added_user, set_current_addded_user] = useState("");
    const [lastUpdatedUser, setLastUpdatedUser] = useState(""); // New state for last updated user

    // Refs for WebSocket connection, auto-scrolling chat, and tracking previous active users
    const socketRef = useRef(null);
    const preventEcho = useRef(false); // Flag to prevent echoing own WebSocket messages
    const chatMessagesEndRef = useRef(null); // Ref for auto-scrolling chat messages
    const lastSentChatMessageId = useRef(null); // Ref for chat message deduplication
    const prevActiveUsersRef = useRef([]); // Ref to store the previously received active users list for comparison

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

    // --- useEffect for WebSocket Connection and Message Handling ---
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!sessionId) {
            setConnectionStatus('disconnected');
            toast.error("Session ID is missing! Cannot connect.");
            return;
        }

        const backendWsUrl = import.meta.env.VITE_APP_BACKEND_WEBSOCKET_URL;
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'wss'; // Default to wss for cloud
        const rawSocketUrl = `${protocol}://${backendWsUrl}/ws/editor?token=${token}&sessionId=${sessionId}&username=${username}`;

        // Initialize WebSocket connection
        socketRef.current = new WebSocket(rawSocketUrl);

        // Event handler for successful WebSocket connection
        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
            setConnectionStatus('connected');
            toast.success("Connected to editor session!");

        };

        // Event handler for incoming WebSocket messages
        socketRef.current.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.type) {
                case "INITIAL_CODE_STATE":

                    preventEcho.current = true; // Set flag to prevent local editor change from being sent back
                    const resetEdit = { type: 'FULL_RESET', content: msg.content || "" };
                    setEditQueue([resetEdit]);
                    setSelectedLanguage(msg.selectedLanguage || initialLanguage);
                    break;

                case "CODE_CHANGE_UPDATE":
                    if (msg.user !== username) {
                        preventEcho.current = true;
                        const newEdit = JSON.parse(msg.content);
                        setEditQueue(prevQueue => [...prevQueue, newEdit]);
                        if (msg.selectedLanguage && msg.selectedLanguage !== selectedLanguage) {
                            setSelectedLanguage(msg.selectedLanguage);
                        }
                        setLastUpdatedUser(msg.user);
                    } else {

                        setLastUpdatedUser(username);
                    }
                    break;

                case "LANGUAGE_CHANGE":
                    // A dedicated language update from another user
                    if (msg.user !== username) {
                        setSelectedLanguage(msg.selectedLanguage || initialLanguage);
                        setLastUpdatedUser(msg.user); // Set the user who changed the language
                    } else {
                        setLastUpdatedUser(username); // If it's your own update, set yourself as last updated
                    }
                    break;

                case "USER_LIST_UPDATE":
                    const receivedUsers = msg.users || [];
                    const newUsersJoined = receivedUsers.filter(
                        user => !prevActiveUsersRef.current.includes(user)
                    );
                    if (newUsersJoined.length > 0) {
                        newUsersJoined.forEach(user => {
                            if (user !== username) {
                                toast.success(`${user} joined the session!`);
                            }
                        });
                        set_current_addded_user(newUsersJoined[0]);
                    }

                    // Identify users who left to show a toast
                    const usersWhoLeft = prevActiveUsersRef.current.filter(
                        user => !receivedUsers.includes(user)
                    );
                    if (usersWhoLeft.length > 0) {
                        usersWhoLeft.forEach(user => {
                            if (user !== username) {
                                toast.error(`${user} left the session.`);
                            }
                        });
                    }

                    // Update the ref to store the current list for the next update cycle
                    prevActiveUsersRef.current = receivedUsers;


                    setActiveUsers(receivedUsers);


                    break;

                case "CHAT_MESSAGE":
                    // *** Crucial Deduplication Logic ***
                    // Check if this incoming message is an echo of a message we just sent.
                    // This relies on the 'clientMessageId' that was added in handleSendChatMessage.
                    if (msg.clientMessageId && lastSentChatMessageId.current === msg.clientMessageId) {
                        // This is our own message echoed back by the server. Ignore it to prevent duplicates.
                        console.log("Deduplicating: Ignoring echoed chat message with ID:", msg.clientMessageId);
                        lastSentChatMessageId.current = null; // Reset the ID after a successful match
                        return; // CRUCIAL: Exit here, do NOT add this echoed message to state
                    }
                    // Only add to chat messages if it's not a deduplicated message
                    console.log("Adding chat message:", msg); // Log only for genuinely new or non-deduplicated messages
                    setChatMessages(prevMessages => [...prevMessages, msg]);
                    break;

                default:
                    console.warn("Unknown message type received:", msg.type, msg);
            }
        };

        // Event handler for WebSocket connection closing
        socketRef.current.onclose = (event) => {
            console.log("WebSocket disconnected", event.code, event.reason);
            setConnectionStatus('disconnected');
            if (event.code !== 1000) { // 1000 is normal closure
                toast.error(`Disconnected from editor session (${event.code}). Attempting to reconnect...`);
                // Implement a reconnection strategy here if desired (e.g., setTimeout)
            } else {
                toast.success("You have left the session.");
            }
        };

        // Event handler for WebSocket errors
        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus('disconnected');
            toast.error("WebSocket error. Check console for details.");
        };

        // Cleanup function: close WebSocket connection when component unmounts or dependencies change
        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close(1000, "Component unmounted or re-rendered");
                console.log("WebSocket connection closed by cleanup.");
            }
        };
    }, [sessionId, username, initialLanguage, navigate]); // Dependencies for useEffect

    // --- useEffect for Auto-Scrolling Chat Messages ---
    useEffect(() => {
        // Scroll to the bottom of the chat messages whenever new messages arrive
        chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]); // Dependency: re-run whenever the chatMessages array changes

        {/* use effect for question rendering from backend */}
                   useEffect(() => {
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
               }, [sessionId]);

    const handleEditsApplied = (processedCount) => {

        setEditQueue(prevQueue => prevQueue.slice(processedCount));
    };


    const handleLocalCodeChange = (editPayload) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify({
                    type: "CODE_CHANGE_UPDATE",
                    content: JSON.stringify(editPayload), // Send the payload created by the child
                    user: username,
                    sessionId: sessionId,
                })
            );
        }
    };



    // Callback for copying the session ID to the clipboard
    const handleCopySessionId = () => {
        navigator.clipboard.writeText(sessionId).then(() => {
            setIsCopied(true); // Set state for visual feedback (e.g., checkmark icon)
            toast.success("Session ID copied!"); // Show success toast
            setTimeout(() => setIsCopied(false), 2000); // Reset visual feedback after 2 seconds
        }).catch(err => {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy Session ID."); // Show error toast if copy fails
        });
    };

    // Callback for changing the selected programming language
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage); // Update local state with the new language
        
        // Apply default template if the editor is currently empty or holding an existing template
        const currentTrimmedCode = code.trim();
        const isDefaultCode = currentTrimmedCode === "" || 
                              currentTrimmedCode === DEFAULT_START_MESSAGE.trim() ||
                              Object.values(CODE_TEMPLATES).some(template => template.trim() === currentTrimmedCode);
        
        if (isDefaultCode && CODE_TEMPLATES[newLanguage]) {
            const newCode = CODE_TEMPLATES[newLanguage];
            setCode(newCode);
            
            // Push a FULL_RESET to the local edit queue so Monaco updates its uncontrolled internal state
            setEditQueue(prev => [...prev, { type: 'FULL_RESET', content: newCode }]);
            
            // Also broadcast the template replacement code change to other users
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                // Determine edit payload structure compatible with the collaborative system
                // Usually it's better to trigger a FULL_RESET for a complete template swap
                socketRef.current.send(JSON.stringify({
                    type: "INITIAL_CODE_STATE", // Reusing INITIAL_CODE_STATE to force a full replacement on peers
                    content: newCode,
                    user: username,
                    sessionId: sessionId,
                    selectedLanguage: newLanguage
                }));
            }
        } else {
            // If WebSocket is open and we didn't override the code, just send the language change
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(
                    JSON.stringify({
                        type: "LANGUAGE_CHANGE",
                        selectedLanguage: newLanguage, // Send the new language value
                        user: username,
                        sessionId: sessionId
                    })
                );
            }
        }
    };

    // Callback for changing the editor theme
    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value); // Update local state with the new theme
    };

    // Callback for handling the user leaving the session
    const handleLeaveSession = () => {
        if (socketRef.current && activeUsers.length == 1) {

            socketRef.current.send(
                JSON.stringify({
                    type: "CODE_CHANGE_UPDATE",
                    content: code,
                    user: username,
                    sessionId: sessionId,
                    selectedlang: selectedLanguage, // Send current language

                }),
            );
        }
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            // Attempt to gracefully close the WebSocket connection
            socketRef.current.close(1000, "User left the session");
            toast.success("You have left the session.");
        } else {
            toast.error("Not connected to a session.");
        }
        navigate('/dashboard'); // Navigate to the dashboard after leaving/disconnecting
    };

    // Callback for running the code through the backend's compilation/execution service
    const handleRunCode = async () => {
        setIsExecuting(true); // Set loading state for the button
        setExecutionOutput("Running code..."); // Display a "running" message in the output console

        // Find the configuration for the currently selected language, including its version
        const currentLangConfig = availableLanguages.find(lang => lang.value === selectedLanguage);
        // Validate if the selected language is executable and has a specific version
        if (!currentLangConfig || !currentLangConfig.version || currentLangConfig.version === "latest") {
            setExecutionOutput("Error: Selected language might not be executable or lacks a specific version for the compiler. Choose a language like Python, Java, C++, etc.");
            toast.error("Unsupported language for execution or missing version.");
            setIsExecuting(false);
            return; // Exit if language is not supported for execution
        }

        // Heuristic check: Does the code seemingly require input, but the input box is empty?
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
                    code: code, // The current code from the editor
                    stdin: customInput, // Send custom input for the execution
                }
            );

            const result = response.data;
            let output = "";

            // Consolidate and format the execution output from the backend response
            if (result.compileStdout) { output += "COMPILE OUTPUT:\n" + result.compileStdout + "\n"; }
            if (result.compileStderr) { output += "COMPILE ERROR:\n" + result.compileStderr + "\n"; }
            if (result.stdout) { output += "OUTPUT:\n" + result.stdout; }
            if (result.stderr) { output += "RUNTIME ERROR:\n" + result.stderr; }
            if (result.error) {
                if (output) output += "\n"; // Add newline if there's existing output
                output += "SERVICE ERROR: " + result.error;
            }
            if (result.executionTime !== undefined && result.executionTime !== null) {
                if (output) output += "\n\n";
                output += `--- Execution Time: ${result.executionTime}ms ---`;
            }
            setExecutionOutput(output || "Execution completed with no output."); // Update output console

        } catch (error) {
            console.error("Error executing code:", error);
            if (error.response) {
                // Display specific error message from backend response if available
                setExecutionOutput(`ERROR: ${error.response.status} - ${error.response.data.message || error.response.data.error || 'Unknown error'}`);
                toast.error(`Code execution failed: ${error.response.status}`);
            } else {
                setExecutionOutput("Network error or server unreachable.");
                toast.error("Failed to connect to execution server.");
            }
        } finally {
            setIsExecuting(false); // Reset loading state
        }
    };

    // Callback for sending chat messages
    const handleSendChatMessage = (event) => {
        event.preventDefault(); // Prevent default form submission
        // Only send if message is not empty and WebSocket is open
        if (currentChatMessage.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
            // Generate a unique client-side ID for this message for deduplication
            const messageId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
            lastSentChatMessageId.current = messageId; // Store this ID in the ref

            const messageToSend = {
                type: "CHAT_MESSAGE",
                content: currentChatMessage.trim(),
                user: username,
                sessionId: sessionId,
                timestamp: new Date().toLocaleTimeString(), // Add timestamp for display
                clientMessageId: messageId // Include client-side unique ID in the message
            };

            socketRef.current.send(JSON.stringify(messageToSend));

            // Immediately add the message to local state for better responsiveness
            // The echo from the server will be ignored due to the deduplication logic in onmessage
            setChatMessages(prevMessages => [...prevMessages, messageToSend]);
            setCurrentChatMessage(""); // Clear the chat input field after sending
        }
    };

    // Memoized utility function to determine connection status color for UI
    const getStatusColor = useCallback((status) => {
        switch (status) {
            case 'connected': return 'bg-green-500';
            case 'disconnected': return 'bg-red-500';
            case 'connecting': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    }, []); // No dependencies as it's a pure function


    const handleCodeChangeForParent = (newCode) => {
        setCode(newCode);
    };


                

    return (
        <div className="flex flex-col h-screen text-gray-200 p-4 rounded-xl shadow-2xl border border-gray-700 ">


            {/* Render the Editor Header subcomponent */}
            <EditorHeader
                sessionId={sessionId}
                username={username}
                connectionStatus={connectionStatus}
                isCopied={isCopied}
                activeUsers={activeUsers}
                selectedLanguage={selectedLanguage}
                selectedTheme={selectedTheme}
                availableLanguages={availableLanguages}
                availableThemes={availableThemes}
                handleCopySessionId={handleCopySessionId}
                handleLanguageChange={handleLanguageChange}
                handleThemeChange={handleThemeChange}
                handleRunCode={handleRunCode}
                handleLeaveSession={handleLeaveSession}
                isExecuting={isExecuting}
                getStatusColor={getStatusColor}
                new_users={current_added_user}
                lastUpdatedUser={lastUpdatedUser}
            />

            {/* Main content area: Editor and right-hand panels (Output/Chat) */}
           <div className="flex flex-col flex-1 min-h-0">

                                {/* TOP SECTION (Question + Editor) */}
                                
    <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

        {question ? (
            <>
                {/* QUESTION PANEL */}
                <div className="w-full lg:w-1/2 h-full overflow-y-auto border-r border-gray-800 bg-gray-900">
                    <QuestionPanel question={question} />
                </div>

                {/* EDITOR PANEL */}
                <div className="w-full lg:w-1/2 h-full flex flex-col min-h-0">
                    <div className="flex-1 min-h-0">
                        <MonacoCodeEditor
                            code={code}
                            selectedLanguage={selectedLanguage}
                            selectedTheme={selectedTheme}
                            editQueue={editQueue}
                            onEditsApplied={handleEditsApplied}
                            onLocalChange={handleLocalCodeChange}
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
                        editQueue={editQueue}
                        onEditsApplied={handleEditsApplied}
                        onLocalChange={handleLocalCodeChange}
                        onCodeChange={handleCodeChangeForParent}
                    />
                </div>
            </div>
        )}

    </div>

    {/* BOTTOM PANEL: CUSTOM INPUT & CONSOLE */}
    <div className="h-64 border-t border-gray-800 bg-gray-900 flex flex-col md:flex-row">
        {/* Custom Input */}
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

        {/* Console Output */}
        <div className="w-full md:w-2/3 flex flex-col">
            <OutputConsole executionOutput={executionOutput} />
        </div>
    </div>

</div>
        </div>
    );
};

export default CodeEditor;