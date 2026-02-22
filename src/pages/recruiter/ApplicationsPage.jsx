import React, { useEffect, useState } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaArrowRight, FaUsers, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import requestApi from "../../services/request";
import getUserId from "../../services/getUserId";
import toast from "react-hot-toast";
const ApplicationsPage = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userId = getUserId();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await requestApi.get(`/applications/counts/per-job/by-recruiter/${userId}`);
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setPostedJobs(res.data);
          toast.success("Applications fetched successfully!", { id: "fetch-applications" });
        } else if (res && Array.isArray(res.data) && res.data.length ===
          0) {
          setPostedJobs([]);

          toast("Student not yet applied for Jobs..", { id: "no-apps", icon: "ℹ️" });
        }
      } catch (error) {
        setPostedJobs([]);
        toast.error("Failed to fetch applications. Please try again.");
      }
    }
    fetchData();

  }, []);

  const handleStartRecruitment = (jobId) => {
    navigate(`/recruiter/${userId}/recruitment-process/${jobId}`);
  };

  // Safely filter jobs by title (handling undefined values)
  const filteredJobs = postedJobs.filter((job) =>
    (job.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarRecruiterDashboard />
      <div className="pt-24 px-4 pb-16 min-h-screen bg-white text-gray-900 font-poppins">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex items-center gap-4">
            <Link
              to={`/recruiter/${userId}/home`}
              className="group flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:border-purple-300 rounded-full text-gray-500 hover:text-purple-600 shadow-sm hover:shadow transition-all duration-300"
              title="Back to Dashboard"
            >
              <FaArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Applications</h1>
          </div>

          {/* Search Input */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by Job Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Job List */}
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500 text-sm">No matching jobs found.</p>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.Id}
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
                      {job.applicationCount || 0}
                    </h2>
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xl font-semibold text-gray-800 truncate">{job.jobTitle || "Untitled Job"}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Job ID:</span> {job.jobId || "N/A"}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    <span className="font-semibold">Job Description:</span> {job.jobDescription || "No description available."}
                  </p>
                </div>

                {/* Start Recruitment Button */}
                <motion.button
                  onClick={() => handleStartRecruitment(job.jobId)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(165,100,255,0.7)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition font-medium whitespace-nowrap"
                >
                  Start Recruitment <FaArrowRight className="inline ml-2" />
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* 📍 Footer */}
      <footer className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">Your one-stop placement tracker</p>
        </div>
      </footer>
    </>
  );
};

export default ApplicationsPage;
