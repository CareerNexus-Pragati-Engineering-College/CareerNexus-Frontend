// src/pages/student/StudentApplications.jsx

import React, { useEffect, useState } from "react";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import { FaClock, FaMapMarkerAlt, FaBuilding, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import requestApi from "../../services/request";
import getUserId from "../../services/getUserId";
import toast from "react-hot-toast";

const dummyApplications = [
  {
    jobPost: {
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
    jobPost: {
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


];


const StudentApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const userId = getUserId()
  const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await requestApi.get(`/applications/my-applications`);
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setAppliedJobs(res.data);
          toast.success("Applications fetched successfully!", { id: "fetch-applications" });
        } else if (res && Array.isArray(res.data) && res.data.length ===
          0) {
          setAppliedJobs([]);

          toast("You have not applied to any jobs yet.", { id: "no-apps", icon: "ℹ️" });
        }
      } catch (error) {
        setAppliedJobs([]);
        toast.error("Failed to fetch applications. Please try again.");
      }
    }
    fetchData();
  }, [userId]);

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
            <div className="flex items-center gap-4">
              <Link
                to={`/student/${userId}/home`}
                className="group flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:border-purple-300 rounded-full text-gray-500 hover:text-purple-600 shadow-sm hover:shadow transition-all duration-300"
                title="Back to Dashboard"
              >
                <FaArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              </Link>
              <h2 className="text-2xl font-semibold">Your Applications</h2>
            </div>

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
                const locations = JSON.parse(app.jobPost.locations || "[]") || [];
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
                        <h3 className="font-semibold text-base mb-1">{app.jobPost.jobTitle}</h3>
                        <p className="text-sm text-gray-500 font-medium">{app.jobPost.companyName}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt />
                            {locations.join(", ")}
                          </span>

                          <span className="flex items-center gap-1">
                            <FaClock />
                            {new Date(app.applicationDate).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className="flex items-center gap-1">

                            {new Date(app.applicationDate).toLocaleDateString()}
                          </span>

                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <p className="flex items-center gap-1 ">
                            FeedBack: {
                              app.feedback ? (<span>{app.feedback}</span>) : (<span>No Feedback Available </span>)
                            }
                          </p>

                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                          <p className="flex items-center gap-1 ">
                            Resume:
                            {app.appliedResumeUrl ? (
                              <a
                                href={`${backendUrl}:${backendPort}/uploads/resumes${app.appliedResumeUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Resume
                              </a>
                            ) : (
                              <span className="text-gray-500">No Resume Uploaded</span>
                            )}
                          </p>
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
              <h3 className="text-xl font-bold mb-1">{selectedJob.jobPost.jobTitle}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedJob.jobPost.companyName}</p>
              <p className="text-sm mb-2">
                <strong>Salary:</strong> ₹{selectedJob.jobPost.salaryPackage}
              </p>
              <p className="text-sm mb-2">
                <strong>Deadline:</strong> {selectedJob.jobPost.applicationDeadline}
              </p>
              <p className="text-sm mb-2">
                <strong>Recruitment Process:</strong> {selectedJob.jobPost.recruitmentProcess}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Description:</strong> {selectedJob.jobPost.jobDescription}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentApplications;
