// src/pages/recruiter/RecruiterProfile.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import { toast } from "react-toastify";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";

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
   const emailfromUrl = new URLSearchParams(location.search).get("email");
  const userIdFromUrl = userId || new URLSearchParams(location.search).get("userId");

  const [recruiter, setRecruiter] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    phone: "",
  });

  useEffect(() => {
    if (pageMode === "data") {
      setIsEditing(true);
      setRecruiter({
        userId: "",
        firstName: "",
        lastName: "",
        company: "",
        designation: "",
        phone: "",
      });

      toast.info("You have to fill details", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-careernexus-toast",
        bodyClassName: "custom-careernexus-body",
      });
    } else if (pageMode === "update") {
      setIsEditing(false);
      setRecruiter({
        userId: params.userId || "",
        firstName: "Ravi",
        lastName: "Verma",
        company: "TCS", 
        designation: "Senior Recruiter",
        phone: "9876543210",
      });
    }
  }, [pageMode, params.userId]);

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
    const allFilled = Object.values(recruiter).every((v) => v.trim() !== "");

    if (!allFilled) {
      toast.error("You have to fill all details", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-careernexus-toast",
        bodyClassName: "custom-careernexus-body",
      });
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
        email: emailfromUrl || "",
      
      }
      console.log(payload)
       const data = await requestApi.post(`/recruiter/${userId}/profile`, payload);
            

      toast.success(
        pageMode === "data"
          ? "Profile saved successfully!"
          : "Profile updated successfully!",
        {
          position: "top-right",
          autoClose: 3000,
          className: "custom-careernexus-toast",
          bodyClassName: "custom-careernexus-body",
        }
      );

      setIsEditing(false);

      if (pageMode === "data") {
        setTimeout(() => {
          navigate("/recruiter/home");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save profile", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-careernexus-toast",
        bodyClassName: "custom-careernexus-body",
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

  return (
    <>
      <NavbarRecruiterDashboard />

      <button
        onClick={() => navigate("/recruiter/home")}
        className="fixed top-20 left-4 z-50 bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
      >
        ← Back
      </button>

      <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] pt-24 pb-16 flex justify-center font-poppins px-4">
        <motion.div
          className="w-full max-w-3xl bg-white/30 backdrop-blur-md border border-violet-200/30 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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

          <h2 className="text-2xl font-bold text-center text-[#2C225A] mb-6 drop-shadow-sm">
            Recruiter Profile
          </h2>

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
                  value={recruiter[field.name]}
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

          <div className="flex justify-end mt-8 gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-md hover:scale-105 transition"
                >
                  Save
                </button>
                {pageMode === "update" && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                )}
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

export default RecruiterProfile;
