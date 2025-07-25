import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import getuserId from "../../services/getUserId";
import requestApi from "../../services/request";



import {
  FaCheckCircle,
  FaTrophy,
  FaBolt,
  FaThumbsUp,
  FaMedal,
} from "react-icons/fa";

//parse data from jsonstringfy daata from backend
function parseArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
   
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse array:", err);
    return [];
  }
}


const useInView = (offset = 150) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const checkPosition = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      if (top < window.innerHeight - offset) setInView(true);
    };
    window.addEventListener("scroll", checkPosition);
    checkPosition();
    return () => window.removeEventListener("scroll", checkPosition);
  }, [offset]);
  return [ref, inView];
};

const RibbonBadge = ({ rank }) => {
  const colorClasses = {
    Bronze: "text-amber-700",
    Silver: "text-slate-400",
    Gold: "text-yellow-500",
  };
  const medalColorClass = colorClasses[rank] || "text-neutral-500";
  return (
    <motion.div
      className="relative group flex flex-col items-center"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <FaMedal className={`absolute w-16 h-16 ${medalColorClass} drop-shadow-md`} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2s_infinite]" />
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-80 shadow-lg"
              style={{ top: `${Math.random() * 70}%`, left: `${Math.random() * 70}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </div>
      <span className="absolute opacity-0 group-hover:opacity-100 -translate-x-1/2 left-1/2 -bottom-8 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
        {rank + "Achievement"} 
      </span>
    </motion.div>
  );
};

const StatSection = ({ title, solved, total, rank, buttonLabel }) => {
  const percent = Math.min(100, Math.round((solved / total) * 100));
  const sparkThreshold = 10;
  return (
    <motion.div
      className="relative bg-white/70 backdrop-blur-md border border-[#6B4ECF]/40 rounded-2xl p-4 sm:p-6 text-[#2C225A] shadow-md hover:shadow-xl transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#6B4ECF]">{title}</h3>
        <RibbonBadge rank={rank} />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="relative flex-1 bg-[#E4EBFE]/60 border border-[#6B4ECF]/40 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-4 bg-[#A855F7] rounded-full"
            style={{ width: `${percent}%` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {percent >= sparkThreshold && (
              <motion.div
                className="absolute right-0 top-0 h-4 w-1 bg-yellow-400 shadow-[0_0_12px_#facc15]"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: [0.8, 1.4, 1.2] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              />
            )}
          </motion.div>
        </div>
        <span className="text-xs sm:text-sm font-bold text-[#6B4ECF] bg-white border border-[#6B4ECF]/50 px-2 py-1 rounded-full">
          {percent}%
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center text-sm text-[#4b436f] mt-2">
        <button className="bg-[#6B4ECF] hover:bg-[#5939b8] text-white px-3 py-1.5 rounded-full transition w-full sm:w-auto shadow-md">
          {buttonLabel}
        </button>
        <span>{solved} / {total}</span>
      </div>
    </motion.div>
  );
};

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
const userId = getuserId();
  const pageParam = new URLSearchParams(location.search).get("page");
  const emailfromUrl = new URLSearchParams(location.search).get("email");
  const userIdFromUrl = userId || new URLSearchParams(location.search).get("userId");
  const isDataMode = pageParam === "data";
  useEffect(() => {
  // Redirect if ?page=update but userId is missing in URL
  if (pageParam === "update" && !userId) {
    toast.error("User ID missing in URL for update mode", {
      position: "top-right",
      theme: "colored",
      style: { backgroundColor: "#dc2626", color: "#fff" },
    });
    // Redirect to login or home after short delay
    setTimeout(() => navigate("/student/login"), 1500);
  }
   else if (pageParam === "update" && userId) {
    // If in update mode, set student data from backend 
    const data=requestApi.get(`/student/${userId}/profile`);
  
    data.then((response) => {
      const studentData = response.data;
      
     setStudent({
  FirstName: studentData?.firstName || "",
  LastName: studentData?.lastName || "",
  userId: studentData?.userId || userIdFromUrl || userId || "",
  Department: studentData?.department || "",
  Year: studentData?.year || "",
  Cgpa: studentData?.cgpa || "",
  Email: emailfromUrl || studentData?.email || "",
  Phone: studentData?.phone || "",
  skills: parseArray(studentData?.skills) || [],
 graduationYear
: studentData?.graduationYear || "",
 
});

      setSkills( parseArray(studentData?.skills) || []);
      setProfileLinks( parseArray(studentData?.urls) || []);
    }
    ).catch((error) => {
      console.error("Error fetching student data:", error);
      toast.error("Failed to fetch student data. Please try again later.", {
        position: "top-right",
        theme: "colored",
        style: { backgroundColor: "#dc2626", color: "#fff" },
      });
    })
}}, [pageParam, userId, navigate]);

  const [isEditing, setIsEditing] = useState(isDataMode);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [profileLinks, setProfileLinks] = useState([]); // Array of { platform, url }
  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    userId: "",
    Department: "",
    Year: "",
    Cgpa: "",
    Email: "",
    Phone: "",
    skills: " ",
    graduationYear: "",
  });

  useEffect(() => {
    if (isDataMode) {
      toast.info("You have to fill details", {
        position: "top-right",
        theme: "colored",
        style: { backgroundColor: "#6B4ECF", color: "white" },
      });
      setStudent({...student, userId: userIdFromUrl || userId , Email: emailfromUrl || "" });
    }
  
      // If not in data mode, set default student data
    //fetch("https://leetcode-stats-api.herokuapp.com/22a31a0525")
      //.then(res => res.json())
      //.then(data => setLeetcodeStats(data));
  }, [isDataMode]);


  const handleInputChange = e => {
      //here added technique to save skills in student object
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value , skills: skills }));
    
   
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && skills.length < 10 && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setStudent(prev => ({ ...prev,  skills: skills }));
      setNewSkill("");
    }
  };

  const removeSkill = skill =>
    setSkills(prev => prev.filter(s => s !== skill));

  const handleSave = async () => {
    const isEmpty = Object.values(student).some(value => value === "" || value === null);
    if (isEmpty || profileLinks.length === 0) {
      toast.error("Please fill all fields and add profile links.", {
        position: "top-right",
        theme: "colored",
      });
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
      console.log(payload);
      const data = await requestApi.post(`/student/${userId}/profile`, payload);
      await toast.success("Data saved successfully!", {
        position: "top-right",
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to save data. Please try again.", {
        position: "top-right",
        theme: "colored",
      });
     
    }
    setIsEditing(false);
    if (isDataMode) {
      setTimeout(() => navigate(`/student/${userId}/home`), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] p-4 relative">
      <ToastContainer />
      <button
        onClick={() => navigate(`/student/${userId}/home`)}
        className="fixed top-4 left-4 px-3 py-1.5 rounded-xl text-white bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] shadow-md hover:scale-105 transition"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto pt-24 pb-12 space-y-10">
        {/* Student Info Card */}
        <motion.section
  initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
  transition={{ type: "spring", stiffness: 100, damping: 10 }}
  className="relative group bg-white/70 backdrop-blur-xl border border-[#6B4ECF]/30 rounded-3xl shadow-2xl p-6 sm:p-8 transform-gpu transition-all hover:shadow-2xl hover:scale-[1.02]"
  style={{ perspective: "1000px" }}
>
  {/* Floating spark shapes */}
  <div className="absolute top-0 left-0 w-4 h-4 bg-[#A855F7]/50 blur-xl rounded-full animate-ping opacity-60"></div>
  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#9333EA]/50 blur-xl rounded-full animate-pulse opacity-40"></div>

  {/* Profile Avatar */}
  <div className="flex justify-center mb-6">
    <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-[#6B4ECF]/40 rounded-full overflow-hidden shadow-xl ring-2 ring-white transition-transform hover:scale-105">
      {/* Placeholder image */}
      <img
        src="/images/profile.png"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Header */}
  <h2 className="text-2xl sm:text-3xl font-bold text-[#6B4ECF] mb-6 text-center tracking-wide drop-shadow-sm">
    Your Profile
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-[#4b436f]">
    {Object.entries(student).filter(([key]) => key !== "skills" ).map(([key, value]) => (
    
      <div key={key} className="flex flex-col">
        <label className="text-xs font-medium text-[#6B4ECF]/70 mb-1 capitalize">{key}</label>
        {isEditing ? (
          <input
            required={isDataMode}
            name={key}
            value={value}
            onChange={handleInputChange}
            className="bg-white/70 border border-[#6B4ECF]/50 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6B4ECF]/50 shadow-sm"
          />
        ) : (
          <span className="font-medium bg-white/50 px-2 py-1.5 rounded-md border border-[#6B4ECF]/20 shadow-inner">
            {value}
          </span>
        )}
      </div>
    ))}

    
  </div>

        

          
          {/* Skills Section */}
  <div className="bg-white/50 border border-[#6B4ECF]/30 rounded-2xl p-4 mb-6 transform-gpu transition hover:scale-[1.01] shadow-inner">
    <h3 className="text-[#6B4ECF] font-semibold mb-2 tracking-wide">Skills</h3>
    {isEditing && (
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1 bg-white/70 border border-[#6B4ECF]/40 rounded-lg px-3 py-1.5 text-[#2C225A] focus:outline-none focus:ring focus:ring-[#6B4ECF]/50 shadow-sm"
          placeholder="Add skill & press Enter"
        />
        <button
          onClick={addSkill}
          className="bg-[#6B4ECF] text-white px-4 py-1.5 rounded-lg hover:bg-[#5939b8] transition shadow-md hover:shadow-lg"
        >
          Add
        </button>
      </div>
    )}
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <motion.span
          key={s}
          whileHover={{ scale: 1.1 }}
          className="bg-[#E4EBFE] border border-[#6B4ECF]/40 text-[#6B4ECF] px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
        >
          {s}
          {isEditing && (
            <button onClick={() => removeSkill(s)} className="text-red-500 hover:text-red-600 font-bold">
              ×
            </button>
          )}
        </motion.span>
      ))}
    </div>
  </div>
    {isEditing && (
  <div className="bg-white/50 border border-[#6B4ECF]/30 rounded-2xl p-2.5 mb-4">
    <h3 className="text-[#6B4ECF] font-semibold mb-1 tracking-wide">Add Profile Links (Max 4)</h3>
    <div className="flex flex-col sm:flex-row gap-2 mb-2">
      <select
        value={newLink.platform}
        onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
        className="flex-1 bg-white/70 border border-[#6B4ECF]/40 rounded-lg px-3 py-1 text-[#2C225A]"
      >
        <option value="">Select Platform</option>
        <option value="GitHub">GitHub</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="HackerRank">HackerRank</option>
        <option value="LeetCode">LeetCode</option>
      </select>
      <input
        type="url"
        placeholder="Paste link"
        value={newLink.url}
        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        className="flex-1 bg-white/70 border border-[#6B4ECF]/40 rounded-lg px-3 py-1 text-[#2C225A]"
      />
      <button
        onClick={() => {
          if (
            newLink.platform &&
            newLink.url &&
            !profileLinks.some(link => link.platform === newLink.platform) &&
            profileLinks.length < 4
          ) {
            setProfileLinks([...profileLinks, newLink]);
            setNewLink({ platform: "", url: "" });
          }
        }}
        className="bg-[#6B4ECF] text-white px-3 py-1 rounded-lg hover:bg-[#5939b8]"
      >
        Add
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {profileLinks.map((link, index) => (
        <div
          key={index}
          className="bg-[#E4EBFE] border border-[#6B4ECF]/40 text-[#6B4ECF] px-2.5 py-1 rounded-md flex items-center gap-2 text-sm"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline">
            {link.platform}
          </a>
          <button
            onClick={() => {
              setProfileLinks(profileLinks.filter((_, i) => i !== index));
            }}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{!isEditing && profileLinks.length > 0 && (
  <div className="bg-white/50 border border-[#6B4ECF]/30 rounded-2xl p-2.5 mb-4">
    <h3 className="text-[#6B4ECF] font-semibold mb-1 tracking-wide">Profile Links</h3>
    <ul className="list-disc list-inside text-sm text-[#4b436f]">
      {profileLinks.map((link, idx) => (
        <li key={idx}>
          <a href={link.url} className="text-blue-700 underline" target="_blank" rel="noreferrer">
            {link.platform}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

  {/* Save/Edit Button */}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="w-full py-2 bg-[#6B4ECF] text-white rounded-xl hover:bg-[#5939b8] transition shadow-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </motion.section>

        {/* Stats */}
        <StatSection title="Problems Solved" solved={75} total={100} rank="Gold" buttonLabel="Solve More" />
        <StatSection title="Contests Attended" solved={12} total={20} rank="Silver" buttonLabel="Join More" />

              {/* LeetCode Stats */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="bg-gradient-to-br from-white/80 to-[#E4EBFE]/60 backdrop-blur-md border border-[#6B4ECF]/30 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all"
>
  <h3 className="text-2xl font-extrabold text-[#6B4ECF] mb-6 tracking-wide">LeetCode Stats</h3>

  {leetcodeStats ? (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Total Solved */}
      <div className="col-span-2 flex items-center justify-center gap-2 bg-white/50 border border-[#6B4ECF]/20 p-4 rounded-xl shadow-inner">
        <FaCheckCircle className="text-[#6B4ECF] text-xl" />
        <span className="text-[#2C225A] font-medium">Total Solved:</span>
        <span className="bg-[#6B4ECF] text-white px-3 py-1 rounded-full text-sm shadow-md">
          {leetcodeStats.totalSolved}
        </span>
      </div>

      {/* Easy */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex flex-col items-center shadow-sm transition hover:scale-105">
        <FaThumbsUp className="text-green-600 text-xl mb-1" />
        <span className="text-green-600 font-medium">Easy</span>
        <span className="font-bold text-green-800">{leetcodeStats.easySolved}</span>
      </div>

      {/* Medium */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex flex-col items-center shadow-sm transition hover:scale-105">
        <FaBolt className="text-yellow-600 text-xl mb-1" />
        <span className="text-yellow-600 font-medium">Medium</span>
        <span className="font-bold text-yellow-800">{leetcodeStats.mediumSolved}</span>
      </div>

      {/* Hard */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex flex-col items-center shadow-sm transition hover:scale-105">
        <FaTrophy className="text-red-600 text-xl mb-1" />
        <span className="text-red-600 font-medium">Hard</span>
        <span className="font-bold text-red-800">{leetcodeStats.hardSolved}</span>
      </div>

      {/* Ranking */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex flex-col items-center shadow-sm transition hover:scale-105">
  <FaMedal className="text-purple-600 text-xl mb-1" />
  <span className="text-purple-600 font-medium">Ranking</span>
  <span className="font-bold text-purple-800">#{leetcodeStats.ranking}</span>
</div>
    </div>
  ) : (
    <p className="text-[#4b436f]">Loading stats...</p>
  )}
</motion.section>

      </div>
    </div>
  );
};

export default StudentProfile;
