// src/pages/recruiter/RecruiterProfile.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";
import { FaArrowLeft, FaUserEdit, FaSave, FaCamera, FaUser, FaPhoneAlt, FaBuilding, FaIdBadge, FaEnvelope } from "react-icons/fa";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const pageMode = query.get("page"); // either "data" or "update"
  const userId = getuserId(); // Get userId from localStorage or context

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [imageFile, setImageFile] = useState(null);
  const emailfromUrl = query.get("email");
  const userIdFromUrl = query.get("userId");

  const [recruiter, setRecruiter] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    phone: "",
    email: emailfromUrl || "",
  });

  useEffect(() => {
    if (pageMode === "data") {
      setIsEditing(true);
      setRecruiter(prev => ({
        ...prev,
        userId: userIdFromUrl || userId,
      }));

      toast("Please complete your profile details.", {
        id: "fill-details",
        icon: "ℹ️",
      });
    } else if (pageMode === "update") {
      setIsEditing(false);
      const data = requestApi.get(`/recruiter/profile`);
      data
        .then((response) => {
          const recruiterData = response.data;
          setRecruiter({
            firstName: recruiterData.firstName || "",
            lastName: recruiterData.lastName || "",
            userId: recruiterData.userId || userIdFromUrl || userId,
            designation: recruiterData.designation || "",
            email: emailfromUrl || recruiterData.email || "",
            phone: recruiterData.phone || "",
            company: recruiterData.company || "",
          });
          if (recruiterData.img_loc) {
            setProfileImage(`${recruiterData.img_loc}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching recruiter data:", error);
          toast.error(
            "Failed to fetch recruiter data. Please try again later.",
            { id: "fetch-error" },
          );
        });
    }
  }, [pageMode, userId, navigate, emailfromUrl, userIdFromUrl]);

  if (!pageMode) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        ❌ Invalid access: query param 'page' is missing.
      </div>
    );
  }

  const handleChange = (e) => {
    setRecruiter({ ...recruiter, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = async () => {
    // Only check required fields, we won't strictly enforce but check basics
    const requiredFields = ['firstName', 'lastName', 'company', 'designation', 'phone'];
    const allFilled = requiredFields.every((key) => recruiter[key] && recruiter[key].trim() !== "");

    if (!allFilled) {
      toast.error("Please fill all required details", { id: "fill-all-details" });
      return;
    }

    try {
      const payload = {
        firstName: recruiter.firstName,
        lastName: recruiter.lastName,
        company: recruiter.company,
        designation: recruiter.designation,
        phone: recruiter.phone,
        userId: recruiter.userId || userIdFromUrl,
        email: emailfromUrl || recruiter.email,
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" }),
      );
      if (imageFile) {
        formData.append("imageFile", imageFile);
      } else {
        // Appending empty blob if expected backend logic
        formData.append("imageFile", new Blob([], { type: "application/octet-stream" }), "empty.png");
      }

      await requestApi.post(
        `/recruiter/profile`,
        formData
      );

      toast.success(
        pageMode === "data"
          ? "Profile saved successfully!"
          : "Profile updated successfully!",
        { id: "profile-save-success" },
      );

      setIsEditing(false);

      if (pageMode === "data") {
        setTimeout(() => {
          navigate(`/recruiter/${userId}/home`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save profile", {
        id: "save-error",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const InputField = ({ label, name, type = "text", disabled = false, icon = null }) => (
    <div className="flex flex-col">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      {isEditing ? (
        <div className="relative">
          {icon && <div className="absolute left-3.5 top-3 text-gray-400">{icon}</div>}
          <input
            type={type}
            name={name}
            value={recruiter[name] || ""}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
            placeholder={`Enter ${label}...`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-800 font-medium text-[15px] pt-1 pb-2 border-b border-gray-100/50">
          {icon && <span className="text-gray-400">{icon}</span>}
          {recruiter[name] || <span className="text-gray-400 font-normal italic">Not specified</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-outfit py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center">

      {/* Absolute Header Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-50">
        <button
          onClick={() => navigate(`/recruiter/${userId}/home`)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/60 hover:bg-white/90 border border-purple-100/50 hover:border-purple-300 rounded-full text-gray-600 hover:text-purple-700 font-semibold shadow-sm transition-all duration-300 backdrop-blur-md group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
      </div>

      {/* Main Container: Split Layout */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mt-16 flex flex-col lg:flex-row gap-6 sm:gap-8"
      >

        {/* Left Sidebar (Sticky) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl p-8 flex flex-col items-center relative overflow-hidden lg:sticky lg:top-24">

            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-500 to-indigo-500"></div>

            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white relative z-10 mt-10 group cursor-pointer transition-transform hover:scale-105">
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />

              {isEditing && (
                <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FaCamera size={24} className="mb-1" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
              {isEditing && profileImage === "/images/profile.png" && (
                <div className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white border-2 border-white shadow-md">
                  <FaCamera size={14} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="text-center mt-5 mb-6 w-full relative z-10">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {recruiter.firstName || recruiter.lastName ? `${recruiter.firstName} ${recruiter.lastName}` : "Recruiter Name"}
              </h1>
              <p className="text-purple-600 font-semibold text-sm bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-100 mb-2">
                User ID: {recruiter.userId || "N/A"}
              </p>
              <p className="text-gray-500 text-sm">{recruiter.designation || "Recruiter"}</p>
              <p className="text-gray-500 text-sm font-medium mt-1">{recruiter.company || "Company"}</p>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={() => isEditing ? handleSave() : handleEditToggle()}
              className={`w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold shadow-md transition-all duration-300 ${isEditing
                ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200/50"
                : "bg-gray-900 hover:bg-gray-800 text-white shadow-gray-200/50"
                }`}
            >
              {isEditing ? <><FaSave /> Save Profile</> : <><FaUserEdit /> Edit Profile Details</>}
            </button>

            {isEditing && pageMode === "update" && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full mt-3 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Right Content Area (Scrollable Info) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 sm:gap-8">

          {/* Section 1: Personal Details */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 shadow-sm border border-white">
                <FaUser size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="User ID" name="userId" disabled={true} icon={<FaIdBadge />} />
              <div className="hidden md:block"></div>
              <InputField label="First Name" name="firstName" />
              <InputField label="Last Name" name="lastName" />
              <InputField label="Email Address" name="email" type="email" icon={<FaEnvelope />} disabled={pageMode === "update"} />
              <InputField label="Phone Number" name="phone" type="tel" icon={<FaPhoneAlt />} />
            </div>
          </div>

          {/* Section 2: Professional Details */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-600 shadow-sm border border-white">
                <FaBuilding size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Professional Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="Company Name" name="company" icon={<FaBuilding />} />
              <InputField label="Designation" name="designation" icon={<FaIdBadge />} />
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
export default RecruiterProfile;
