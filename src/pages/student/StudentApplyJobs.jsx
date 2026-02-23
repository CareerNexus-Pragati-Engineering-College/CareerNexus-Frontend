// src/pages/student/StudentApplyJobs.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaBookmark,
  FaRegBookmark,
  FaBuilding,
  FaBolt,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaTasks,
} from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import QuickApplyModal from "./QuickApplyModal";
import requestApi from "../../services/request";
import toast from "react-hot-toast";
import getUserId from "../../services/getUserId";
import { useLocation } from "react-router-dom";

const StudentApplyJobs = () => {
  // ------------------ State Setup ------------------
  const [selectedTab, setSelectedTab] = useState("Recommended");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobRounds, setJobRounds] = useState([]);
  const [isLoadingRounds, setIsLoadingRounds] = useState(false);
  const [filters, setFilters] = useState({ location: "", role: "" });
  const [tempPrefs, setTempPrefs] = useState({ location: "", role: "" });
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const userId = getUserId();
  const location = useLocation();

  const parseLocation = (loc) => {
    if (Array.isArray(loc)) return loc.join(", ");
    try {
      const parsed = JSON.parse(loc);
      return Array.isArray(parsed) ? parsed.join(", ") : parsed;
    } catch {
      return loc || "N/A";
    }
  };

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("jobPreferences"));
    if (prefs) setFilters(prefs);

    const queryParams = new URLSearchParams(location.search);
    const jobIdFromQuery = queryParams.get("jobId");
    const shouldAutoApply = queryParams.get("apply") === "true";

    const fetchJobs = async () => {
      try {
        const res = await requestApi.get(`/jobs/all`);

        const jobsWithSaved = res.data.map((job) => ({
          job_title: job.jobTitle,
          company_name: job.companyName,
          job_description: job.jobDescription,
          recruitment_process: job.recruitmentProcess,
          salary_package: job.salaryPackage,
          location: job.locations,
          application_deadline: job.applicationDeadline?.time
            ? new Date(job.applicationDeadline.time).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )
            : job.applicationDeadline,
          id: job.id,
          saved: false,
          applied: false,
        }));

        setJobs(jobsWithSaved);

        // 🔥 Auto select and open modal
        if (jobIdFromQuery) {
          const matchedJob = jobsWithSaved.find(
            (job) => job.id.toString() === jobIdFromQuery,
          );

          if (matchedJob) {
            setSelectedJob(matchedJob);

            if (shouldAutoApply) {
              setShowApplyModal(true);
            }
          }
        } else {
          setSelectedJob(jobsWithSaved[0]);
        }
      } catch {
        toast.error("Failed to fetch jobs", { id: "fetch-jobs-error" });
      }
    };

    fetchJobs();
  }, [location.search]);

  useEffect(() => {
    if (isPrefModalOpen) {
      setTempPrefs(filters);
    }
  }, [isPrefModalOpen]);

  // Fetch rounds for the selected job
  useEffect(() => {
    const fetchJobRounds = async () => {
      if (!selectedJob?.id) return;
      setIsLoadingRounds(true);
      try {
        const res = await requestApi.get(`/exam/student/${selectedJob.id}`);
        setJobRounds(res.data || []);
      } catch (err) {
        console.error("Failed to fetch rounds:", err);
        setJobRounds([]);
      } finally {
        setIsLoadingRounds(false);
      }
    };
    fetchJobRounds();
  }, [selectedJob]);

  // ------------------ Save/Unsave Job ------------------
  const toggleSave = (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, saved: !job.saved } : job,
    );
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  // ------------------ Filtered Jobs ------------------
  const filteredJobs = jobs.filter((job) => {
    const jobLoc = parseLocation(job.location);
    return (
      (filters.location ? jobLoc.includes(filters.location) : true) &&
      (filters.role ? job.job_title === filters.role : true) &&
      (selectedTab === "Saved" ? job.saved : true)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] font-poppins relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ------------------ Navbar ------------------ */}
      <NavbarStudentDashboard />

      {/* ------------------ Main Container ------------------ */}
      <motion.div
        className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-28 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* ------------------ Header ------------------ */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                to={`/student/${userId}/home`}
                className="group flex items-center justify-center w-12 h-12 bg-white/70 backdrop-blur-md border border-white/60 hover:border-violet-300 rounded-full text-violet-600 hover:text-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
                title="Back to Dashboard"
              >
                <FaArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </Link>
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/80 border border-violet-200 mb-2 backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                    Career Portal
                  </span>
                </motion.div>
                <h2 className="text-4xl font-extrabold text-[#2F2F5B] tracking-tight">
                  Jobs for you
                </h2>
              </div>
            </div>

            <button
              onClick={() => setIsPrefModalOpen(true)}
              className="bg-white/70 backdrop-blur-md hover:bg-white border border-violet-200 text-violet-700 text-sm font-semibold flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-[0_4px_15px_rgba(107,78,207,0.1)] hover:shadow-[0_6px_20px_rgba(107,78,207,0.15)] transition-all"
            >
              <LuPenLine size={18} /> Edit preferences
            </button>
          </div>

          <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(107,78,207,0.05)]">
            {/* ------------------ Tabs ------------------ */}
            <div className="flex gap-6 border-b border-violet-100 mb-8 pb-1">
              {["Recommended", "Saved"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-3 font-semibold text-sm sm:text-base relative transition-colors ${
                    selectedTab === tab
                      ? "text-violet-700"
                      : "text-[#4b436f] hover:text-violet-500"
                  }`}
                >
                  {tab}
                  {selectedTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ------------------ Content Grid ------------------ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* ------------------ Job List ------------------ */}
              <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                <AnimatePresence>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedJob(job)}
                        className={`group cursor-pointer bg-white/80 backdrop-blur border p-5 rounded-2xl flex gap-4 items-start shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${
                          selectedJob?.id === job.id
                            ? "border-violet-400 shadow-[0_4px_20px_rgba(107,78,207,0.15)] ring-1 ring-violet-200"
                            : "border-violet-100 hover:border-violet-300"
                        }`}
                      >
                        {selectedJob?.id === job.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>
                        )}
                        <div className="bg-gradient-to-br from-violet-100 to-indigo-50 text-violet-600 rounded-xl p-3 shadow-sm border border-violet-100 group-hover:scale-105 transition-transform">
                          <FaBuilding size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#2C225A] text-base mb-1 group-hover:text-violet-700 transition-colors line-clamp-1">
                            {job.job_title}
                          </h3>
                          <p className="text-sm font-medium text-[#4b436f] mb-2">
                            {job.company_name}
                          </p>

                          <div className="flex flex-wrap gap-2 text-xs font-medium">
                            <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                              <FaMapMarkerAlt className="text-gray-400" />{" "}
                              {parseLocation(job.location)}
                            </span>
                            <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-md">
                              <FaCalendarAlt className="text-red-400" />{" "}
                              {job.application_deadline}
                            </span>
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
                          <h4 className="font-semibold mb-1">
                            Job Description
                          </h4>
                          <p className="text-sm text-gray-700">
                            {selectedJob.job_description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">
                            Recruitment Process
                          </h4>
                          <p className="text-sm text-gray-700 mb-3">
                            {selectedJob.recruitment_process}
                          </p>

                          {/* Round Configuration Section */}
                          <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                            <h5 className="text-sm font-bold text-purple-800 mb-3 flex items-center gap-2">
                              Scheduled Assessment Rounds
                            </h5>
                            {isLoadingRounds ? (
                              <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-purple-600"></div>
                              </div>
                            ) : jobRounds.length > 0 ? (
                              <div className="space-y-3">
                                {jobRounds.map((round, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 bg-purple-50/50 rounded-lg border border-purple-50 transition-all hover:border-purple-200"
                                  >
                                    <div className="bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-bold text-gray-800 truncate">
                                        {round.roundName}
                                      </p>
                                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                          <span className="font-semibold text-purple-600">
                                            Start:
                                          </span>
                                          {new Date(
                                            round.startTime,
                                          ).toLocaleString()}
                                        </p>
                                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                          <span className="font-semibold text-purple-600">
                                            End:
                                          </span>
                                          {new Date(
                                            round.endTime,
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Start Test Button */}
                                    {new Date() >= new Date(round.startTime) &&
                                      new Date() <= new Date(round.endTime) && (
                                        <Link
                                          to={round.examUrl}
                                          className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold px-3 py-1 rounded-md transition-colors shrink-0 self-center"
                                        >
                                          Start Test
                                        </Link>
                                      )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-xs text-gray-400 italic">
                                  No specific assessment rounds configured yet.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Salary Package</h4>
                          <p className="text-sm text-gray-700">
                            {selectedJob.salary_package}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Location</h4>
                          <p className="text-sm text-gray-700">
                            {parseLocation(selectedJob.location)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(job.id);
                          }}
                          className="p-2 rounded-full hover:bg-violet-50 transition-colors"
                        >
                          {job.saved ? (
                            <FaBookmark className="text-violet-600 text-lg" />
                          ) : (
                            <FaRegBookmark className="text-gray-300 hover:text-violet-500 text-lg" />
                          )}
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white/60 border border-dashed border-violet-200 rounded-2xl">
                      <FaBuilding className="mx-auto text-4xl text-violet-200 mb-3" />
                      <h3 className="text-lg font-bold text-gray-700 mb-1">
                        No Jobs Found
                      </h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your preferences.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* ------------------ Job Details Panel ------------------ */}
              <div className="lg:col-span-7">
                {selectedJob ? (
                  <motion.div
                    key={selectedJob.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgba(107,78,207,0.08)] border border-violet-100 overflow-y-auto max-h-[70vh] scrollbar-hide relative"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                    <div className="flex flex-wrap gap-6 items-start justify-between mb-8 pb-6 border-b border-gray-100 relative z-10">
                      <div className="flex gap-5 items-center">
                        <div className="bg-gradient-to-br from-violet-100 to-indigo-50 text-violet-600 rounded-2xl p-4 shadow-sm border border-violet-200">
                          <FaBuilding size={36} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#2F2F5B] mb-1">
                            {selectedJob.job_title}
                          </h3>
                          <p className="text-lg font-medium text-violet-600">
                            {selectedJob.company_name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                            Job ID: {selectedJob.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {selectedJob.applied ? (
                          <button
                            disabled
                            className="bg-emerald-50 text-emerald-600 border border-emerald-200 py-2.5 px-6 rounded-xl font-bold flex items-center gap-2 shadow-sm cursor-not-allowed"
                          >
                            ✅ Successfully Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowApplyModal(true)}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-2.5 px-6 rounded-xl font-bold flex items-center gap-2 shadow-[0_4px_15px_rgba(107,78,207,0.3)] hover:shadow-[0_6px_20px_rgba(107,78,207,0.4)] transition-all transform hover:-translate-y-0.5"
                          >
                            <FaBolt /> Quick Apply Now
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                        <div className="mt-0.5 text-violet-500">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            Location
                          </h4>
                          <p className="text-sm font-semibold text-[#2C225A] mt-0.5">
                            {parseLocation(selectedJob.location)}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                        <div className="mt-0.5 text-emerald-500">
                          <FaWallet />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            Salary Package
                          </h4>
                          <p className="text-sm font-semibold text-[#2C225A] mt-0.5">
                            {selectedJob.salary_package}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                        <div className="mt-0.5 text-red-400">
                          <FaCalendarAlt />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            Apply Before
                          </h4>
                          <p className="text-sm font-semibold text-[#2C225A] mt-0.5">
                            {selectedJob.application_deadline}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                        <div className="mt-0.5 text-blue-500">
                          <FaTasks />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            Recruitment Process
                          </h4>
                          <p className="text-sm font-semibold text-[#2C225A] mt-0.5">
                            {selectedJob.recruitment_process}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <h4 className="font-extrabold text-[#2F2F5B] text-lg flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-violet-500 rounded-full inline-block"></span>
                        Job Description
                      </h4>
                      <p className="text-[#4b436f] text-sm leading-relaxed bg-violet-50/30 p-5 rounded-2xl border border-violet-100/50 whitespace-pre-line">
                        {selectedJob.job_description}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full bg-white/40 border border-dashed border-violet-200 rounded-3xl flex flex-col items-center justify-center p-10 text-center">
                    <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                      <FaBuilding className="text-3xl text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C225A] mb-2">
                      Select a Job Listing
                    </h3>
                    <p className="text-[#4b436f]">
                      Click on any job from the list to view detailed
                      information and apply.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ------------------ Preferences Modal ------------------ */}
      <AnimatePresence>
        {isPrefModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 pb-8 relative">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Set Job Preferences
                </h3>
                <p className="text-violet-100 text-sm mt-1">
                  Filter your job feed based on your interests.
                </p>
              </div>

              <div className="p-6 pt-0 relative -mt-4 bg-white rounded-t-[2rem]">
                <div className="space-y-5 pt-6">
                  {["location", "role"].map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-bold text-[#2C225A] mb-2 capitalize">
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
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all outline-none text-[#4b436f]"
                      >
                        <option value="">Any</option>
                        {[
                          ...new Set(
                            jobs.flatMap((j) =>
                              key === "role"
                                ? [j.job_title]
                                : (() => {
                                    try {
                                      const parsed = JSON.parse(j.location);
                                      return Array.isArray(parsed)
                                        ? parsed
                                        : [parsed];
                                    } catch {
                                      return Array.isArray(j.location)
                                        ? j.location
                                        : [j.location];
                                    }
                                  })(),
                            ),
                          ),
                        ]
                          .filter(Boolean)
                          .map((val) => (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    onClick={() => setIsPrefModalOpen(false)}
                    className="px-5 py-2.5 text-gray-600 font-semibold text-sm hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setFilters(tempPrefs);
                      localStorage.setItem(
                        "jobPreferences",
                        JSON.stringify(tempPrefs),
                      );
                      setIsPrefModalOpen(false);
                      toast.success("Preferences updated successfully!", {
                        id: "prefs-updated",
                      });
                    }}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------ Apply Modal ------------------ */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowApplyModal(false)}
            ></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg"
            >
              <QuickApplyModal
                job={selectedJob}
                onClose={() => setShowApplyModal(false)}
                onApply={(updatedJob) => {
                  const updatedJobs = jobs.map((job) =>
                    job.id === updatedJob.id ? { ...job, applied: true } : job,
                  );
                  setJobs(updatedJobs);
                  setShowApplyModal(false);
                }}
                userId={userId}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📍 Footer */}
      <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 relative z-10 mt-auto">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">Your one-stop placement tracker</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentApplyJobs;
