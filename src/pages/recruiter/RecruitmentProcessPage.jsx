import React, { useState } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaClock, FaFileUpload, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

const RecruitmentProcessPage = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "question") setQuestionFile(file);
    else setAnswerFile(file);
  };

  const handleSubmit = () => {
    if (!selectedRound || !startTime || !endTime || !questionFile || !answerFile) {
      alert("Please fill in all fields and upload both files.");
      return;
    }

    console.log("Round:", selectedRound);
    console.log("Start:", startTime);
    console.log("End:", endTime);
    console.log("Ques:", questionFile.name);
    console.log("Ans:", answerFile.name);
    alert("Recruitment round configured successfully!");
  };

  return (
    <>
      <NavbarRecruiterDashboard />
      <div className="pt-24 px-6 pb-16 bg-white min-h-screen font-poppins text-gray-800">
        <h1 className="text-3xl font-bold mb-10 text-purple-700 text-center">Recruitment Process</h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Round Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 gap-2">
              <FaClipboardList className="text-purple-600" />
              Select Recruitment Round
            </label>
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Choose Round --</option>
              <option value="aptitude">Aptitude Round</option>
              <option value="coding">Coding Round</option>
            </select>
          </motion.div>

          {/* Center: Start and End Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 gap-2">
                  <FaClock className="text-purple-600" />
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 gap-2">
                  <FaClock className="text-purple-600" />
                  End Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Upload PDFs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 gap-2">
                  <FaFileUpload className="text-purple-600" />
                  Upload Questions (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "question")}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
                {questionFile && (
                  <p className="text-green-600 text-sm mt-1">{questionFile.name}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 gap-2">
                  <FaFileUpload className="text-purple-600" />
                  Upload Answers (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "answer")}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
                {answerFile && (
                  <p className="text-green-600 text-sm mt-1">{answerFile.name}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-lg shadow-lg text-sm font-semibold transition"
          >
            Save Round Configuration
          </button>
        </div>
      </div>
    </>
  );
};

export default RecruitmentProcessPage;
