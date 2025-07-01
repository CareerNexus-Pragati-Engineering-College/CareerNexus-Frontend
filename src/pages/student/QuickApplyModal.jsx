// src/components/QuickApplyModal.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const QuickApplyModal = ({ job, onClose, onApply }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    education: "",
    graduationYear: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.linkedin.trim()) newErrors.linkedin = "Required";
    if (!formData.education.trim()) newErrors.education = "Required";
    if (!formData.graduationYear.trim()) newErrors.graduationYear = "Required";
    if (!formData.resume) newErrors.resume = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const appliedJob = {
      ...job,
      applied: true,
      appliedDate: new Date().toISOString(),
      status: "Under Review",
    };
    onApply(appliedJob);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-xl font-semibold mb-1 text-gray-800">
          Apply for {job.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{job.company}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              LinkedIn Profile <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.linkedin && <p className="text-red-500 text-xs">{errors.linkedin}</p>}
          </div>

          {/* Education */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Highest Education Qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.education && <p className="text-red-500 text-xs">{errors.education}</p>}
          </div>

          {/* Graduation Year */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Year of Graduation <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.graduationYear && <p className="text-red-500 text-xs">{errors.graduationYear}</p>}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload Resume (PDF) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {errors.resume && <p className="text-red-500 text-xs">{errors.resume}</p>}
          </div>

          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white w-full py-2 rounded font-semibold text-sm"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickApplyModal;
