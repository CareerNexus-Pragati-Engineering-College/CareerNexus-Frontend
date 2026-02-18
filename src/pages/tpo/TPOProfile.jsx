import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarTPODashboard from "../../components/NavbarTPODashboard";
import { toast } from "react-toastify";
import requestApi from "../../services/request";
import getuserId from "../../services/getUserId";

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
      toast.info("You have to fill details", {
        position: "top-right",
        autoClose: 3000,
        className: "custom-careernexus-toast",
        bodyClassName: "custom-careernexus-body",
      });
    } else if (pageMode === "update") {
      setIsEditing(false);
      requestApi
        .get(`/tpo/${userId}/profile`)
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
            position: "top-right",
            theme: "colored",
            style: { backgroundColor: "#dc2626", color: "#fff" },
          });
        });
    }
  }, [pageMode, userId]);

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

      await requestApi.post(`/tpo/${userId}/profile`, payload);

      toast.success(
        pageMode === "data" ? "Profile saved!" : "Profile updated!",
        {
          position: "top-right",
          autoClose: 3000,
        }
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

  return (
    <>
      <NavbarTPODashboard />

      {/* Back Button */}
      <button
        onClick={() => navigate(`/tpo/${userId}/home`)}
        className="fixed top-20 left-4 z-50 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-200"
      >
        ← Back
      </button>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-[#F0E6FA] to-[#E3EAFD] pt-24 pb-16 flex justify-center px-4 font-poppins">
        <motion.div
          className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-violet-300 rounded-2xl p-6 shadow-xl"
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
            TPO Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[ 
              { label: "User ID", name: "userId" },
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email" },
              
              { label: "Phone Number", name: "phone" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-[#2C225A] mb-1">
                  {field.label}
                </label>
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  value={tpo[field.name]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 rounded-md border text-[#2C225A] focus:outline-none focus:ring-2 transition ${
                    isEditing
                      ? "border-violet-400 bg-white/90 focus:ring-violet-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-end mt-8 gap-4">
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
                onClick={() => setIsEditing(true)}
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

export default TPOProfile;
