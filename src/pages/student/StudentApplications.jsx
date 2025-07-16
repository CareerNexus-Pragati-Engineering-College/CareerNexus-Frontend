// src/pages/student/StudentApplications.jsx

import React, { useEffect, useState } from "react";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import { FaClock, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const dummyApplications = [
  {
    job: {
      companyName: "Infosys",
      jobTitle: "Software Developer",
      salaryPackage: "10,00,000",
      applicationDeadline: "2025-07-16",
      locations: JSON.stringify(["India", "Hyderabad", "Chennai"]),
      jobDescription: "Develop and maintain scalable software solutions.",
      recruitmentProcess: "Online test → Technical Round → HR Round",
      postedAt: "2025-07-14",
    },
    applicationDate: "2025-07-14T12:00:46.424398",
    status: "PENDING",
    feedback: null,
    appliedResumeUrl: "",
  },

  {
    job: {
      companyName: "TCS",
      jobTitle: "Data Analyst",
      salaryPackage: "8,50,000",
      applicationDeadline: "2025-07-18",
      locations: JSON.stringify(["Mumbai"]),
      jobDescription: "Work with business teams to provide data insights.",
      recruitmentProcess: "Aptitude Test → Interview",
      postedAt: "2025-07-12",
    },
    applicationDate: "2025-07-15T10:10:00.000Z",
    status: "REJECTED",
    feedback: "We regret to inform you...",
    appliedResumeUrl: "",
  },

  {
    job: {
      companyName: "Capgemini",
      jobTitle: "DevOps Engineer",
      salaryPackage: "11,20,000",
      applicationDeadline: "2025-07-20",
      locations: JSON.stringify(["Bangalore", "Remote"]),
      jobDescription: "Automate CI/CD pipelines and manage cloud infrastructure.",
      recruitmentProcess: "Online Test → Technical Interview → HR Interview",
      postedAt: "2025-07-13",
    },
    applicationDate: "2025-07-15T15:30:00.000Z",
    status: "ACCEPTED",
    feedback: "You’ve been shortlisted! HR will contact you shortly.",
    appliedResumeUrl: "",
  },
];


const StudentApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    setAppliedJobs(dummyApplications);
  }, []);

  const sortByDate = (order) => {
    const sorted = [...appliedJobs].sort((a, b) => {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });
    setAppliedJobs(sorted);
    setSortOrder(order);
  };

  const getStatusStyle = (status) => {
    switch (status.toUpperCase()) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "PENDING":
      case "UNDER REVIEW":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <NavbarStudentDashboard />

      <motion.div
  className="min-h-screen bg-white text-gray-900 font-poppins px-4 pt-24 pb-6"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Applications</h2>

            <div className="text-sm">
              <label className="mr-2 font-medium text-gray-600">Sort:</label>
              <select
                value={sortOrder}
                onChange={(e) => sortByDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {appliedJobs.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications yet.</p>
          ) : (
            <div className="grid gap-4">
              {appliedJobs.map((app, index) => {
                const locations = JSON.parse(app.job.locations || "[]");
                return (
                  <div
                    key={index}
                    className="border p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start justify-between transition shadow-sm hover:shadow-md"
                  >
                    {/* Left Side */}
                    <div className="flex gap-4 items-start w-full md:w-[75%]">
                      <div className="bg-purple-100 text-purple-700 rounded-lg p-2 mt-1">
                        <FaBuilding size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">{app.job.jobTitle}</h3>
                        <p className="text-sm text-gray-500 font-medium">{app.job.companyName}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt />
                            {locations.join(", ")}
                          </span>
                          <span className="text-gray-400">
                            • Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col gap-2 items-end w-full md:w-[25%]">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                      <button
                        onClick={() => setSelectedJob(app)}
                        className="text-sm text-purple-600 hover:underline font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-lg w-full shadow-xl relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedJob(null)}
              >
                &#x2715;
              </button>
              <h3 className="text-xl font-bold mb-1">{selectedJob.job.jobTitle}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedJob.job.companyName}</p>
              <p className="text-sm mb-2">
                <strong>Salary:</strong> ₹{selectedJob.job.salaryPackage}
              </p>
              <p className="text-sm mb-2">
                <strong>Deadline:</strong> {selectedJob.job.applicationDeadline}
              </p>
              <p className="text-sm mb-2">
                <strong>Recruitment Process:</strong> {selectedJob.job.recruitmentProcess}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Description:</strong> {selectedJob.job.jobDescription}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentApplications;
