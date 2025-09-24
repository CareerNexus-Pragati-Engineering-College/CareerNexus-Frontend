import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaClock, FaFileUpload, FaClipboardList, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";

const RecruitmentProcessPage = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  const [loading, setLoading] = useState(false); 
  const userId= getuserId(); 

  //const { username, jobId } = useParams(); 
  const navigate = useNavigate();

 

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        e.target.value = ''; // Clear the input
        if (type === "question") setQuestionFile(null);
        else setAnswerFile(null);
        return;
    }
    if (file && file.size > 5 * 1024 * 1024) { // Max 5MB file size example
        alert("File size exceeds 5MB limit.");
        e.target.value = ''; // Clear the input
        if (type === "question") setQuestionFile(null);
        else setAnswerFile(null);
        return;
    }

    if (type === "question") setQuestionFile(file);
    else setAnswerFile(file);
  };

  const handleSubmit = async () => { // <--- Make handleSubmit async
    if (!selectedRound || !startTime || !endTime || !questionFile || !answerFile) { // Check jobId too
      alert("Please fill in all fields, upload both files, and ensure recruiter ID/job ID are available.");
      return;
    }

    setLoading(true); // <--- Set loading true before API call

    try {
      const formData = new FormData();

     console.log("Selected Round:", selectedRound);
      const roundDetails = {
        createdByUserId: userId,
        jobPostId:1,     
        roundName: selectedRound,
        startTime: startTime,            
        endTime: endTime,      
        min_marks: 0,        
       
      };

      
      formData.append("roundDetails", new Blob([JSON.stringify(roundDetails)], { type: "application/json" }));

     
      formData.append("questionPdf", questionFile);
      formData.append("answerPdf", answerFile);

     
      const response = await requestApi.post(
        `exam/recruiter/mcq/assessment`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
         
        }
      );

    
      alert("Recruitment round configured successfully!");
      console.log("API Response:", response.data);
      setSelectedRound("");
      setStartTime("");
      setEndTime("");
      setQuestionFile(null);
      setAnswerFile(null);

    } catch (error) {
      console.error("Error configuring round:", error);
      alert("Failed to configure recruitment round: " + (error.response?.data || error.message));
    } finally {
      setLoading(false); // <--- Set loading false after API call
    }
  };

  const handleBack = () => {
    navigate(`/recruiter/${userId}/applications`);
  };

  return (
    <>
      <NavbarRecruiterDashboard />

      {/* Back Button */}
      <div className="pt-20 px-6">
        <button
          onClick={handleBack}
          className="flex items-center text-purple-700 text-base font-semibold mb-6 hover:underline"
        >
          <FaArrowLeft className="mr-2 text-lg" />
          Back to Applications
        </button>
      </div>

      <div className="px-6 pb-16 bg-white min-h-screen font-poppins text-gray-800">
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
              <option value="Aptitude Round">Aptitude Round</option> {/* <--- Change value to match backend enum/string */}
              <option value="Coding Round">Coding Round</option> {/* <--- Change value */}
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
            className={`bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-lg shadow-lg text-sm font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // <--- Disable button when loading
          >
            {loading ? 'Saving...' : 'Save Round Configuration'} {/* <--- Change button text while loading */}
          </button>
        </div>
      </div>
    </>
  );
};

export default RecruitmentProcessPage;