import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import {
  FaUniversity,
  FaSchool,
  FaLandmark,
  FaBuilding,
  FaBriefcase,
  FaGraduationCap,
  FaIndustry,
} from "react-icons/fa";

const visitedColleges = [
  { id: 1, name: "IIT Delhi", icon: <FaUniversity size={50} className="text-violet-600" /> },
  { id: 2, name: "NIT Trichy", icon: <FaLandmark size={50} className="text-violet-600" /> },
  { id: 3, name: "BITS Pilani", icon: <FaGraduationCap size={50} className="text-violet-600" /> },
  { id: 4, name: "VIT Vellore", icon: <FaSchool size={50} className="text-violet-600" /> },
  { id: 5, name: "SRM Chennai", icon: <FaBuilding size={50} className="text-violet-600" /> },
  { id: 6, name: "Amity Noida", icon: <FaIndustry size={50} className="text-violet-600" /> },
  { id: 7, name: "IIIT Hyderabad", icon: <FaBriefcase size={50} className="text-violet-600" /> },
];

const trackerStats = [
  { title: "Interviews Conducted", value: 30 },
  { title: "Candidates Shortlisted", value: 12 },
  { title: "Feedback Submitted", value: 27 },
];

const placementNews = [
  "IIT Bombay placements begin Aug 1",
  "NIT Trichy hosting virtual placement drive",
  "BITS Pilani shortlists released",
  "IIT Delhi interviews wrap up successfully",
  "IIIT Hyderabad to host recruiters on July 25",
];

const RecruiterDashboard = () => {
  const scrollRef = useRef(null);
  const scrollAmount = 220;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <>
      <NavbarRecruiterDashboard />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins flex flex-col items-center px-4 sm:px-6 pt-24 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✨ Hero Section */}
        <section className="w-full max-w-7xl min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex-1 text-left max-w-2xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2F2F5B] mb-4 drop-shadow-md tracking-wide leading-tight">
              Welcome to Your Dashboard, Recruiter
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#4b436f] mb-4 leading-relaxed max-w-xl">
              Review candidates, manage interviews, and make impactful hiring decisions with ease.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#8c73cc] font-medium drop-shadow-md mt-2">
              Let’s find the right talent!
            </p>
          </motion.div>

          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-violet-200/50 shadow-xl text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">Candidate Shortlist</h2>
              <p className="text-sm sm:text-base text-[#4b436f] mb-5">Review top candidates and schedule interviews.</p>
              <div className="space-y-2 mb-4 text-left">
                {[{ name: "Pranay", role: "Frontend Developer" },
                  { name: "Akshay", role: "Data Analyst" },
                  { name: "Shruti", role: "Backend Developer" },
                  { name: "Ravi", role: "AI Engineer" },
                ].map((candidate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/60 border border-violet-100 p-2 rounded-lg shadow-sm hover:bg-white/80 transition"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#2C225A]">{candidate.name}</h3>
                      <span className="text-xs sm:text-sm text-violet-500 font-medium">{candidate.role}</span>
                    </div>
                    <button className="px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-md hover:scale-105 transition">
                      Schedule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 🏫 Colleges Visited */}
        <section className="relative w-full max-w-7xl mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#6B4ECF] mb-10 text-center drop-shadow-md">
            Colleges Visited
          </h2>

          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaChevronLeft className="text-[#6B4ECF] w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaChevronRight className="text-[#6B4ECF] w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-4"
          >
            {visitedColleges.map((college) => (
              <Link
                key={college.id}
                to={`/recruiter/college/${college.id}`}
                className="bg-white/60 border border-violet-200/40 backdrop-blur-xl p-5 sm:p-7 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[180px] transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] hover:bg-white/80 cursor-pointer"
              >
                <div className="mb-3 sm:mb-4">{college.icon}</div>
                <span className="text-base sm:text-lg font-medium text-[#2C225A] text-center">
                  {college.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 📊 Interview Tracker */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">
            Interview Tracker
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trackerStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/50 border border-violet-200/50 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-2xl sm:text-3xl font-bold text-[#6B4ECF]">{stat.value}</span>
                <p className="text-xs sm:text-sm text-[#2C225A] mt-2">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 📰 Placement News */}
        <section className="w-full max-w-6xl mb-16 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">
            Latest Campus News
          </h2>
          <motion.div className="flex gap-4 sm:gap-8 animate-marquee">
            {placementNews.concat(placementNews).map((news, index) => (
              <div
                key={index}
                className="bg-white/60 border border-violet-200/40 rounded-xl shadow-md p-3 sm:p-4 min-w-[200px] sm:min-w-[250px] whitespace-nowrap text-center text-xs sm:text-base text-[#2C225A] font-medium"
              >
                {news}
              </div>
            ))}
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default RecruiterDashboard;
