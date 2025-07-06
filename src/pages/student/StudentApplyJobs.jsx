// src/pages/student/StudentApplyJobs.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaBookmark,
  FaRegBookmark,
  FaBuilding,
  FaClock,
  FaMapMarkerAlt,
  FaBolt,
} from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import QuickApplyModal from "./QuickApplyModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ------------------ Dummy Data ------------------
const dummyJobs = [
  {
    id: 1,
    company_name: "TechTammina",
    job_title: "Frontend Developer Intern",
    job_description: "Work with React and Tailwind to build intuitive UIs.",
    recruitment_process: "Portfolio Review > Technical Round > HR",
    salary_package: "Stipend: ₹15,000/month",
    location: "Remote",
    application_deadline: "2025-07-20",
    saved: false,
    applied: false,
  },
  {
    id: 2,
    company_name: "DataBridge Analytics",
    job_title: "Data Analyst",
    job_description: "Analyze trends, create reports using SQL and Power BI.",
    recruitment_process: "Online Test > Interview",
    salary_package: "₹6 LPA",
    location: "Bangalore",
    application_deadline: "2025-07-25",
    saved: false,
    applied: false,
  },
];

const StudentApplyJobs = () => {
  // ------------------ State Setup ------------------
  const [selectedTab, setSelectedTab] = useState("Recommended");
  const [jobs, setJobs] = useState(dummyJobs);
  const [selectedJob, setSelectedJob] = useState(dummyJobs[0]);
  const [filters, setFilters] = useState({ location: "", role: "" });
  const [tempPrefs, setTempPrefs] = useState({ location: "", role: "" });
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { userId } = useParams();

  // ------------------ Load Preferences ------------------
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("jobPreferences"));
    if (prefs) {
      setFilters(prefs);
      setTempPrefs(prefs);
    }
  }, []);

  useEffect(() => {
    if (isPrefModalOpen) {
      setTempPrefs(filters);
    }
  }, [isPrefModalOpen]);

  // ------------------ Save/Unsave Job ------------------
  const toggleSave = (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, saved: !job.saved } : job
    );
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  // ------------------ Filtered Jobs ------------------
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location ? job.location === filters.location : true) &&
      (filters.role ? job.job_title === filters.role : true) &&
      (selectedTab === "Saved" ? job.saved : true)
    );
  });

  return (
    <>
      {/* ------------------ Navbar ------------------ */}
      <NavbarStudentDashboard />

      {/* ------------------ Main Container ------------------ */}
      <div className="min-h-screen bg-white text-gray-900 font-poppins px-4 pt-24 pb-6">
        <div className="max-w-7xl mx-auto">

          {/* ------------------ Header ------------------ */}
          <div className="px-1 mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Jobs for you</h2>
            <button
              onClick={() => setIsPrefModalOpen(true)}
              className="text-purple-700 text-sm flex items-center gap-1"
            >
              Edit preferences <LuPenLine size={16} />
            </button>
          </div>

          {/* ------------------ Tabs ------------------ */}
          <div className="flex gap-6 border-b mb-6 text-sm px-1">
            {["Recommended", "Saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-2 border-b-2 font-medium ${
                  selectedTab === tab
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ------------------ Content Grid ------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ------------------ Job List ------------------ */}
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-hide">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer border p-4 rounded-xl flex gap-4 items-start hover:shadow ${
                    selectedJob?.id === job.id ? "border-purple-600" : "border-gray-200"
                  }`}
                >
                  <div className="bg-purple-100 text-purple-700 rounded-lg p-2">
                    <FaBuilding size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{job.job_title}</h3>
                    <p className="text-xs text-gray-500">{job.company_name}</p>
                    <p className="text-xs text-gray-500">{job.location}</p>
                    <p className="text-xs text-gray-400">
                      Deadline: {job.application_deadline}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(job.id);
                    }}
                  >
                    {job.saved ? (
                      <FaBookmark className="text-purple-600" />
                    ) : (
                      <FaRegBookmark className="text-gray-400 hover:text-purple-600" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* ------------------ Job Details Panel ------------------ */}
            {selectedJob && (
              <div className="bg-gray-50 p-6 rounded-xl shadow space-y-5 overflow-y-auto max-h-[75vh] border border-purple-300 scrollbar-hide">
                <div className="flex gap-4 items-center">
                  <div className="bg-purple-100 text-purple-700 rounded-lg p-2">
                    <FaBuilding size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedJob.job_title}</h3>
                    <p className="text-sm text-gray-600">{selectedJob.company_name}</p>
                    <p className="text-xs text-gray-400">
                      Deadline: {selectedJob.application_deadline}
                    </p>
                  </div>
                </div>

                {selectedJob.applied ? (
                  <button
                    disabled
                    className="bg-green-100 text-green-700 py-2 px-4 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    ✅ Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <FaBolt /> Quick Apply
                  </button>
                )}

                <div>
                  <h4 className="font-semibold mb-1">Job Description</h4>
                  <p className="text-sm text-gray-700">{selectedJob.job_description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Recruitment Process</h4>
                  <p className="text-sm text-gray-700">{selectedJob.recruitment_process}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Salary Package</h4>
                  <p className="text-sm text-gray-700">{selectedJob.salary_package}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-sm text-gray-700">{selectedJob.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------ Preferences Modal ------------------ */}
      {isPrefModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Set Preferences</h3>
            <div className="space-y-4">
              {["location", "role"].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {key === "role" ? "Preferred Role" : `Preferred ${key}`}
                  </label>
                  <select
                    name={key}
                    value={tempPrefs[key]}
                    onChange={(e) =>
                      setTempPrefs((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="">Any</option>
                    {[...new Set(jobs.map((j) => j[key === "role" ? "job_title" : "location"]))].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsPrefModalOpen(false)}
                className="text-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setFilters(tempPrefs);
                  localStorage.setItem("jobPreferences", JSON.stringify(tempPrefs));
                  setIsPrefModalOpen(false);
                  toast.success("Preferences updated successfully!", {
                  position: "top-right",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  className:"!top-[85px] !right-6 !absolute bg-white border border-purple-300 text-purple-800 rounded-xl shadow-lg px-4 py-3 font-medium z-[9999]",bodyClassName: "text-sm",
                  closeButton: ({ closeToast }) => (
                  <button
                  onClick={closeToast}
                  className="ml-3 text-red-500 hover:text-red-600 text-lg leading-none font-bold" aria-label="Close" >&times;
                  </button>
                  ),
                });
                }}
                className="bg-purple-700 text-white px-4 py-2 text-sm rounded"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ Apply Modal ------------------ */}
      {showApplyModal && (
        <QuickApplyModal
          job={selectedJob}
          onClose={() => setShowApplyModal(false)}
          onApply={(updatedJob) => {
            const updatedJobs = jobs.map((job) =>
              job.id === updatedJob.id ? { ...job, applied: true } : job
            );
            setJobs(updatedJobs);
            setShowApplyModal(false);
          }}
          userId={userId}
        />
      )}

      {/* ------------------ Toast Container ------------------ */}
      <ToastContainer newestOnTop closeOnClick draggable />
    </>
  );
};

export default StudentApplyJobs;
