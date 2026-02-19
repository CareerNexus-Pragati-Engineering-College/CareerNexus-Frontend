import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requestApi from "../../services/request";
import toast from "react-hot-toast";

const fallbackQuestions = [
  {
    Question: "What is the capital of India?",
    correct_option: "Delhi",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"]
  },
  {
    Question: "Which language is used for web development?",
    correct_option: "HTML",
    options: ["Python", "Java", "HTML", "C++"]
  }
];

const StudentTestPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins default

  const fullScreenRef = useRef(null);

  useEffect(() => {
    if (fullScreenRef.current) {
      fullScreenRef.current.requestFullscreen?.();
    }

    requestApi.get("/test/questions")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setQuestions(res.data);
        } else {
          toast("No questions found from backend. Showing sample test.", { icon: "ℹ️" });
          setQuestions(fallbackQuestions);
        }
      })
      .catch(() => {
        toast("Could not load questions from backend. Showing fallback questions.", { icon: "⚠️" });
        setQuestions(fallbackQuestions);
      });

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleClear = (questionIndex) => {
    setSelectedAnswers(prev => {
      const updated = { ...prev };
      delete updated[questionIndex];
      return updated;
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_option) {
        score += 1;
      }
    });

    requestApi.post("/test/submit", { score })
      .then(() => {
        toast.success("Test submitted successfully");
        navigate(`/student/${userId}/home`);
      })
      .catch(() => toast.error("Submission failed"));
  };

  const getButtonColor = index => {
    return selectedAnswers[index] ? "bg-green-400" : "bg-gray-300";
  };

  const formatTime = () => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const optionLetters = ["A", "B", "C", "D", "E"];

  return (
    <div ref={fullScreenRef} className="flex w-full h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A]">

      {/* Sidebar */}
      <div className="w-1/5 p-4 border-r border-violet-300 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-[#6B4ECF]">Timer: {formatTime()}</span>
          <button onClick={handleSubmit} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Submit</button>
        </div>
        <button onClick={() => navigate(`/student/${userId}/home`)} className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-600">Exit</button>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-bold text-white hover:scale-105 transition ${getButtonColor(index)}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
            className="bg-[#6B4ECF] text-white py-1 rounded-lg shadow-md hover:bg-[#5939b8]"
          >Previous</button>
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
            className="bg-[#6B4ECF] text-white py-1 rounded-lg shadow-md hover:bg-[#5939b8]"
          >Next</button>
          <button
            onClick={() => handleClear(currentQuestionIndex)}
            className="bg-white border border-red-400 text-red-500 py-1 rounded-lg hover:bg-red-100 transition"
          >Clear Answer</button>
        </div>
      </div>

      {/* Question Panel */}
      <div className="w-4/5 p-8 overflow-y-auto">
        {questions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#6B4ECF]">
              Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].Question}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestionIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(currentQuestionIndex, opt)}
                  className={`w-full text-left px-4 py-3 rounded-lg border border-[#6B4ECF]/40 shadow-sm bg-white/80 hover:scale-[1.01] transition-all
                    ${selectedAnswers[currentQuestionIndex] === opt ? "bg-[#E4EBFE] border-[#6B4ECF] ring-2 ring-[#6B4ECF]" : ""}`}
                >
                  <span className="font-bold mr-2">{optionLetters[idx] || String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTestPage;
