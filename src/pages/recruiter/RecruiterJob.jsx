import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlusCircle,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiXMark,
  HiMagnifyingGlass,
  HiCheckCircle,
} from "react-icons/hi2";
import dayjs from "dayjs";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import requestApi from "../../services/request";
import getUserId from "../../services/getUserId";

const RecruiterJob = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [jobPosts, setJobPosts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const userId = getUserId();

  const jobsPerPage = 5;

  const [job, setJob] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    recruitment_process: "",
    salary_package: "",
    location: "",
    application_deadline: "",
  });

  useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, [editIndex, showModal, showDeleteModal, currentPage]);
  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await requestApi.get(`/job/${userId}`);
        setJobPosts(res.data || []);
      } catch (err) {
        showToast("Failed to fetch jobs", "danger");
      }
    };
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  // Form change handler
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Post or update job
  const handlePostJob = async () => {
    // Validate
    if (
      !job.company_name ||
      !job.job_title ||
      !job.job_description ||
      !job.recruitment_process ||
      !job.salary_package ||
      !job.location ||
      !job.application_deadline
    ) {
      showToast("Please fill all fields", "danger");
      return;
    }

    // If editing, send update to backend
    if (editIndex !== null) {
      const jobToEdit = filteredJobs[editIndex + (currentPage - 1) * jobsPerPage];
      const jobId = jobToEdit.job_id || jobToEdit.id;

      const payload = {
        companyName: job.company_name,
        jobTitle: job.job_title,
        jobDescription: job.job_description,
        recruitmentProcess: job.recruitment_process,
        salaryPackage: job.salary_package,
        locations: Array.isArray(job.location) ? job.location : [job.location],
        applicationDeadline: job.application_deadline,
         postedBy: { userId: userId },
      };

      try {
        const response = await requestApi.put(`/job/update/${jobId}`, payload);
        if (response.status === 200) {
          // Update local state
          const updatedPosts = [...jobPosts];
          const realIndex = jobPosts.findIndex(j => (j.job_id || j.id) === jobId);
          if (realIndex !== -1) {
            updatedPosts[realIndex] = {
              ...updatedPosts[realIndex],
              ...payload,
              company_name: payload.companyName,
              job_title: payload.jobTitle,
              job_description: payload.jobDescription,
              recruitment_process: payload.recruitmentProcess,
              salary_package: payload.salaryPackage,
              location: payload.locations[0],
              application_deadline: payload.applicationDeadline,
            };
            setJobPosts(updatedPosts);
          }
          showToast("✅ Job updated successfully!");
        } else {
          showToast("❌ Failed to update job", "danger");
        }
      } catch (err) {
        showToast("❌ Failed to update job", "danger");
      }
      setEditIndex(null);
      setJob({
        company_name: "",
        job_title: "",
        job_description: "",
        recruitment_process: "",
        salary_package: "",
        location: "",
        application_deadline: "",
      });
      return;
    }

    // Posting new job
    try {
      const payload = {
        postedBy: { userId: userId },
        companyName: job.company_name,
        jobTitle: job.job_title,
        jobDescription: job.job_description,
        recruitmentProcess: job.recruitment_process,
        salaryPackage: job.salary_package,
        locations: Array.isArray(job.location) ? job.location : [job.location],
        applicationDeadline: job.application_deadline,
      };

      const response = await requestApi.post("/job/post", payload);
      if (response.status === 200) {
        setJobPosts([response.data, ...jobPosts]);
        showToast("✅ Job posted successfully!");
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 1800);
        setJob({
          company_name: "",
          job_title: "",
          job_description: "",
          recruitment_process: "",
          salary_package: "",
          location: "",
          application_deadline: "",
        });
      } else {
        showToast("❌ Failed to post job", "danger");
      }
    } catch (error) {
      showToast("❌ Failed to post job", "danger");
    }
  };

  // Delete logic
  const confirmDelete = (index) => {
    setDeleteIndex(index + (currentPage - 1) * jobsPerPage);
    setShowDeleteModal(true);
  };

  const handleDelete =async () => {
    const realIndex = deleteIndex;
    const jobToDelete = filteredJobs[realIndex];
    const jobId = jobToDelete.job_id || jobToDelete.id;
    await requestApi.delete(`/job/${jobId}`)
    
    const updated = jobPosts.filter((_, i) => i !== deleteIndex);
    setJobPosts(updated);
    setShowDeleteModal(false);
    showToast("❌ Job deleted", "danger");

    // Adjust page if necessary
    const totalPages = Math.ceil((filteredJobs.length - 1) / jobsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
  };

  // Edit logic
  const handleEdit = (index) => {
   
    const realIndex = index + (currentPage - 1) * jobsPerPage;
    const jobToEdit = filteredJobs[realIndex];
    setJob({
      company_name: jobToEdit.company_name || jobToEdit.companyName || "",
      job_title: jobToEdit.job_title || jobToEdit.jobTitle || "",
      job_description: jobToEdit.job_description || jobToEdit.jobDescription || "",
      recruitment_process: jobToEdit.recruitment_process || jobToEdit.recruitmentProcess || "",
      salary_package: jobToEdit.salary_package || jobToEdit.salaryPackage || "",
      location: jobToEdit.location || (Array.isArray(jobToEdit.locations) ? jobToEdit.locations[0] : jobToEdit.locations) || "",
      application_deadline: jobToEdit.application_deadline || jobToEdit.applicationDeadline || "",
    });
    setEditIndex(realIndex);
  };

  // Filtering
  const filteredJobs = jobPosts.filter(
    (job) =>
      (job.company_name || job.companyName || "")
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      (job.job_title || job.jobTitle || "")
        .toLowerCase()
        .includes(filterText.toLowerCase())
  );

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Modal
  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

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
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-3 ${toast.type === "danger"
              ? "bg-red-100 border border-red-300 text-red-700"
              : "bg-green-100 border border-green-300 text-green-700"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white px-8 py-6 rounded-3xl shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <HiCheckCircle className="text-green-500 text-5xl mx-auto mb-2" />
              </motion.div>
              <p className="text-gray-800 font-semibold text-lg">Job Posted Successfully!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-violet-700 shadow-[0_0_30px_rgba(138,43,226,0.5)]"
            >
              <div className="bg-gradient-to-br from-[#1c1c2e]/90 to-[#22223b]/90 rounded-2xl w-full max-w-lg text-white">
                <div className="relative p-6 border-b border-purple-500/30">
                  <h3 className="text-2xl font-bold text-purple-300">{selectedJob.job_title || selectedJob.jobTitle}</h3>
                  <button
                    className="absolute top-6 right-6 text-purple-400 hover:text-red-400 transition"
                    onClick={() => setShowModal(false)}
                  >
                    <HiXMark size={24} />
                  </button>
                </div>
                <div className="p-6 pt-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent space-y-3 text-sm text-purple-100 leading-relaxed">
                  <p><span className="font-semibold text-purple-300">Company:</span> {selectedJob.company_name || selectedJob.companyName}</p>
                  <p><span className="font-semibold text-purple-300">Location:</span> {selectedJob.location || (selectedJob.locations && selectedJob.locations[0])}</p>
                  <p><span className="font-semibold text-purple-300">Salary:</span> ₹{selectedJob.salary_package || selectedJob.salaryPackage} LPA</p>
                  <p><span className="font-semibold text-purple-300">Recruitment Process:</span> {selectedJob.recruitment_process || selectedJob.recruitmentProcess}</p>
                  <p><span className="font-semibold text-purple-300">Description:</span><br />{selectedJob.job_description || selectedJob.jobDescription}</p>
                  <div className="text-xs text-purple-400 border-t border-purple-500/20 pt-3 mt-4">
                    <span className="font-medium">Job ID:</span> <span className="text-purple-200">{selectedJob.job_id || selectedJob.id}</span><br />
                    <span className="font-medium">Deadline:</span> <span className="text-purple-200">{selectedJob.application_deadline || selectedJob.applicationDeadline}</span><br />
                    <span className="font-medium">Posted:</span> <span className="text-purple-200">{dayjs(selectedJob.posted_at || selectedJob.postedAt).format("YYYY-MM-DD HH:mm")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-gradient-to-br from-[#2a213a]/80 to-[#1b1b2f]/80 border border-red-500/40 shadow-[0_0_20px_rgba(255,0,80,0.25)] rounded-2xl p-6 max-w-md w-full text-center text-white"
            >
              <h2 className="text-lg font-bold text-red-400 mb-2">⚠️ Delete this Job?</h2>
              <p className="text-sm text-red-200 mb-6">This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-400/30 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm shadow-lg transition"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-black via-gray-900 to-[#0f0f1a] px-4 flex flex-col items-center font-poppins text-white">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-10 relative overflow-hidden">
          {/* Decorative Gradient Glow */}
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-10 flex items-center justify-center gap-3">
              <HiOutlinePlusCircle className="text-purple-300 text-4xl" />
              Post a New Job
            </h2>
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "company_name", label: "Company Name", placeholder: "e.g., Infosys" },
                { name: "job_title", label: "Job Title", placeholder: "e.g., Frontend Developer" },
                { name: "salary_package", label: "Salary (LPA)", placeholder: "e.g., 6.5" },
                { name: "location", label: "Location", placeholder: "e.g., Bangalore" },
                { name: "application_deadline", label: "Deadline", type: "date" },
              ].map((field) => (
                <div key={field.name} className="w-full max-w-sm mx-auto">
                  <label className="text-sm font-medium text-purple-200 mb-1 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={job[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-purple-600 focus:ring-2 focus:ring-purple-500 shadow-sm outline-none backdrop-blur-sm"
                  />
                </div>
              ))}
            </div>
            {/* Text Areas */}
            <div className="grid grid-cols-1 gap-6 mt-6">
              {[
                { name: "job_description", label: "Job Description", placeholder: "Describe the job role in detail..." },
                { name: "recruitment_process", label: "Recruitment Process", placeholder: "e.g., Online Test → Interview → HR Round" },
              ].map((field) => (
                <div key={field.name} className="w-full max-w-4xl mx-auto">
                  <label className="text-sm font-medium text-purple-200 mb-1 block">{field.label}</label>
                  <textarea
                    name={field.name}
                    value={job[field.name]}
                    onChange={handleChange}
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-purple-600 focus:ring-2 focus:ring-purple-500 shadow-sm outline-none backdrop-blur-sm"
                  />
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="mt-10 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePostJob}
                className="relative px-7 py-3 text-white font-semibold rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 shadow-xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-purple-400 opacity-20 blur-xl animate-pulse rounded-2xl"></span>
                <div className="flex items-center gap-2 relative z-10">
                  <HiOutlinePlusCircle className="text-xl" />
                  {editIndex !== null ? "Update Job" : "Post Job"}
                </div>
              </motion.button>
            </div>
          </div>
        </div>
        {/* Filter Input */}
        <div className="mt-12 w-full max-w-4xl relative">
          <input
            type="text"
            placeholder="Filter by company or title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-5 py-3 pr-12 text-sm border border-purple-600 rounded-xl bg-white/10 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <HiMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl" />
        </div>
        {/* Job List */}
        <div className="w-full max-w-5xl space-y-6 mt-6">
          {currentJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative p-6 rounded-2xl border border-purple-600/20 bg-gradient-to-br from-[#1b1b2f]/60 to-[#1f1f35]/70 text-white shadow-[0_4px_24px_rgba(138,43,226,0.2)] hover:shadow-[0_4px_35px_rgba(165,90,255,0.4)] transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="text-xs text-purple-400">Job ID: {job.job_id || job.id}</span>
                
              </div>
              <h4 className="text-xl font-bold text-purple-300 mb-1">{job.job_title || job.jobTitle}</h4>
              <p className="text-sm text-purple-100 mb-2">
                <span className="font-semibold">{job.company_name || job.companyName}</span> &nbsp;|&nbsp;
                <span className="font-semibold">{job.location || (Array.isArray(job.locations) ? job.locations[0] : job.locations)}</span>
              </p>
              <p className="text-xs text-purple-400 mt-2">
                Deadline: <span className="text-purple-300">{job.application_deadline || job.applicationDeadline}</span> &nbsp;|&nbsp;
                Posted At: <span className="text-purple-300">{dayjs(job.posted_at || job.postedAt).format("YYYY-MM-DD HH:mm")}</span>
              </p>
              <div className="absolute top-4 right-4 flex gap-3">
                <button
                  onClick={() => openModal(job)}
                  className="text-green-400 hover:text-green-300 transition"
                >
                  <HiOutlineEye size={20} />
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  <HiOutlinePencil size={20} />
                </button>
                <button
                  onClick={() => confirmDelete(index)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex gap-4 items-center justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border text-sm bg-white hover:bg-violet-100 disabled:opacity-50"
            >
              ⬅ Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border text-sm bg-white hover:bg-violet-100 disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RecruiterJob;
