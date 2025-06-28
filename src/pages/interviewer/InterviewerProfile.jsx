import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavbarInterviewerDashboard from "../../components/NavbarInterviewerDashboard";

const InterviewerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [imageFile, setImageFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // 🎉

  const [interviewer, setInterviewer] = useState({
    userId: "INT2025",
    firstName: "Ravi",
    lastName: "Verma",
    company: "TCS",
    designation: "Senior Interviewer",
    phone: "9876543210",
  });

  const handleChange = (e) => {
    setInterviewer({ ...interviewer, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true); // ✅ Show toast
    setTimeout(() => setShowSuccess(false), 3000); // Auto-hide after 3s
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <NavbarInterviewerDashboard />

     {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/interviewer/home")}
        className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
      >
        ← Back
      </button>
      
     {/* ✅ Stylish Success Toast */}
<AnimatePresence>
  {showSuccess && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md border border-green-300/40 bg-gradient-to-r from-green-400/20 to-green-200/10 text-green-800 flex items-center gap-3"
    >
      <div className="bg-green-500 text-white rounded-full p-1.5 shadow-inner">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="font-medium text-sm sm:text-base tracking-wide">
        Profile updated successfully!
      </span>
    </motion.div>
  )}
</AnimatePresence>


      <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] pt-24 pb-16 flex justify-center font-poppins px-4">
        <motion.div
          className="w-full max-w-3xl bg-white/30 backdrop-blur-md border border-violet-200/30 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 👤 Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isEditing && (
              <div className="mt-2">
                <label className="cursor-pointer text-sm text-violet-700 hover:underline">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* 🧾 Title */}
          <h2 className="text-2xl font-bold text-center text-[#2C225A] mb-6 drop-shadow-sm">
            Interviewer Profile
          </h2>

          {/* ✏️ Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { label: "User ID", name: "userId" },
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Company Name", name: "company" },
              { label: "Designation", name: "designation" },
              { label: "Phone Number", name: "phone" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-[#2C225A] mb-1 font-medium">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={interviewer[field.name]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 rounded-md border text-[#2C225A] focus:outline-none focus:ring-2 transition ${
                    isEditing
                      ? "border-violet-400 bg-white/80 focus:ring-violet-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* ✅ Action Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-md hover:scale-105 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-5 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-md shadow hover:scale-105 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default InterviewerProfile;
