import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import TPORecruiterModal from "./TPORecruiterModal";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";

const TPORecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [expandedRecruiter, setExpandedRecruiter] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [applicantCounts, setApplicantCounts] = useState({}); // { jobId: count }
  const [applicants, setApplicants] = useState({});
  const userId = getuserId();

  // Fallback dummy data if API fails to load
  const dummyData = [
    {
      id: 1,
      userId: 1,
      name: "Ravi Kumar",
      profileLink: "https://linkedin.com/in/ravikumar",
      company: "Infosys",
      jobPostDTO: [
        {
          id: 101,
          jobTitle: "Software Developer",
          applicationDeadline: "2025-07-24",
          postedAt: "2025-06-01",
          applicants: [
            {
              id: 201,
              name: "Akshay Srinivas",
              branch: "CSE",
              year: "3rd Year",
              email: "akshay@mail.com",
              profileLink: "https://linkedin.com/in/akshay",
            },
            { id: 202, name: "Priya Sharma", branch: "ECE", year: "4th Year", email: "priya@mail.com" },
          ],
        },
        {
          id: 102,
          jobTitle: "Backend Engineer",
          applicationDeadline: "2025-08-15",
          postedAt: "2025-06-10",
          applicants: [],
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      name: "Priya Sharma",
      profileLink: "https://linkedin.com/in/priyasharma",
      company: "TCS",
      jobPostDTO: [
        {
          id: 103,
          jobTitle: "Data Analyst",
          applicationDeadline: "2025-07-30",
          postedAt: "2025-06-05",
          applicants: [{ id: 203, name: "Rahul Mehta", branch: "IT", year: "2nd Year", email: "rahul@mail.com" }],
        },
      ],
    },
  ];

  // Fetch recruiters with jobs on mount, fallback to dummy on error
  useEffect(() => {
    async function fetchRecruiters() {
      try {
        const response = await requestApi.get(`jobs/recruiters/job`);
        setRecruiters(response.data);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
        setRecruiters(dummyData);
      }
    }
    fetchRecruiters();
  }, []);

  // Fetch applicant counts per job for a given recruiter and update state map
  const GetApplicantsCount = async (recruiterId) => {
    try {
      const response = await requestApi.get(`applications/counts/per-job/by-recruiter/${recruiterId}`);
      const countsArray = response.data;
      const countsMap = {};
      countsArray.forEach(({ jobId, applicationCount }) => {
        countsMap[jobId] = applicationCount;
      });
      setApplicantCounts((prev) => ({ ...prev, ...countsMap }));
      return countsMap;
    } catch (error) {
      console.error("Error fetching applicants count:", error);
      return {};
    }
  };

  const GetApplicants = async (jobId) => {
    try {
      const response = await requestApi.get(`applications/student/applications/${jobId}`);
      const applicantsData = response.data;
      setApplicants(applicantsData || []);
      return applicantsData;
    } catch (error) {
      console.error("Error fetching applicants:", error);
      return [];
    }
  }
  // Expand or collapse recruiter; fetch counts when expanding
  const toggleRecruiter = async (recruiterId) => {
    if (expandedRecruiter === recruiterId) {
      setExpandedRecruiter(null);
      setExpandedJob(null);
    } else {
      setExpandedRecruiter(recruiterId);
      setExpandedJob(null);
      await GetApplicantsCount(recruiterId);
    }
  };

  // Expand or collapse job
  const toggleJob = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);

    } else {
      GetApplicants(jobId);
      setExpandedJob(jobId);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 px-4 py-6 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 text-center mb-8">
        Recruiters & Job Postings
      </h2>

      <div className="space-y-5">
        {recruiters.length === 0 && (
          <p className="text-center text-gray-500">No recruiters found.</p>
        )}

        {recruiters.map((recruiter) => (
          <motion.div
            key={recruiter.userId}
            className="bg-white/90 rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            {/* Recruiter Header */}
            <div
              className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-violet-100 to-purple-100 cursor-pointer"
              onClick={() => toggleRecruiter(recruiter.userId)}
            >
              <div>
                <h2 className="text-lg font-semibold text-violet-800">{recruiter.name}</h2>
                <p className="text-sm text-gray-600">{recruiter.company || "Company not specified"}</p>
                <p className="text-sm text-gray-500">User ID: {recruiter.userId || "Not Available"}</p>
                <a
                  href={recruiter.profileLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-600 underline flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <User size={14} /> View Profile
                </a>
              </div>
              <button className="text-gray-500 hover:text-violet-700 transition">
                {expandedRecruiter === recruiter.userId ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>
            </div>

            {/* Jobs List */}
            <AnimatePresence>
              {expandedRecruiter === recruiter.userId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 space-y-3"
                >
                  {(!recruiter.jobPostDTO || recruiter.jobPostDTO.length === 0) && (
                    <p className="text-gray-500 italic">No jobs posted by this recruiter.</p>
                  )}

                  {recruiter.jobPostDTO?.map((job) => (
                    <div
                      key={job.id}
                      className="bg-violet-50 rounded-lg p-4 shadow-inner hover:shadow-md transition"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleJob(job.id)}
                      >
                        <div>
                          <h3 className="text-base font-semibold text-violet-700">Job Title: {job.jobTitle}</h3>
                          <p className="text-gray-600 text-sm">Job Id: {job.id}</p>
                          <p className="text-red-600 text-xs">Deadline: {job.applicationDeadline || "N/A"}</p>
                          <p className="text-yellow-600 text-xs">Posted At: {job.postedAt || "N/A"}</p>
                        </div>
                        <span className="px-3 py-1 bg-violet-200  text-violet-700 rounded-full text-xs">
                          {applicantCounts[job.id] !== undefined ? applicantCounts[job.id] : "0"} Applicants
                        </span>
                        <button className="text-gray-500 hover:text-violet-700 transition">
                          {expandedJob === job.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Applicants Table */}
                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3"
                          >
                            {applicants.length > 0 ? (
                              <table className="w-full text-left text-sm border-separate border-spacing-y-1">
                                <thead>
                                  <tr className="bg-violet-100 text-violet-900">
                                    <th className="p-2 rounded-r-lg">Roll No</th>
                                    <th className="p-2 rounded-l-lg">Name</th>
                                    <th className="p-2">Branch</th>
                                    <th className="p-2 rounded-r-lg">Year</th>
                                    <th className="p-2 rounded-r-lg">status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {applicants.map((student) => (
                                    <tr
                                      key={student.id}
                                      onClick={() => setSelectedStudent(student)}
                                      className="bg-white/80 hover:bg-violet-50 cursor-pointer transition duration-200"
                                    >
                                      <td className="p-2">{student.studentUserId}</td>
                                      <td className="p-2">{student.studentFirstName+" "+student.studentLastName}</td>
                                      <td className="p-2">{student.studentDepartment}</td>
                                      <td className="p-2">{student.year}</td>
                                      <td className="p-2">{student.applicationStatus}</td>
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

      {/* Applicant Modal */}
      <TPORecruiterModal student={selectedStudent} onClose={() => setSelectedStudent(false)} />
    </motion.div>
  );
};

export default TPORecruiters;
