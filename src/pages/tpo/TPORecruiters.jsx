import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import TPORecruiterModal from "./TPORecruiterModal";

const TPORecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [expandedRecruiter, setExpandedRecruiter] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Dummy recruiters with jobs & applicants
    const dummyData = [
      {
        id: 1,
        name: "Ravi Kumar",
        profileLink: "https://linkedin.com/in/ravikumar",
        jobs: [
          {
            id: 101,
            title: "Software Developer",
            company: "Infosys",
            applicants: [
              { id: 201, name: "Akshay Srinivas", branch: "CSE", year: "3rd Year", email: "akshay@mail.com", profileLink: "https://linkedin.com/in/akshay" },
              { id: 202, name: "Priya Sharma", branch: "ECE", year: "4th Year", email: "priya@mail.com" },
            ],
          },
          {
            id: 102,
            title: "Backend Engineer",
            company: "Infosys",
            applicants: [],
          },
        ],
      },
      {
        id: 2,
        name: "Priya Sharma",
        profileLink: "https://linkedin.com/in/priyasharma",
        jobs: [
          {
            id: 103,
            title: "Data Analyst",
            company: "TCS",
            applicants: [{ id: 203, name: "Rahul Mehta", branch: "IT", year: "2nd Year", email: "rahul@mail.com" }],
          },
        ],
      },
    ];
    setRecruiters(dummyData);
  }, []);

  const toggleRecruiter = (recruiterId) => {
    setExpandedRecruiter(expandedRecruiter === recruiterId ? null : recruiterId);
    setExpandedJob(null);
  };

  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 px-4 py-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 text-center mb-8">
        👨‍💼 Recruiters & Job Postings
      </h2>

      <div className="space-y-5">
        {recruiters.map((recruiter) => (
          <motion.div
            key={recruiter.id}
            className="bg-white/90 rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            {/* Recruiter Header */}
            <div
              className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-violet-100 to-purple-100 cursor-pointer"
              onClick={() => toggleRecruiter(recruiter.id)}
            >
              <div>
                <h2 className="text-lg font-semibold text-violet-800">{recruiter.name}</h2>
                {recruiter.profileLink && (
                  <a
                    href={recruiter.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-violet-600 underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <User size={14} /> View Profile
                  </a>
                )}
              </div>
              <button className="text-gray-500 hover:text-violet-700 transition">
                {expandedRecruiter === recruiter.id ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>
            </div>

            {/* Jobs List */}
            <AnimatePresence>
              {expandedRecruiter === recruiter.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 space-y-3"
                >
                  {recruiter.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-violet-50 rounded-lg p-4 shadow-inner hover:shadow-md transition"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleJob(job.id)}
                      >
                        <div>
                          <h3 className="text-base font-semibold text-violet-700">{job.title}</h3>
                          <p className="text-gray-600 text-sm">{job.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-violet-200 text-violet-700 rounded-full text-xs">
                          {job.applicants.length} Applicants
                        </span>
                        <button className="text-gray-500 hover:text-violet-700 transition">
                          {expandedJob === job.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Applicants */}
                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3"
                          >
                            {job.applicants.length > 0 ? (
                              <table className="w-full text-left text-sm border-separate border-spacing-y-1">
                                <thead>
                                  <tr className="bg-violet-100 text-violet-900">
                                    <th className="p-2 rounded-l-lg">Name</th>
                                    <th className="p-2">Branch</th>
                                    <th className="p-2 rounded-r-lg">Year</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {job.applicants.map((student) => (
                                    <tr
                                      key={student.id}
                                      onClick={() => setSelectedStudent(student)}
                                      className="bg-white/80 hover:bg-violet-50 cursor-pointer transition duration-200"
                                    >
                                      <td className="p-2">{student.name}</td>
                                      <td className="p-2">{student.branch}</td>
                                      <td className="p-2">{student.year}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-gray-500 italic mt-2 text-sm">
                                No applicants for this job yet.
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Student Modal */}
      <TPORecruiterModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </motion.div>
  );
};

export default TPORecruiters;
