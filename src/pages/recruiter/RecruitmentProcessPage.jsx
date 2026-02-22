import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaClock, FaFileUpload, FaClipboardList, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";
import toast from "react-hot-toast";

const RecruitmentProcessPage = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questionFile, setQuestionFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = getuserId();
  const [min_marks, setmin_marks] = useState(0);

  const { username, jobId } = useParams();
  const navigate = useNavigate();

  const [configuredRounds, setConfiguredRounds] = useState([]);
  const [loadingRounds, setLoadingRounds] = useState(false);



  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.", { id: "pdf-warning" });
      e.target.value = ''; // Clear the input
      if (type === "question") setQuestionFile(null);
      else setAnswerFile(null);
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) { // Max 5MB file size example
      toast.error("File size exceeds 5MB limit.", { id: "size-warning" });
      e.target.value = ''; // Clear the input
      if (type === "question") setQuestionFile(null);
      else setAnswerFile(null);
      return;
    }

    if (type === "question") setQuestionFile(file);
    else setAnswerFile(file);
  };

  const handleSubmit = async () => { // <--- Make handleSubmit async
    if (!selectedRound || !startTime || !endTime || !questionFile || !min_marks) { // Check jobId too
      toast.error("Please fill in all fields, upload both files, and ensure recruiter ID/job ID are available.", { id: "missing-fields" });
      return;
    }

    setLoading(true); // <--- Set loading true before API call

    try {
      const formData = new FormData();

      console.log("Selected Round:", selectedRound);
      const roundDetails = {
        createdByUserId: userId,
        jobPostId: jobId,
        roundName: selectedRound,
        startTime: startTime,
        endTime: endTime,
        min_marks: min_marks,

      };


      formData.append("roundDetails", new Blob([JSON.stringify(roundDetails)], { type: "application/json" }));


      formData.append("questionPdf", questionFile);



      const response = await requestApi.post(
        `exam/recruiter/mcq/assessment`,
        formData
      );


      toast.success("Recruitment round configured successfully!", { id: "round-success" });
      console.log("API Response:", response.data);
      setSelectedRound("");
      setStartTime("");
      setEndTime("");
      setQuestionFile(null);


    } catch (error) {
      console.error("Error configuring round:", error);
      toast.error("Failed to configure recruitment round: " + (error.response?.data || error.message), { id: "round-error" });
    } finally {
      setLoading(false); // <--- Set loading false after API call
    }
  };

  const handleBack = () => {
    navigate(`/recruiter/${userId}/applications`);
  };


  useEffect(() => {
    const fetchConfiguredRounds = async () => {
      try {
        setLoadingRounds(true);

        const response = await requestApi.get(
          `/exam/recruiter/${jobId}`
        );

        setConfiguredRounds(response.data || []);
      } catch (error) {
        console.error("Error fetching configured rounds:", error);
      } finally {
        setLoadingRounds(false);
      }
    };

    if (userId && jobId) {
      fetchConfiguredRounds();
    }
  }, [userId, jobId]);

  return (
    <>
      <NavbarRecruiterDashboard />

      {/* Back Button */}
      <div className="pt-20 px-6">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-purple-300 rounded-full text-gray-500 hover:text-purple-600 shadow-sm hover:shadow transition-all duration-300 mb-6 font-medium text-sm w-fit"
        >
          <FaArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
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

          {/* Right: Upload PDFs / Minimum Marks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <div className="space-y-4">
              {/* Upload Questions PDF (unchanged) */}
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

              {/* Minimum Marks input (replaces Upload Answers) */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Minimum Marks
                </label>
                <input
                  type="number"
                  min="0"
                  value={min_marks || ""}
                  onChange={(e) => setmin_marks(Number(e.target.value))}
                  placeholder="Enter minimum marks"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
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

        {/* Already Configured Rounds Section */}
        <div className="max-w-6xl mx-auto mt-12 space-y-6">
          {loadingRounds ? (
            <p className="text-sm text-gray-500">Loading rounds...</p>
          ) : configuredRounds.length === 0 ? (
            <p className="text-sm text-gray-500">No rounds configured yet.</p>
          ) : (
            configuredRounds.map((round, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-purple-50 p-6 rounded-xl shadow-md"
              >
                <p className="text-sm font-semibold text-purple-700">
                  {round.roundName}
                </p>

                <p className="text-xs text-gray-600 mt-2">
                  Start: {new Date(round.startTime).toLocaleString()}
                </p>

                <p className="text-xs text-gray-600">
                  End: {new Date(round.endTime).toLocaleString()}
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  Minimum Marks: {round.min_marks}
                </p>
              </motion.div>
            ))
          )}
        </div>


      </div>
    </>
  );
};

export default RecruitmentProcessPage;