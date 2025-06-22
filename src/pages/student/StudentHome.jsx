// src/pages/student/StudentHome.jsx
import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";

const dashboardItems = [
  {
    title: "Companies",
    icon: <FaBuilding className="text-4xl text-violet-400" />,
    link: "/student/companies",
    description: "Browse companies & opportunities",
  },
  {
    title: "Applications",
    icon: <FaClipboardList className="text-4xl text-violet-400" />,
    link: "/student/applications",
    description: "Track all your applications",
  },
  {
    title: "Interviews",
    icon: <FaCalendarAlt className="text-4xl text-violet-400" />,
    link: "/student/interviews",
    description: "View interview schedules",
  },
  {
    title: "Profile",
    icon: <FaUser className="text-4xl text-violet-400" />,
    link: "/student/profile",
    description: "Update profile & resume",
  },
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
            Explore companies, manage your applications, track interviews, and update your profile — all in one place.
          </p>
          <motion.div
            className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-violet-200/40 shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p className="text-violet-700 text-base md:text-lg font-medium flex items-center justify-center gap-2">
              Get Started <FaArrowRight className="text-violet-500" />
            </p>
          </motion.div>
        </motion.section>

        {/* 🚀 Dashboard Tiles */}
        <motion.section
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            hidden: { opacity: 0 },
          }}
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <NavLink
                to={item.link}
                className="bg-white/40 backdrop-blur-xl border border-violet-200/40 p-6 rounded-3xl shadow-md flex flex-col items-center text-center hover:scale-105 hover:shadow-[0_0_20px_rgba(130,90,255,0.3)] transition-transform duration-300"
              >
                <div className="bg-violet-100/40 p-4 rounded-full shadow-md mb-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <h2 className="text-xl font-semibold text-violet-700 mb-1">{item.title}</h2>
                <p className="text-[#4b436f] text-sm">{item.description}</p>
              </NavLink>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </>
  );
};

export default StudentHome;
