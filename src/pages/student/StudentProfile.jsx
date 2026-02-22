import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import getuserId from "../../services/getUserId";
import requestApi from "../../services/request";

import {
  FaArrowLeft,
  FaUserEdit,
  FaSave,
  FaGithub,
  FaLinkedin,
  FaHackerrank,
  FaLaptopCode,
  FaLink,
  FaPlus,
  FaTimes,
  FaUser,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaPhoneAlt,
  FaCamera
} from "react-icons/fa";

function parseArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }
  return [];
}

const SUGGESTED_SKILLS = [
  "Java", "Python", "C++", "C", "JavaScript", "TypeScript",
  "React.js", "Node.js", "Express.js", "Next.js", "HTML", "CSS",
  "Tailwind CSS", "MongoDB", "SQL", "PostgreSQL",
  "Git", "Docker", "AWS", "Machine Learning", "Data Structures",
  "React Native", "Spring Boot", "Firebase"
];

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = getuserId();
  const pageParam = new URLSearchParams(location.search).get("page");
  const emailfromUrl = new URLSearchParams(location.search).get("email");
  const userIdFromUrl = userId || new URLSearchParams(location.search).get("userId");
  const isDataMode = pageParam === "data";

  const [isEditing, setIsEditing] = useState(isDataMode);
  const [profilePic, setProfilePic] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [profileLinks, setProfileLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });

  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    userId: "",
    Department: "",
    Year: "",
    Cgpa: "",
    Email: "",
    Phone: "",
    graduationYear: "",
  });

  useEffect(() => {
    if (pageParam === "update" && !userId) {
      toast.error("User ID missing in URL.", { id: "missing-id" });
      setTimeout(() => navigate("/student/login"), 1500);
    } else if (userId) {
      requestApi.get(`/student/${userId}/profile`)
        .then((response) => {
          const data = response.data;
          setStudent({
            FirstName: data?.firstName || "",
            LastName: data?.lastName || "",
            userId: data?.userId || userIdFromUrl || userId || "",
            Department: data?.department || "",
            Year: data?.year || "",
            Cgpa: data?.cgpa || "",
            Email: emailfromUrl || data?.email || "",
            Phone: data?.phone || "",
            graduationYear: data?.graduationYear || "",
          });
          setSkills(parseArray(data?.skills) || []);
          const parsedLinks = parseArray(data?.urls);
          setProfileLinks(
            parsedLinks.filter(
              (link) =>
                link &&
                typeof link === "object" &&
                link.platform &&
                link.url
            )
          );
          const storedPic = localStorage.getItem(`profilePic_${userId}`);
          if (storedPic) setProfilePic(storedPic);
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
          toast.error("Failed to load profile data.");
        });
    }
  }, [pageParam, userId, navigate]);

  useEffect(() => {
    if (isDataMode) {
      toast("Please complete your profile details.", { icon: 'ℹ️' });
      setStudent(s => ({ ...s, userId: userIdFromUrl || userId, Email: emailfromUrl || "" }));
    }
  }, [isDataMode]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && skills.length < 15 && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setNewSkill("");
    }
  };

  const removeSkill = skill => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddLink = () => {
    if (!newLink.platform) {
      toast.error("Please select a platform first.");
      return;
    }

    let urlStr = newLink.url.trim();
    if (!urlStr) {
      toast.error("Please enter a valid URL.");
      return;
    }

    // Auto prepend https if missing
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = "https://" + urlStr;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(urlStr);
    } catch (err) {
      toast.error("Invalid URL format.");
      return;
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    const platformDomainMap = {
      GitHub: "github.com",
      LinkedIn: "linkedin.com",
      HackerRank: "hackerrank.com",
      LeetCode: "leetcode.com",
      Portfolio: null // Portfolio can be any valid URL
    };

    const expectedDomain = platformDomainMap[newLink.platform];

    if (expectedDomain && !hostname.includes(expectedDomain)) {
      toast.error(`Please enter a valid ${newLink.platform} URL.`);
      return;
    }

    if (profileLinks.some(l => l.platform === newLink.platform)) {
      toast.error(`${newLink.platform} is already added.`);
      return;
    }

    setProfileLinks([...profileLinks, { platform: newLink.platform, url: parsedUrl.href }]);
    setNewLink({ platform: "", url: "" });
  };

  const handleSave = async () => {
    const isEmpty = Object.values(student).some(val => val === "" || val === null);
    if (isEmpty || profileLinks.length === 0) {
      toast.error("Please fill all fields and add at least one link.");
      return;
    }

    try {
      const payload = {
        userId: student.userId,
        skills: JSON.stringify(skills),
        email: student.Email,
        firstName: student.FirstName,
        lastName: student.LastName,
        department: student.Department,
        cgpa: student.Cgpa,
        phone: student.Phone,
        year: student.Year,
        graduationYear: student.graduationYear,
        urls: JSON.stringify(profileLinks),
      };

      await requestApi.post(`/student/${userId}/profile`, payload);

      if (profilePic && userId) {
        localStorage.setItem(`profilePic_${userId}`, profilePic);
      }

      toast.success("Profile saved successfully!");
      setIsEditing(false);

      if (isDataMode) {
        setTimeout(() => navigate(`/student/${userId}/home`), 1200);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile.");
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'GitHub': return <FaGithub />;
      case 'LinkedIn': return <FaLinkedin className="text-[#0A66C2]" />;
      case 'HackerRank': return <FaHackerrank className="text-[#00EA64]" />;
      case 'LeetCode': return <FaLaptopCode className="text-[#FFA116]" />;
      default: return <FaLink className="text-gray-500" />;
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
            value={student[name] || ""}
            onChange={handleInputChange}
            disabled={disabled}
            className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
            placeholder={`Enter ${label}...`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-800 font-medium text-[15px] pt-1 pb-2 border-b border-gray-100/50">
          {icon && <span className="text-gray-400">{icon}</span>}
          {student[name] || <span className="text-gray-400 font-normal italic">Not specified</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-outfit py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center">

      {/* Absolute Header Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-50">
        <button
          onClick={() => navigate(`/student/${userId}/home`)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/60 hover:bg-white/90 border border-purple-100/50 hover:border-purple-300 rounded-full text-gray-600 hover:text-purple-700 font-semibold shadow-sm transition-all duration-300 backdrop-blur-md group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
      </div>

      {/* Main Container: Split Layout (Model 3 Version) */}
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

            {/* Profile Image (With Logic from Model 4) */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white relative z-10 mt-10 group cursor-pointer transition-transform hover:scale-105">
              <img src={profilePic || "/images/profile.png"} alt="Profile" className="w-full h-full rounded-full object-cover" />

              {isEditing && (
                <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FaCamera size={24} className="mb-1" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
              )}
              {isEditing && !profilePic && (
                <div className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white border-2 border-white shadow-md">
                  <FaCamera size={14} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="text-center mt-5 mb-6 w-full relative z-10">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {student.FirstName || student.LastName ? `${student.FirstName} ${student.LastName}` : "Student Name"}
              </h1>
              <p className="text-purple-600 font-semibold text-sm bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-100 mb-2">
                {student.userId || "Roll Number"}
              </p>
              <p className="text-gray-500 text-sm">{student.Department || "Department"}</p>
            </div>

            {/* Professional Links (In Sidebar) */}
            <div className="w-full border-t border-gray-100 pt-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Profiles & Links</h3>
              <div className="flex flex-col gap-3">
                {profileLinks.length > 0 ? (
                  profileLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors bg-gray-50/50 hover:bg-purple-50/50 px-4 py-2.5 rounded-xl border border-gray-100 flex-1 justify-center"
                      >
                        <span className="text-lg">{getPlatformIcon(link.platform)}</span>
                        <span className="text-sm font-medium">{link.platform}</span>
                      </a>
                      {isEditing && (
                        <button onClick={() => setProfileLinks(profileLinks.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-500 ml-2 p-2">
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs italic text-center">No links configured.</p>
                )}
              </div>

              {isEditing && profileLinks.length < 5 && (
                <div className="mt-4 flex flex-col gap-2">
                  <select
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select Platform</option>
                    <option value="GitHub">GitHub</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="Portfolio">Portfolio</option>
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="github.com/username"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="flex-1 w-full px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-purple-600 text-white px-3 py-2 rounded-xl hover:bg-purple-700 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold shadow-md transition-all duration-300 ${isEditing
                ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200/50"
                : "bg-gray-900 hover:bg-gray-800 text-white shadow-gray-200/50"
                }`}
            >
              {isEditing ? <><FaSave /> Save Profile</> : <><FaUserEdit /> Edit Profile Details</>}
            </button>
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
              <InputField label="First Name" name="FirstName" />
              <InputField label="Last Name" name="LastName" />
              <InputField label="Email Address" name="Email" type="email" icon={<FaEnvelope />} />
              <InputField label="Phone Number" name="Phone" type="tel" icon={<FaPhoneAlt />} />
            </div>
          </div>

          {/* Section 2: Academic Snapshot */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-600 shadow-sm border border-white">
                <FaGraduationCap size={22} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Academic Snapshot</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="Department" name="Department" />
              <InputField label="Batch (Grad Year)" name="graduationYear" />
              <InputField label="Current Year" name="Year" />
              <InputField label="Current CGPA" name="Cgpa" />
            </div>
          </div>

          {/* Section 3: Technical Skills (With Model 4 Autocomplete Logic) */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-600 shadow-sm border border-white">
                <FaCode size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
            </div>

            {isEditing && (
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Search or type a skill (e.g. React)..."
                    list="skills-suggestions"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  />
                  <datalist id="skills-suggestions">
                    {SUGGESTED_SKILLS.map((skill, index) => (
                      <option key={index} value={skill} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md font-medium hover:bg-indigo-700 transition"
                  >
                    <FaPlus /> Add Skill
                  </button>
                </div>

                {/* Popular Skill Suggestions */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Popular right now:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).slice(0, 10).map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (skills.length < 15) {
                            setSkills([...skills, suggestion]);
                          } else {
                            toast.error("Maximum 15 skills allowed.");
                          }
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg text-xs font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="px-4 py-2 bg-indigo-50 border border-indigo-100 shadow-sm rounded-xl text-sm font-semibold text-indigo-700 flex items-center gap-2 transition hover:bg-indigo-100">
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(skill)} className="text-indigo-400 hover:text-indigo-900 transition-colors bg-white rounded-full p-0.5 ml-1 border border-indigo-100">
                        <FaTimes size={10} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-6 border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-400 text-sm">No skills added yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default StudentProfile;
