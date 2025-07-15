// src/pages/student/StudentApplications.jsx

import React, { useEffect, useState } from "react";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import { FaClock, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


const dummyJobs = [
  {
    id: 101,
    title: "Software Engineer Intern",
    company: "Infosys",
    experience: "0-1 Years",
    location: "Bangalore",
    posted: "2 weeks ago",
    applicants: "300+",
    type: "Internship",
    applied: true,
    appliedDate: new Date("2025-06-15"),
    status: "Under Review",
    description: "Work on client projects with mentorship. Use Java, Spring Boot.",
  },
  {
    id: 102,
    title: "Frontend Developer",
    company: "Wipro",
    experience: "1-2 Years",
    location: "Hyderabad",
    posted: "1 week ago",
    applicants: "150+",
    type: "Full-time",
    applied: true,
    appliedDate: new Date("2025-06-10"),
    status: "Accepted",
    description: "Build modern UIs using React and Tailwind.",
  },
  {
    id: 103,
    title: "Data Analyst",
    company: "TCS",
    experience: "0-2 Years",
    location: "Chennai",
    posted: "3 days ago",
    applicants: "500+",
    type: "Full-time",
    applied: true,
    appliedDate: new Date("2025-06-12"),
    status: "Rejected",
    description: "Analyze trends, generate reports, and support BI tools.",
  }
];

const StudentApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState(dummyJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("jobs")) ||dummyJobs;
    const filtered = allJobs.filter((job) => job.applied);
    const enriched = filtered.map((job) => ({
      ...job,
      appliedDate: job.appliedDate || new Date().toISOString(),
      status: job.status || "Under Review",
    }));
    setAppliedJobs(enriched);
  }, []);

  const sortByDate = (order) => {
    const sorted = [...appliedJobs].sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });
    setAppliedJobs(sorted);
    setSortOrder(order);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <NavbarStudentDashboard />

      <div className="min-h-screen bg-white text-gray-900 font-poppins px-4 pt-24 pb-6">
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
              {appliedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start justify-between transition shadow-sm hover:shadow-md"
                >
                  <div className="flex gap-4 items-start">
                    <div className="bg-purple-100 text-purple-700 rounded-lg p-2">
                      <FaBuilding size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                      <p className="text-xs text-gray-500">{job.company}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt /> {job.location}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Applied on:{" "}
                        {job.appliedDate
                          ? new Date(job.appliedDate).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-start md:items-end">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-sm text-purple-600 hover:underline font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
              <h3 className="text-xl font-bold mb-1">{selectedJob.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedJob.company}</p>
              <p className="text-sm mb-2">
                <strong>Experience:</strong> {selectedJob.experience}
              </p>
              <p className="text-sm mb-2">
                <strong>Location:</strong> {selectedJob.location}
              </p>
              <p className="text-sm mb-2">
                <strong>Status:</strong> {selectedJob.status}
              </p>
              {selectedJob.description && (
                <p className="text-sm text-gray-700 mt-4">
                  <strong>Description:</strong> {selectedJob.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentApplications;