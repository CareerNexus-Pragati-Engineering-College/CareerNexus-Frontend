// src/pages/admin/Admin.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaHome,
  FaFileAlt,
  FaChartBar,
  FaBell,
  FaUserTie,
  FaPlus,
} from "react-icons/fa";
import NavbarAdmin from "../../components/NavbarAdminDashboard"; // ✅ using NavbarAdmin

const tpoFeatures = [
  {
    icon: <FaFileAlt />,
    title: "Candidate Management",
    desc: "Manage student applications and resumes with efficiency.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics Dashboard",
    desc: "Track placement statistics and department progress in real time.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
    desc: "Send updates and alerts to students instantly.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: <FaUserTie />,
    title: "TPO Dashboard",
    desc: "Monitor activities and streamline placement operations.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
];

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] scroll-smooth font-outfit">
      {/* 🆕 Navbar with "Add" Button */}
      <NavbarAdmin
      // extraButton={{
      //label: "Add",
      //to: "/admin/add",
      //icon: <FaPlus className="text-base" />,
      // }}
      />

      {/* 🔙 Back to Main Home */}
      <div className="fixed top-[90px] left-3 z-50 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <NavLink
            to="/"
            className="group flex items-center gap-2.5 px-5 py-2.5 bg-white border border-purple-200 rounded-full text-purple-900 font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_15px_rgba(109,40,217,0.15)] hover:border-purple-300 transition-all duration-300 font-outfit"
          >
            <FaHome className="text-purple-600 text-lg group-hover:-translate-y-[2px] transition-transform duration-300" />
            Back to Home
          </NavLink>
        </motion.div>
      </div>

      {/* 🧑‍💼 Admin Hero Section */}
      <section
        id="admin-home"
        className="min-h-screen pt-28 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* 📝 Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-violet-100 text-violet-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm border border-violet-200"
          >
            Administrator Control
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-[#2F2F5B] font-outfit tracking-tight">
            Welcome To <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Admin Portal</span>
          </h1>
          <div className="text-2xl sm:text-3xl font-semibold mb-6 text-[#9266FF] drop-shadow-sm font-outfit">
            <Typewriter
              options={{
                strings: [
                  "Manage TPO operations",
                  "Monitor candidate pipelines",
                  "Administer placement records",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-[#5C5C80] mb-8 text-sm sm:text-base leading-relaxed max-w-lg font-outfit">
            CareerNexus empowers Admins to oversee and control TPO-level placement activities across the institution with precision and ease.
          </p>
        </motion.div>

        {/* 📷 Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          <div className="rounded-3xl overflow-hidden border border-[#cbbfff] shadow-[0_0_25px_rgba(165,100,255,0.25)] hover:shadow-[0_0_45px_rgba(165,100,255,0.5)] transition-all duration-500 hover:scale-[1.04] backdrop-blur-md bg-white/5">
            <img
              src="/images/tpo.jpeg"
              alt="Admin Portal"
              className="w-full h-auto object-cover rounded-2xl transition duration-300 hover:brightness-110"
            />
          </div>
        </motion.div>
      </section>

      {/* 🔧 Admin Features */}
      <section
        id="admin-features"
        className="min-h-screen bg-gradient-to-b from-[#E4EBFE] to-[#F8E5EB] py-20 px-6 sm:px-10 md:px-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 block font-outfit"
          >
            Management Tools
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2F2F5B] mb-6 font-outfit">
              Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Admin Features</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
          {tpoFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(130,90,255,0.2)]"
            >
              {/* Animated Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[2.5rem]`}></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                <div className={`text-4xl ${feature.iconColor} p-5 bg-white rounded-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F2F5B] mb-3 font-outfit group-hover:text-indigo-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#5C5C80] leading-relaxed font-outfit text-base">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📘 About Section */}
      <section id="admin-about" className="py-24 px-6 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-xl border border-white/40 p-12 rounded-[2.5rem] shadow-xl"
        >
          <h2 className="text-4xl font-extrabold text-[#2F2F5B] mb-6 font-outfit">
            About <span className="text-violet-600">Admin Portal</span>
          </h2>
          <p className="text-[#5C5C80] text-lg leading-relaxed font-outfit">
            The CareerNexus Admin portal provides higher-level access for managing TPOs, overseeing placement strategy, and enhancing placement success across all departments.
          </p>
        </motion.div>
      </section>

      {/* 📍 Footer */}
      <footer className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">Your one-stop placement tracker</p>
        </div>
      </footer>


    </div>
  );
};

export default Admin;
