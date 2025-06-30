import React, { useState } from "react";
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
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";

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
  const [jobToDeleteIndex, setJobToDeleteIndex] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const jobsPerPage = 5;

  const [job, setJob] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    eligibility_criteria: "",
    salary_package: "",
    location: "",
    application_deadline: "",
    posted_at: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handlePostJob = () => {
    if (
      !job.company_name ||
      !job.job_title ||
      !job.job_description ||
      !job.eligibility_criteria ||
      !job.salary_package ||
      !job.location ||
      !job.application_deadline ||
      !job.posted_at
    ) {
      showToast("Please fill all fields", "danger");
      return;
    }

    if (editIndex !== null) {
      const updated = [...jobPosts];
      updated[editIndex] = job;
      setJobPosts(updated);
      showToast("✅ Job updated successfully!");
      setEditIndex(null);
    } else {
      setJobPosts([job, ...jobPosts]);
      showToast("✅ Job posted successfully!");
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 1800);
    }

    setJob({
      company_name: "",
      job_title: "",
      job_description: "",
      eligibility_criteria: "",
      salary_package: "",
      location: "",
      application_deadline: "",
      posted_at: "",
    });
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index + (currentPage - 1) * jobsPerPage);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updated = jobPosts.filter((_, i) => i !== deleteIndex);
    setJobPosts(updated);
    setShowDeleteModal(false);
    showToast("❌ Job deleted", "danger");

    const totalPages = Math.ceil((filteredJobs.length - 1) / jobsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
  };

  const handleEdit = (index) => {
    setJob(filteredJobs[index + (currentPage - 1) * jobsPerPage]);
    setEditIndex(index + (currentPage - 1) * jobsPerPage);
  };

  const filteredJobs = jobPosts.filter(
    (job) =>
      job.company_name.toLowerCase().includes(filterText.toLowerCase()) ||
      job.job_title.toLowerCase().includes(filterText.toLowerCase())
  );

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <>
      <NavbarRecruiterDashboard />

      {/* ✅ Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-3 ${
              toast.type === "danger"
                ? "bg-red-100 border border-red-300 text-red-700"
                : "bg-green-100 border border-green-300 text-green-700"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ New Simple Success Animation */}
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

    {/* 📄 Job Details Modal */}
<AnimatePresence>
  {showModal && selectedJob && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
    >
      {/* Outer Glowing Border (No Blink) */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-violet-700 shadow-[0_0_30px_rgba(138,43,226,0.5)]"
      >
        {/* Modal Card */}
        <div className="bg-gradient-to-br from-[#1c1c2e]/90 to-[#22223b]/90 rounded-2xl w-full max-w-lg text-white">
          
          {/* Header (Static) */}
          <div className="relative p-6 border-b border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-300">
              {selectedJob.job_title}
            </h3>
            <button
              className="absolute top-6 right-6 text-purple-400 hover:text-red-400 transition"
              onClick={() => setShowModal(false)}
            >
              <HiXMark size={24} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 pt-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent space-y-3 text-sm text-purple-100 leading-relaxed">
            <p><span className="font-semibold text-purple-300">🏢 Company:</span> {selectedJob.company_name}</p>
            <p><span className="font-semibold text-purple-300">📍 Location:</span> {selectedJob.location}</p>
            <p><span className="font-semibold text-purple-300">💰 Salary:</span> ₹{selectedJob.salary_package} LPA</p>
            <p><span className="font-semibold text-purple-300">📑 Eligibility:</span> {selectedJob.eligibility_criteria}</p>
            <p><span className="font-semibold text-purple-300">📝 Description:</span><br />{selectedJob.job_description}</p>

            <div className="text-xs text-purple-400 border-t border-purple-500/20 pt-3 mt-4">
              ⏳ <span className="font-medium">Deadline:</span> <span className="text-purple-200">{selectedJob.application_deadline}</span><br />
              🕒 <span className="font-medium">Posted At:</span> <span className="text-purple-200">{selectedJob.posted_at}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


     {/* ❗ Delete Confirmation Modal */}
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
        {/* Heading */}
        <h2 className="text-lg font-bold text-red-400 mb-2">⚠️ Delete this Job?</h2>
        
        {/* Message */}
        <p className="text-sm text-red-200 mb-6">This action cannot be undone.</p>

        {/* Action Buttons */}
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
    { name: "company_name", label: "Company Name", icon: "🏢", placeholder: "e.g., Infosys" },
    { name: "job_title", label: "Job Title", icon: "💼", placeholder: "e.g., Frontend Developer" },
    { name: "salary_package", label: "Salary (LPA)", icon: "💰", placeholder: "e.g., 6.5" },
    { name: "location", label: "Location", icon: "📍", placeholder: "e.g., Bangalore" },
    { name: "application_deadline", label: "Deadline", icon: "📅", type: "date" },
    { name: "posted_at", label: "Posted At", icon: "⏰", type: "datetime-local" },
  ].map((field) => (
    <div key={field.name} className="w-full max-w-sm mx-auto">
      <label className="text-sm font-medium text-purple-200 mb-1 block">
        {field.icon} {field.label}
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
    { name: "eligibility_criteria", label: "Eligibility Criteria", placeholder: "e.g., B.Tech CSE 60%+" },
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

  {/* 🔍 Filter Input */}
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

  {/* 📋 Job List */}
<div className="w-full max-w-5xl space-y-6 mt-6">
  {currentJobs.map((job, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-6 rounded-2xl border border-purple-600/20 bg-gradient-to-br from-[#1b1b2f]/60 to-[#1f1f35]/70 text-white shadow-[0_4px_24px_rgba(138,43,226,0.2)] hover:shadow-[0_4px_35px_rgba(165,90,255,0.4)] transition-all duration-300"
    >
      <h4 className="text-xl font-bold text-purple-300 mb-1">{job.job_title}</h4>
      <p className="text-sm text-purple-100 mb-2">
        <span className="font-semibold">🏢 {job.company_name}</span> &nbsp;|&nbsp;
        <span className="font-semibold">📍 {job.location}</span>
      </p>
      <p className="text-xs text-purple-400 mt-2">
        ⏳ Deadline: <span className="text-purple-300">{job.application_deadline}</span> &nbsp;|&nbsp;
        🕒 Posted: <span className="text-purple-300">{job.posted_at}</span>
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



        {/* ⬅️➡️ Pagination */}
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

