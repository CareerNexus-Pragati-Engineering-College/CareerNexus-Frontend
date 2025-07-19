import React, { useEffect, useState } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ApplicationsPage = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let jobs = JSON.parse(localStorage.getItem("jobs"));

    // Add default dummy jobs if localStorage is empty or corrupted
    if (!Array.isArray(jobs) || jobs.length === 0) {
      jobs = [
        {
          id: "JOB001",
          title: "Frontend Developer",
          description: "Develop and maintain React applications for our main web platform.",
          companyName: "Techify Solutions",
          applicants: [{ name: "Akshay" }, { name: "Riya" }],
        },
        {
          id: "JOB002",
          title: "Backend Engineer",
          description: "Work with Node.js and MongoDB to create APIs and microservices.",
          companyName: "CodeCraft Corp",
          applicants: [{ name: "Vivek" }],
        },
        {
          id: "JOB003",
          title: "UI/UX Designer",
          description: "Design clean, user-friendly interfaces for web and mobile apps.",
          companyName: "PixelSpark",
          applicants: [],
        },
      ];
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    setPostedJobs(jobs);
  }, []);

  const handleStartRecruitment = (jobId) => {
    navigate("/recruitment-process");
  };

  // Safely filter jobs by title (handling undefined values)
  const filteredJobs = postedJobs.filter((job) =>
    (job.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarRecruiterDashboard />
      <div className="pt-24 px-4 pb-16 min-h-screen bg-white text-gray-900 font-poppins">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-gray-800">Applications</h1>

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
                key={job.id}
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
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xl font-semibold text-gray-800 truncate">{job.title || "Untitled Job"}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Job ID:</span> {job.id || "N/A"}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Company Name:</span> {job.companyName || "N/A"}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    <span className="font-semibold">Job Description:</span> {job.description || "No description available."}
                  </p>
                </div>

                {/* Start Recruitment Button */}
                <motion.button
                  onClick={() => handleStartRecruitment(job.id)}
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
    </>
  );
};

export default ApplicationsPage;
