// RecruiterJob.jsx (Updated Theme Version)
import React, { useState, useEffect } from "react";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencil,
  HiMagnifyingGlass,
  HiOutlineDocumentPlus,
  HiCheckCircle,
} from "react-icons/hi2";
import { RiSuitcaseLine } from "react-icons/ri";
import requestApi from "../../services/request";
import getUserId from "../../services/getUserId";







const RecruiterJob = () => {
  const userId = getUserId();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [job, setJob] = useState({
    job_id: "",
    
    company_name: "",
    job_title: "",
    job_description: "",
    recruitment_process: "",
    salary_package: "",
    location: [],
    newLocation: "",
    application_deadline: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const jobsPerPage = 5;

function parseLocations (loc) {
  if (Array.isArray(loc)) return loc;
  try {
    
    return JSON.parse(loc);
  } catch {
    return [loc]; 
  }}


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await requestApi.get(`/jobs/recruiter/${userId}`);
        setJobPosts(res.data);
        
        if (res.data.length === 0) {
          showToast("No jobs found. Start posting your jobs!");
        }
        setJobPosts((prev) => {
          return prev.map((job) => ({
            ...job,
            company_name: job.companyName || job.company_name,
            job_title: job.jobTitle || job.job_title,
            job_description: job.jobDescription || job.job_description,
            recruitment_process: job.recruitmentProcess || job.recruitment_process,
            salary_package: job.salaryPackage || job.salary_package,
            locations: parseLocations(job.locations) || parseLocations(job.location),
            application_deadline: job.applicationDeadline || job.application_deadline,  
          }));
        })
       
      } catch {
        showToast("Failed to fetch jobs", "danger");
      }
    };
    fetchJobs();
  }, []);

 useEffect(() => {
    window.scrollTo(0, 0);
   
  }, [ showModal, showDeleteModal,editIndex, currentPage]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  const handlePostJob = async () => {
    const isEditing = editIndex !== null;
    const hasEmpty =
      !job.company_name ||
      !job.job_title ||
      !job.job_description ||
      !job.recruitment_process ||
      !job.salary_package ||
      !job.application_deadline ||
      job.location.length === 0;

    if (hasEmpty) return showToast("Fill all fields", "danger");

    const payload = {
      postedBy: { userId },
      companyName: job.company_name,
      jobTitle: job.job_title,
      jobDescription: job.job_description,
      recruitmentProcess: job.recruitment_process,
      salaryPackage: job.salary_package,
      locations:JSON.stringify(job.location),
      applicationDeadline: job.application_deadline,
    };

    try {
      if (isEditing) {
        const jobId = filteredJobs[editIndex + (currentPage - 1) * jobsPerPage].id;
        const res = await requestApi.put(`/jobs/${getUserId()}/${jobId}`, payload);
        if (res.status === 200) {
          const updated = [...jobPosts];
          const realIndex = jobPosts.findIndex((j) => j.id === jobId);
          updated[realIndex] = { ...res.data };
          setJobPosts(updated);
          showToast("Job updated successfully!");
        }
      } else {
        const res = await requestApi.post(`/jobs/post/${getUserId()}`, payload);
        if (res.status === 200) {
          setJobPosts([res.data, ...jobPosts]);
          showToast("Job posted successfully!");
          setShowSuccessAnimation(true);
          setTimeout(() => setShowSuccessAnimation(false), 2000);
        }
      }
    } catch (error) {
      console.error("Job post failed:", error);
      showToast("Failed to post job", "danger");
    }

    setJob({
      company_name: "",
      job_title: "",
      job_description: "",
      recruitment_process: "",
      salary_package: "",
      location: [],
      newLocation: "",
      application_deadline: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const jobToEdit = filteredJobs[index + (currentPage - 1) * jobsPerPage];
    setJob({
      company_name: jobToEdit.company_name || jobToEdit.companyName,
      job_title: jobToEdit.job_title || jobToEdit.jobTitle,
      job_description: jobToEdit.job_description || jobToEdit.jobDescription,
      recruitment_process: jobToEdit.recruitment_process || jobToEdit.recruitmentProcess,
      salary_package: jobToEdit.salary_package || jobToEdit.salaryPackage,
      location: jobToEdit.locations || [],
      newLocation: "",
      application_deadline: jobToEdit.application_deadline || jobToEdit.applicationDeadline,
    });
    setEditIndex(index);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index + (currentPage - 1) * jobsPerPage);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const jobId = filteredJobs[deleteIndex].id;
    try {
      await requestApi.delete(`/jobs/${getUserId()}/${jobId}`);
      setJobPosts(jobPosts.filter((_, i) => i !== deleteIndex));
      setShowDeleteModal(false);
      showToast("Job deleted", "danger");
    } catch {
      showToast("Failed to delete job", "danger");
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const filteredJobs = jobPosts.filter((job) =>
    (job.company_name || job.companyName).toLowerCase().includes(filterText.toLowerCase()) ||
    (job.job_title || job.jobTitle).toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <>
      <NavbarRecruiterDashboard />

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-3 ${
              toast.type === "danger"
                ? "bg-red-200 border border-red-400 text-red-800"
                : "bg-green-200 border border-green-400 text-green-800"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-tr from-pink-100 to-blue-100/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white px-10 py-7 rounded-3xl shadow-2xl text-center max-w-sm"
            >
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <HiCheckCircle className="text-purple-600 text-6xl mx-auto mb-4 animate-pulse" />
              </motion.div>
              <p className="text-purple-900 font-semibold text-xl">Job Posted Successfully!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Main Container */}
      <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-gray-900 flex flex-col items-center font-poppins select-none transition-all duration-500">
        {/* Form Container with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-6xl rounded-3xl bg-white/90 shadow-2xl border border-purple-100 p-12 flex flex-col gap-8"
        >
          {/* Form Header */}
          <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center tracking-wide drop-shadow-lg flex items-center justify-center gap-3">
            <RiSuitcaseLine className="text-purple-600 text-5xl drop-shadow-sm" />
            Post a Job
          </h2>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries({
              company_name: "Company Name",
              job_title: "Job Title",
              salary_package: "Salary (LPA)",
              application_deadline: "Application Deadline",
            }).map(([key, label]) => (
              <div key={key}>
                <label className="block mb-3 text-base font-semibold text-purple-700">{label}</label>
                <input
                  name={key}
                  type={key === "application_deadline" ? "date" : "text"}
                  value={job[key]}
                  onChange={(e) => setJob({ ...job, [key]: e.target.value })}
                  className="w-full px-5 py-3 rounded-2xl border border-purple-200 bg-purple-50 text-purple-900 placeholder-purple-400 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
                />
              </div>
            ))}

            {/* Location Input */}
            <div className="col-span-2">
              <label className="block mb-3 text-base font-semibold text-purple-700">Locations</label>
              <div className="w-full flex flex-wrap items-center gap-3 px-4 py-3 border border-purple-200 rounded-2xl bg-purple-50 shadow-inner focus-within:ring-4 focus-within:ring-purple-300 transition duration-300">
                {parseLocations(job.location).map((loc, idx) => (
                  <div
                    key={idx}
                    className="bg-purple-600 text-white px-4 py-1 rounded-full flex items-center gap-3 text-sm font-semibold shadow-lg hover:bg-purple-700 transition"
                  >
                    {loc}
                    <button
                      type="button"
                      onClick={() =>
                        setJob({ ...job, location:parseLocations(job.location).filter((_, i) => i !== idx) })
                      }
                      className="hover:text-red-400 text-white font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={job.newLocation || ""}
                  onChange={(e) => setJob({ ...job, newLocation: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && job.newLocation.trim()) {
                      e.preventDefault();
                      if (!job.location.includes(job.newLocation.trim())) {
                        setJob({
                          ...job,
                          location: [...job.location, job.newLocation.trim()],
                          newLocation: "",
                        });
                      }
                    }
                  }}
                  placeholder="Type location & press Enter"
                  className="bg-transparent focus:outline-none text-purple-900 placeholder-purple-500 flex-1 min-w-[140px] py-1"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-purple-600 tracking-wide">
                Press Enter to add multiple locations
              </p>
            </div>
          </div>

          {/* Textareas */}
          {["job_description", "recruitment_process"].map((key) => (
            <div key={key} className="mt-6">
              <label className="block mb-3 text-base font-semibold text-purple-700">
                {key === "job_description" ? "Job Description" : "Recruitment Process"}
              </label>
              <textarea
                rows="3"
                name={key}
                value={job[key]}
                onChange={(e) => setJob({ ...job, [key]: e.target.value })}
                className="w-full px-6 py-3 rounded-3xl border border-purple-200 bg-purple-50 text-purple-900 placeholder-purple-400 shadow-md resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
                placeholder={`Enter ${key === "job_description" ? "job description" : "recruitment process"} here...`}
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(128, 90, 213, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePostJob}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-12 py-4 rounded-3xl shadow-xl font-bold tracking-wide uppercase transition duration-300"
            >
              {editIndex !== null ? "Update Job" : "Post Job"}
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Input */}
        <div className="mt-16 w-full max-w-5xl relative">
          <input
            type="text"
            placeholder="Filter by company or title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-6 py-4 pr-16 text-lg font-semibold border border-purple-200 rounded-3xl bg-purple-50 text-purple-900 placeholder-purple-400 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
          />
          <HiMagnifyingGlass className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 text-2xl" />
        </div>

        {/* Job List */}
        <div className="w-full max-w-6xl space-y-8 mt-10">
          {currentJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl border border-purple-200 bg-white text-purple-900 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            >
              
              <h4 className="text-2xl font-extrabold text-purple-700 mb-2 tracking-wide">
                {job.job_title || job.jobTitle}
              </h4>
              <p className="text-lg font-semibold text-gray-700 mb-3">
                {job.company_name || job.companyName}
              </p>
             <p className="text-sm text-gray-500 mb-2">
  <span className="font-semibold">Locations:</span>{" "}
  {parseLocations(job.location || job.locations).join(" , ")}
</p>

              <p className="text-sm text-gray-500">
                <span className="font-semibold">Deadline:</span>{" "}
                {job.application_deadline || job.applicationDeadline}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-semibold">Job Id: </span>{" "}
                {job.job_id || job.id}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Posted: {dayjs(job.posted_at).format("YYYY-MM-DD HH:mm")}
              </p>
              <div className="absolute top-6 right-6 flex gap-6 text-purple-700">
                <button onClick={() => openModal(job)} className="hover:text-purple-900 transition-transform hover:scale-110" aria-label="View Job">
                  <HiOutlineEye size={24} />
                </button>
                <button onClick={() => handleEdit(index)} className="hover:text-indigo-600 transition-transform hover:scale-110" aria-label="Edit Job">
                  <HiOutlinePencil size={24} />
                </button>
                <button onClick={() => confirmDelete(index)} className="hover:text-red-600 transition-transform hover:scale-110" aria-label="Delete Job">
                  <HiOutlineTrash size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex gap-8 items-center justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-3xl text-purple-700 font-semibold border border-purple-200 bg-purple-100 shadow-md hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <span className="text-purple-700 font-bold text-lg tracking-wide">
              Page <span className="text-purple-900">{currentPage}</span> of{" "}
              <span className="text-purple-900">{totalPages}</span>
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-3xl text-purple-700 font-semibold border border-purple-200 bg-purple-100 shadow-md hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Modal & Delete Confirm */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-6">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-4xl font-semibold transition"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-purple-700 mb-6 tracking-wide">
              {selectedJob.job_title || selectedJob.jobTitle}
            </h2>
            <p className="text-md text-gray-700 mb-3">
              <strong>Company: </strong> {selectedJob.company_name || selectedJob.companyName}
            </p>
            <p className="text-md text-gray-700 mb-3">
              <strong>Salary Package: </strong> {selectedJob.salary_package || selectedJob.salaryPackage} LPA
            </p>
            <p className="text-md text-gray-700 mb-3">
              <strong>Locations: </strong> 
              
             {parseLocations(selectedJob.location || selectedJob.locations).join(" , ")}


            </p>
            <p className="text-md text-gray-700 mb-6">
              <strong>Deadline: </strong> {selectedJob.application_deadline || selectedJob.applicationDeadline}
            </p>
            <h3 className="text-xl font-semibold text-purple-700 mb-3 tracking-wide">Job Description</h3>
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{selectedJob.job_description || selectedJob.jobDescription}</p>
            <h3 className="text-xl font-semibold text-purple-700 mb-3 tracking-wide">Recruitment Process</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.recruitment_process || selectedJob.recruitmentProcess}</p>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
            <p className="text-xl font-semibold text-purple-700 mb-6">Are you sure you want to delete this job?</p>
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-8 py-3 rounded-xl border border-purple-400 text-purple-700 font-semibold hover:bg-purple-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterJob;
