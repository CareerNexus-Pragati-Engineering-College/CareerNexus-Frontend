import React, { useEffect, useState } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ApplicationsPage = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setPostedJobs(jobs);
  }, []);

  const handleStartRecruitment = (jobId) => {
    // Optionally pass jobId via query or state
    navigate("/recruitment-process");
  };

  return (
    <>
      <NavbarRecruiterDashboard />
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
                    onClick={() => handleStartRecruitment(job.id)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(165,100,255,0.7)" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition font-medium"
                  >
                    Start Recruitment <FaArrowRight className="inline ml-2" />
                  </motion.button>
                </motion.div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationsPage;
