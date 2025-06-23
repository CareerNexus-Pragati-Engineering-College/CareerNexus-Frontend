// src/pages/student/StudentHome.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBuilding } from "react-icons/fa";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";

const visitedCompanies = [
  { id: 1, name: "Google", logo: "/images/google.png" },
  { id: 2, name: "Microsoft", logo: "/images/microsoft.png" },
  { id: 3, name: "Amazon", logo: "/images/amazon.png" },
  { id: 4, name: "Infosys", logo: "/images/infosys.png" },
  { id: 5, name: "TCS", logo: "/images/tcs.png" },
  { id: 6, name: "Wipro", logo: "/images/wipro.png" },
  { id: 7, name: "Accenture", logo: "/images/accenture.png" },
  { id: 8, name: "HCL", logo: "/images/hcl.png" },
  { id: 9, name: "Tech Mahindra", logo: "/images/techmahindra.png" },
];

const openJobs = [
  { id: 1, company: "Google", role: "Frontend Engineer" },
  { id: 2, company: "Microsoft", role: "Full-Stack Developer" },
  { id: 3, company: "Amazon", role: "Cloud Engineer" },
  { id: 4, company: "Infosys", role: "Software Trainee" },
];

// Dummy data for the new sections
const trackerStats = [
  { title: "Companies Applied", value: 12 },
  { title: "Interviews Attended", value: 5 },
  { title: "Offers Received", value: 2 },
];

const placementNews = [
  "Google to visit campus on July 10",
  "Microsoft offers 5 new roles",
  "Accenture conducting virtual drive",
  "Infosys interview results declared",
  "Tech Mahindra recruitment in process",
];

const StudentHome = () => {
  return (
    <>
      <NavbarStudentDashboard />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins flex flex-col items-center px-4 sm:px-6 pt-24 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✨ Hero Section */}
        <motion.section
          className="w-full max-w-5xl min-h-[60vh] flex flex-col justify-center items-center text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#6B4ECF] mb-4 drop-shadow-md">
            ✨ Welcome to Student Dashboard
          </h1>
          <p className="text-md md:text-xl text-[#4b436f] max-w-2xl mb-6 px-2">
            Explore companies that visited our campus and apply for available job roles — all in one place.
          </p>
        </motion.section>

        {/* 🏢 Companies Visited Section */}
        <section className="w-full max-w-7xl mb-16 overflow-hidden">
          <h2 className="text-2xl font-semibold text-[#6B4ECF] mb-8 text-center drop-shadow-md">
            Companies Visited
          </h2>
          <motion.div
            className="flex gap-10 animate-marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {visitedCompanies.concat(visitedCompanies).map((company, index) => (
              <motion.div
                key={index}
                className="bg-white/60 border border-violet-200/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[160px] transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:bg-white/80"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-20 w-20 mb-3 object-contain drop-shadow-sm"
                />
                <span className="text-md font-medium text-[#2C225A] text-center">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 📊 Progress Tracker */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">
            Progress Tracker
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trackerStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/50 border border-violet-200/50 p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.03 }}
              >
                <motion.span
                  className="text-3xl font-bold text-[#6B4ECF]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.value}
                </motion.span>
                <p className="text-sm text-[#2C225A] mt-2">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 📰 Latest Placement News */}
        <section className="w-full max-w-6xl mb-16 overflow-hidden">
          <h2 className="text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">
            Latest Placement News
          </h2>
          <motion.div
            className="flex gap-8 animate-marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {placementNews.concat(placementNews).map((news, index) => (
              <div
                key={index}
                className="bg-white/60 border border-violet-200/40 rounded-xl shadow-md p-4 min-w-[250px] whitespace-nowrap text-center text-[#2C225A] font-medium"
              >
                {news}
              </div>
            ))}
          </motion.div>
        </section>

        {/* 💼 Apply for Companies Section */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">
            Apply for Companies
          </h2>
          <div className="bg-white/50 border border-violet-200/50 backdrop-blur-xl p-6 rounded-2xl shadow-md space-y-4">
            {openJobs.map((job) => (
              <motion.div
                key={job.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-white/60 rounded-lg border border-violet-200/40 hover:scale-105 transition-transform"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <FaBuilding className="text-violet-500 text-2xl mb-2 sm:mb-0" />
                  <div>
                    <h3 className="text-lg font-medium text-[#2C225A]">{job.company}</h3>
                    <p className="text-sm text-[#4b436f]">{job.role}</p>
                  </div>
                </div>
                <button className="mt-3 sm:mt-0 px-5 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-full flex items-center gap-2 shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-transform hover:brightness-110 glow-effect">
                  Apply <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default StudentHome;
