import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaUserTie, FaCheckCircle, FaClock, FaClipboardList, FaArrowRight } from "react-icons/fa";
import NavbarRecruiterDashboard from "../../components/NavbarRecruiterDashboard";
import requestApi from "../../services/request";
import getUserId from "../../services/getUserId";
import toast from "react-hot-toast";

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
  { id: 1, name: "IIT Delhi", icon: <FaUniversity size={50} className="text-indigo-600" /> },
  { id: 2, name: "NIT Trichy", icon: <FaLandmark size={50} className="text-indigo-600" /> },
  { id: 3, name: "BITS Pilani", icon: <FaGraduationCap size={50} className="text-indigo-600" /> },
  { id: 4, name: "VIT Vellore", icon: <FaSchool size={50} className="text-indigo-600" /> },
  { id: 5, name: "SRM Chennai", icon: <FaBuilding size={50} className="text-indigo-600" /> },
  { id: 6, name: "Amity Noida", icon: <FaIndustry size={50} className="text-indigo-600" /> },
  { id: 7, name: "IIIT Hyderabad", icon: <FaBriefcase size={50} className="text-indigo-600" /> },
];

const placementNews = [
  "IIT Bombay placements begin Aug 1 • ",
  "NIT Trichy hosting virtual placement drive • ",
  "BITS Pilani shortlists released • ",
  "IIT Delhi interviews wrap up successfully • ",
  "IIIT Hyderabad to host recruiters on July 25 • ",
];

const RecruiterDashboard = () => {
  const scrollRef = useRef(null);
  const scrollAmount = 300;
  const [recruiter, setRecruiter] = useState({ firstName: "Recruiter" });
  const [loading, setLoading] = useState(true);
  const userId = getUserId();

  useEffect(() => {
    if (userId) {
      requestApi.get(`/recruiter/profile`)
        .then((response) => {
          if (response.data) {
            setRecruiter(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recruiter data:", error);
          // Fallback to default if fetch fails
          setLoading(false);
        });
    }
  }, [userId]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const trackerStats = [
    { title: "Interviews Conducted", value: 30, icon: <FaUserTie className="text-blue-500" />, color: "border-blue-200" },
    { title: "Candidates Shortlisted", value: 12, icon: <FaCheckCircle className="text-emerald-500" />, color: "border-emerald-200" },
    { title: "Feedback Pending", value: 5, icon: <FaClock className="text-amber-500" />, color: "border-amber-200" },
    { title: "Active Postings", value: 8, icon: <FaClipboardList className="text-purple-500" />, color: "border-purple-200" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] font-outfit">
      <NavbarRecruiterDashboard />

      <motion.main
        className="pt-28 pb-12 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✨ Hero Section - Centered and Clean */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#2F2F5B] leading-[1.1] tracking-tight">
              Welcome to Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Dashboard, {recruiter.firstName}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#5C5C80] max-w-2xl mx-auto leading-relaxed">
              Simplify your recruitment process. Manage postings, track candidates, and build your dream team with our intuitive tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/recruiter/${userId}/jobpostings`}
                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.05] transition-all flex items-center gap-3"
              >
                Create New Posting <FaArrowRight size={14} />
              </Link>
              <Link
                to={`/recruiter/${userId}/applications`}
                className="px-10 py-4 bg-white border border-gray-100 text-[#2F2F5B] rounded-2xl font-bold shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
              >
                Manage Applications
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 📊 Stats Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trackerStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/80 backdrop-blur-md p-8 rounded-3xl border ${stat.color} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-4xl font-black text-[#2F2F5B] mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-[#5C5C80]">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🛠️ Modern Quick Access Hub */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#2F2F5B]">Management Hub</h2>
            <div className="h-0.5 flex-1 bg-gray-200/50 mx-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white p-8 rounded-[2rem] hover:bg-white/80 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <FaBriefcase className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2F2F5B] mb-2">Job Postings</h3>
              <p className="text-[#5C5C80] text-sm mb-6">Review your active roles and edit job requirements on the fly.</p>
              <Link to={`/recruiter/${userId}/jobpostings`} className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View Roles <FaArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white p-8 rounded-[2rem] hover:bg-white/80 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <FaClipboardList className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2F2F5B] mb-2">Application Tracking</h3>
              <p className="text-[#5C5C80] text-sm mb-6">Check the status of all applicants and filter by their performance scores.</p>
              <Link to={`/recruiter/${userId}/applications`} className="text-purple-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Check Progress <FaArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white p-8 rounded-[2rem] hover:bg-white/80 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <FaCheckCircle className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2F2F5B] mb-2">Interview History</h3>
              <p className="text-[#5C5C80] text-sm mb-6">Access feedback logs and past candidate evaluations in one place.</p>
              <div className="text-emerald-600 font-bold text-sm flex items-center gap-2 cursor-not-allowed opacity-60">
                Reports Coming Soon <FaArrowRight size={12} />
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* 📍 Footer */}
      <footer className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">Your one-stop placement tracker</p>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterDashboard;
