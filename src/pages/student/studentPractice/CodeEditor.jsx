import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../services/request";
import EditorHeader from "./EditorHeader";
import MonacoCodeEditor from "./MonacoCodeEditor";
import OutputConsole from "./OutputConsole";

const CodeEditor = ({
  sessionId,
  username,
  initialLanguage = "javascript",
  initialTheme = "vs-dark",
}) => {
  const [code, setCode] = useState("// Start coding here...");
  const [executionOutput, setExecutionOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [question, setQuestion] = useState(null);

  // 🔥 Splitter State
  const [leftWidth, setLeftWidth] = useState(50);
  const isDragging = useRef(false);

  // ---------------- FETCH QUESTION ----------------
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await api.get(`/api/practice/question/${sessionId}`);
        setQuestion(res.data?.question || null);
      } catch (err) {
        setQuestion(null);
      }
    };

    fetchQuestion();
  }, [sessionId]);

  // ---------------- RUN CODE ----------------
  const handleRunCode = async () => {
    setIsExecuting(true);
    setExecutionOutput("Running...");

    try {
      const res = await api.post("/api/code/execute", {
        language: selectedLanguage,
        code,
      });

      setExecutionOutput(res.data?.stdout || "No Output");
    } catch (err) {
      setExecutionOutput("Error running code.");
      toast.error("Execution failed");
    } finally {
      setIsExecuting(false);
    }
  };

  // ---------------- SPLITTER LOGIC ----------------
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">

      {/* ---------------- HEADER ---------------- */}
      <div className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
        <EditorHeader
          selectedLanguage={selectedLanguage}
          selectedTheme={selectedTheme}
          handleLanguageChange={(e) => setSelectedLanguage(e.target.value)}
          handleThemeChange={(e) => setSelectedTheme(e.target.value)}
          handleRunCode={handleRunCode}
          isExecuting={isExecuting}
        />
      </div>

      {/* ---------------- MAIN SECTION ---------------- */}
      <div className="flex flex-1 overflow-hidden">

        {question ? (
          <>
            {/* LEFT - QUESTION */}
            <div
              style={{ width: `${leftWidth}%` }}
              className="p-4 overflow-auto border-r border-gray-800"
            >
              <h2 className="text-xl font-bold text-green-400 mb-3">
                Programming Question
              </h2>
              <div className="whitespace-pre-wrap text-gray-300">
                {question}
              </div>
            </div>

            {/* DRAGGABLE DIVIDER */}
            <div
              onMouseDown={handleMouseDown}
              className="w-2 cursor-col-resize bg-gray-800 hover:bg-green-500 transition"
            />

            {/* RIGHT - EDITOR */}
            <div className="flex-1 overflow-hidden">
              <MonacoCodeEditor
                code={code}
                selectedLanguage={selectedLanguage}
                selectedTheme={selectedTheme}
                onCodeChange={setCode}
              />
            </div>
          </>
        ) : (
          /* NO QUESTION → FULL EDITOR */
          <div className="flex-1 overflow-hidden">
            <MonacoCodeEditor
              code={code}
              selectedLanguage={selectedLanguage}
              selectedTheme={selectedTheme}
              onCodeChange={setCode}
            />
          </div>
        )}
      </div>

      {/* ---------------- CONSOLE (BOTTOM FIXED) ---------------- */}
      <div className="h-[250px] border-t border-gray-800 bg-gray-900">
        <OutputConsole executionOutput={executionOutput} />
      </div>
    </div>
  );
};

export default CodeEditor;