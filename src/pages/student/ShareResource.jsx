import React, { useState } from "react";
import { FaTimes, FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const branches = [
  "CSE", "CSE-AI", "CSE-DS", "CSE-AIML", "CSE-CS", "CSE-IT",
  "ECE", "EEE", "CIVIL", "MECH",
];

const ShareResource = ({ onShare, onClose }) => {
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    regulation: "",
    branch: "",
    subject: "",
    description: "",
    pdfFile: null,
    videoLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdfFile") {
      setFormData({ ...formData, pdfFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, pdfFile: e.dataTransfer.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.pdfFile) {
      toast.error("Please enter subject and upload a PDF.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onShare(formData);
      toast.success("Resource uploaded successfully!");
      setIsLoading(false);
      setFormData({
        year: "",
        semester: "",
        regulation: "",
        branch: "",
        subject: "",
        description: "",
        pdfFile: null,
        videoLink: "",
      });
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] overflow-y-auto scrollbar-hide relative p-6">
        {/* 🔝 Sticky Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-purple-700">📘 Share Academic Resource</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdowns */}
            <select name="year" onChange={handleChange} value={formData.year} required className="border p-2 rounded-lg">
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>{y} Year</option>
              ))}
            </select>

            <select name="semester" onChange={handleChange} value={formData.semester} required className="border p-2 rounded-lg">
              <option value="">Select Semester</option>
              {["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"].map((sem) => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select name="regulation" onChange={handleChange} value={formData.regulation} required className="border p-2 rounded-lg">
              <option value="">Select Regulation</option>
              <option value="R20">R20</option>
              <option value="R23">R23</option>
            </select>

            <select name="branch" onChange={handleChange} value={formData.branch} required className="border p-2 rounded-lg">
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            {/* Inputs */}
            <input
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Subject"
              required
              className="col-span-1 md:col-span-2 border p-2 rounded-lg w-full"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short Description (optional)"
              rows={3}
              className="col-span-1 md:col-span-2 border p-2 rounded-lg resize-none"
            />

            {/* 📄 Upload */}
            <div
              className={`col-span-1 md:col-span-2 border-2 ${
                dragActive ? "border-dashed border-purple-500 bg-purple-50" : "border-gray-300"
              } p-4 text-center rounded-lg`}
            >
              <label htmlFor="pdfFile" className="cursor-pointer text-sm text-gray-600">
                {formData.pdfFile ? (
                  <span className="text-green-700 font-medium">
                    📄 {formData.pdfFile.name}
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FaFileUpload className="text-purple-600 text-2xl" />
                    <p>
                      Drag & Drop PDF here or{" "}
                      <span className="underline text-blue-600">click to upload</span>
                    </p>
                  </div>
                )}
              </label>
              <input
                id="pdfFile"
                name="pdfFile"
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {/* 🔗 Video Link */}
            <input
              name="videoLink"
              type="text"
              value={formData.videoLink}
              onChange={handleChange}
              placeholder="YouTube / Drive Link (optional)"
              className="col-span-1 md:col-span-2 border p-2 rounded-lg"
            />
          </div>

          {/* ✅ Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Upload Resource"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareResource;
