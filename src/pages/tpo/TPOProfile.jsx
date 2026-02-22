import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarTPODashboard from "../../components/NavbarTPODashboard";
import toast from "react-hot-toast";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";
import { FaArrowLeft, FaUserEdit, FaSave, FaCamera, FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const TPOProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageMode = query.get("page");

  const userId = getuserId();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [imageFile, setImageFile] = useState(null);

  const emailfromUrl = query.get("email") || "";

  const [tpo, setTpo] = useState({
    userId: userId || "",
    firstName: "",
    lastName: "",
    phone: "",
    email: emailfromUrl || "",
  });

  useEffect(() => {
    if (pageMode === "data") {
      setIsEditing(true);
      toast("Please complete your profile details.", {
        id: "fill-details",
        icon: 'ℹ️',
      });
    } else if (pageMode === "update") {
      setIsEditing(false);
      requestApi
        .get(`/tpo/profile`)
        .then((res) => {
          const r = res.data;
          setTpo({
            userId: r.userId || userId,
            firstName: r.firstName || "",
            lastName: r.lastName || "",
            phone: r.phone || "",
            email: r.email || emailfromUrl || "",
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch TPO data.", {
            id: "fetch-tpo-error",
          });
        });
    }
  }, [pageMode, userId, emailfromUrl]);

  const handleChange = (e) =>
    setTpo({ ...tpo, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const allFilled = Object.values(tpo).every((v) => v.trim() !== "");
    if (!allFilled) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const payload = {
        firstName: tpo.firstName,
        lastName: tpo.lastName,
        phone: tpo.phone,
        userId: tpo.userId,
        email: tpo.email,
      };

      await requestApi.post(`/tpo/profile`, payload);

      toast.success(
        pageMode === "data" ? "Profile saved!" : "Profile updated!",
        { id: "profile-save-success" }
      );

      setIsEditing(false);

      if (pageMode === "data") {
        setTimeout(() => navigate(`/tpo/${userId}/home`), 2000);
      }
    } catch (error) {
      toast.error("Failed to save profile");
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
            value={tpo[name] || ""}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
            placeholder={`Enter ${label}...`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-800 font-medium text-[15px] pt-1 pb-2 border-b border-gray-100/50">
          {icon && <span className="text-gray-400">{icon}</span>}
          {tpo[name] || <span className="text-gray-400 font-normal italic">Not specified</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-outfit py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center">

      {/* Absolute Header Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-50">
        <button
          onClick={() => navigate(`/tpo/${userId}/home`)}
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
                {tpo.firstName || tpo.lastName ? `${tpo.firstName} ${tpo.lastName}` : "TPO Name"}
              </h1>
              <p className="text-purple-600 font-semibold text-sm bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-100 mb-2">
                User ID: {tpo.userId || "N/A"}
              </p>
              <p className="text-gray-500 text-sm">Placement Officer</p>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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
              <InputField label="User ID" name="userId" disabled={true} />
              <div className="hidden md:block"></div> {/* Spacer for alignment */}
              <InputField label="First Name" name="firstName" />
              <InputField label="Last Name" name="lastName" />
              <InputField label="Email Address" name="email" type="email" icon={<FaEnvelope />} />
              <InputField label="Phone Number" name="phone" type="tel" icon={<FaPhoneAlt />} />
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default TPOProfile;
