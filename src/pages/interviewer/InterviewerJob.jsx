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
import NavbarInterviewerDashboard from "../../components/NavbarInterviewerDashboard";

const InterviewerJob = () => {
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
      <NavbarInterviewerDashboard />

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-2xl max-w-lg w-full relative shadow-2xl"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                <HiXMark size={24} />
              </button>
              <h3 className="text-xl font-bold mb-2 text-violet-700">
                {selectedJob.job_title}
              </h3>
              <p className="text-sm mb-2"><strong>Company:</strong> {selectedJob.company_name}</p>
              <p className="text-sm mb-2"><strong>Location:</strong> {selectedJob.location}</p>
              <p className="text-sm mb-2"><strong>Salary:</strong> ₹{selectedJob.salary_package} LPA</p>
              <p className="text-sm mb-2"><strong>Eligibility:</strong> {selectedJob.eligibility_criteria}</p>
              <p className="text-sm mb-2"><strong>Description:</strong> {selectedJob.job_description}</p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Deadline:</strong> {selectedJob.application_deadline} <br />
                <strong>Posted At:</strong> {selectedJob.posted_at}
              </p>
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl text-center"
            >
              <h2 className="text-lg font-bold text-red-600 mb-2">Delete this Job?</h2>
              <p className="text-gray-600 mb-6 text-sm">This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* Page Content */}
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-[#F3EBFF] to-[#E5F0FF] px-4 flex flex-col items-center font-poppins">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8">
          <h2 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-10">
            🧑‍💻 Post Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "company_name", placeholder: "e.g., Infosys" },
              { name: "job_title", placeholder: "e.g., Frontend Developer" },
              { name: "salary_package", placeholder: "e.g., 6.5" },
              { name: "location", placeholder: "e.g., Bangalore" },
              { name: "application_deadline", type: "date" },
              { name: "posted_at", type: "datetime-local" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-[#2C225A] mb-1 font-medium capitalize">
                  {field.name.replace(/_/g, " ")}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={job[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-xl text-[#2C225A] bg-white border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {[
              { name: "job_description", placeholder: "Describe job role..." },
              { name: "eligibility_criteria", placeholder: "e.g., B.Tech CSE 60%+" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-[#2C225A] mb-1 font-medium capitalize">
                  {field.name.replace(/_/g, " ")}
                </label>
                <textarea
                  name={field.name}
                  value={job[field.name]}
                  onChange={handleChange}
                  rows={3}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-xl text-[#2C225A] bg-white border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePostJob}
              className="relative px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-xl"
            >
              <span className="absolute inset-0 rounded-2xl bg-violet-500 blur-lg opacity-30 animate-pulse"></span>
              <div className="flex items-center gap-2 relative z-10">
                <HiOutlinePlusCircle className="text-2xl" />
                {editIndex !== null ? "Update Job" : "Post Job"}
              </div>
            </motion.button>
          </div>
        </div>

        {/* 🔍 Filter with icon */}
        <div className="mt-12 w-full max-w-4xl relative">
          <input
            type="text"
            placeholder="Filter by company or title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-5 py-3 pr-12 text-sm border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <HiMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-500 text-xl" />
        </div>

          {/* 📋 Job List */}
        <div className="w-full max-w-5xl space-y-6 mt-6">
          {currentJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 backdrop-blur-xl border border-violet-200/30 rounded-xl p-6 shadow-md hover:shadow-xl relative"
            >
              <h4 className="text-xl font-semibold text-violet-600 mb-1">{job.job_title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Company:</strong> {job.company_name} | <strong>Location:</strong> {job.location}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Deadline: {job.application_deadline} | Posted: {job.posted_at}
              </p>
              <div className="absolute top-4 right-4 flex gap-3">
                <button onClick={() => openModal(job)} className="text-green-600 hover:text-green-800">
                  <HiOutlineEye size={20} />
                </button>
                <button onClick={() => handleEdit(index)} className="text-indigo-600 hover:text-indigo-800">
                  <HiOutlinePencil size={20} />
                </button>
                <button onClick={() => confirmDelete(index)} className="text-red-500 hover:text-red-700">
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

export default InterviewerJob;

