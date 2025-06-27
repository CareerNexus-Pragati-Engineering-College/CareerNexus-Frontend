import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTrophy, FaBolt, FaThumbsUp, FaMedal, FaStar } from "react-icons/fa";

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
      {/* Main Medal Icon */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <FaMedal className={`absolute w-16 h-16 ${medalColorClass} drop-shadow-md`} />

        {/* Shimmer across medal */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2s_infinite] pointer-events-none" />

        {/* Spark effects */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-20 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-80 shadow-lg"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 70}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.3, 0.5],
                y: [-5, -15, -5],
                x: [-5, 5, -5],
                rotate: [0, 45, -45],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <span className="absolute opacity-0 group-hover:opacity-100 transition -translate-x-1/2 left-1/2 -bottom-8 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-md">
        {rank} Achievement
      </span>
    </motion.div>
  );
};



const StatSection = ({ title, solved, total, rank, buttonLabel }) => {
  const percent = Math.min(100, Math.round((solved / total) * 100));
  const sparkThreshold = 10; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-white/70 backdrop-blur-md border border-[#6B4ECF]/40 rounded-2xl p-4 sm:p-6 text-[#2C225A] shadow-md hover:shadow-xl transition"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#6B4ECF]">{title}</h3>
        <RibbonBadge rank={rank} />
      </div>

    

{/* Progress */}
<div className="flex items-center gap-3 mb-2">
  <div className="relative flex-1 bg-[#E4EBFE]/60 border border-[#6B4ECF]/40 rounded-full h-4 overflow-hidden">
    <motion.div
      className="relative h-4 bg-[#A855F7] rounded-full"
      style={{ width: `${percent}%` }}
      initial={{ width: 0 }}
      whileInView={{ width: `${percent}%` }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
       {/* Gold glow line */}
            {percent >= sparkThreshold && (
  <motion.div
    className="absolute right-0 top-0 h-4 w-1 bg-yellow-400 shadow-[0_0_12px_#facc15,0_0_24px_#facc15]"
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ opacity: 1, scaleY: [0.8, 1.4, 1.2] }}
    transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    style={{ transformOrigin: "top center" }}
  />
)}
          </motion.div>
        </div>

        <span className="text-xs sm:text-sm font-bold text-[#6B4ECF] bg-white border border-[#6B4ECF]/50 px-2 py-1 rounded-full">
          {percent}%
        </span>
      </div>


      {/* Buttons + Count */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center text-sm text-[#4b436f] mt-2">
        <button className="bg-[#6B4ECF] hover:bg-[#5939b8] text-white px-3 py-1.5 rounded-full transition w-full sm:w-auto shadow-md hover:shadow-lg">
          {buttonLabel}
        </button>
        <span>{solved} / {total}</span>
      </div>
    </motion.div>
  );
};




const StudentProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(["React.js", "Tailwind CSS"]);
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  const [student, setStudent] = useState({
    firstName: "Pranay",
    lastName: "K",
    rollNumber: "22A31A0542",
    department: "CSE",
    year: "4th Year",
    cgpa: "7.4",
    gmail: "pranayk74174174@gmail.com",
    phone: "9876543210",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  const addSkill = () => {
    const s = newSkill.trim();
    if (s && skills.length < 10 && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
      setNewSkill("");
    }
  };
  const removeSkill = (s) => setSkills((prev) => prev.filter((skill) => skill !== s));
  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/john_doe")
      .then((res) => res.json())
      .then((data) => setLeetcodeStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] p-4 relative">
      <button
  onClick={() => navigate("/student/home")}
  className="
    fixed top-4 left-4
    px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-medium text-white
    bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]
    shadow-md transition-transform transform
    hover:scale-105 hover:shadow-[0_0_15px_#8B5CF6]
  "
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

  {/* Info Fields */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#4b436f] mb-6">
    {Object.entries(student).map(([key, value]) => (
      <div key={key} className="flex flex-col transition transform group-hover:scale-105">
        <label className="text-xs font-medium text-[#6B4ECF]/70 mb-1 capitalize tracking-wide">
          {key}
        </label>
        {isEditing ? (
          <input
            name={key}
            value={value}
            onChange={handleInputChange}
            className="bg-white/70 border border-[#6B4ECF]/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4ECF]/50 text-[#2C225A] shadow-sm"
          />
        ) : (
          <span className="font-medium text-[#2C225A] bg-white/50 px-2 py-1.5 rounded-md border border-[#6B4ECF]/20 shadow-inner">
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

  {/* Save/Edit Button */}
  <button
    onClick={() => setIsEditing((prev) => !prev)}
    className="w-full py-2 bg-[#6B4ECF] text-white rounded-xl font-medium hover:bg-[#5939b8] transition shadow-md hover:shadow-lg"
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
