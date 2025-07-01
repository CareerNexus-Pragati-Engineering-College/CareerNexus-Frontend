import React, { useEffect, useState } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaArrowRight, FaUsers , FaClipboardList ,FaFileAlt ,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationsPage = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedRound, setSelectedRound] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setPostedJobs(jobs);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedRound || !uploadedFile) {
      toast.warning("Please select a round and upload a file.");
      return;
    }

    // Simulate submission logic
    console.log("Submitting for job ID:", selectedJobId);
    console.log("Selected Round:", selectedRound);
    console.log("Uploaded File:", uploadedFile.name);

    toast.success("Recruitment round submitted successfully!");

    // Reset selections
    setSelectedRound("");
    setUploadedFile(null);
    setSelectedJobId(null);
  };

  return (
    <>
      <NavbarRecruiterDashboard />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="pt-24 px-4 pb-16 min-h-screen bg-white text-gray-900 font-poppins">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-gray-800">Applications</h1>

          {postedJobs.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven't posted any jobs yet.</p>
          ) : (
            postedJobs.map((job, index) => (
              <div key={job.id}>
                {/* Job Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-gray-300 rounded-2xl p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:shadow-xl transition duration-300"
                >
                  {/* Applicant Count */}
                  <div className="flex items-center gap-4 min-w-[120px]">
                    <div className="p-4 rounded-full bg-purple-100 text-purple-600 shadow-inner">
                      <FaUsers size={30} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Applicants</p>
                      <h2 className="text-3xl font-extrabold text-purple-600">
                        {job.applicants?.length || 0}
                      </h2>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-semibold text-gray-800 mb-2 truncate">{job.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {job.description || "No description provided."}
                    </p>
                  </div>

                  {/* Start Recruitment Button */}
                  <motion.button
                    onClick={() =>
                      setSelectedJobId(selectedJobId === job.id ? null : job.id)
                    }
                    whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(165,100,255,0.7)" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition font-medium"
                  >
                    Start Recruitment <FaArrowRight className="inline ml-2" />
                  </motion.button>
                </motion.div>

                {/* Recruitment Panel */}
                <AnimatePresence>
                  {selectedJobId === job.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 mb-10 bg-gray-50 border border-purple-200 rounded-xl shadow-inner p-6 flex flex-col gap-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Left: Select Round with Icon */}
<div className="flex-1">
  <label className="flex items-center text-sm font-medium text-gray-700 mb-2 gap-2">
    <FaClipboardList className="text-purple-600" />
    Select Round
  </label>
  <select
    value={selectedRound}
    onChange={(e) => setSelectedRound(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
  >
    <option value="">-- Choose a Round --</option>
    <option value="aptitude">Aptitude Round</option>
    <option value="coding">Coding Round</option>
    <option value="communication">Communication Round</option>
  </select>
</div>


                        
                       {/* Right: Upload File with Icon */}
<div className="flex-1">
  <label className="flex items-center text-sm font-medium text-gray-700 mb-2 gap-2">
    <FaFileAlt className="text-purple-600" />
    Upload Test File (PDF, Word)
  </label>

                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="w-full text-sm bg-white border border-gray-300 rounded-md px-4 py-2 file:mr-3 file:border-none file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-md"
                            />
                            {uploadedFile && (
                              <span className="text-sm text-green-600 font-medium">
                                {uploadedFile.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end mr-4 -mt-2">
                        <button
                          onClick={handleSubmit}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all font-medium"
                        >
                          Submit
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationsPage;
