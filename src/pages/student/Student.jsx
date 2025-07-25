import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaHome,
  FaFileAlt,
  FaChartLine,
  FaBell,
  FaUserGraduate,
} from "react-icons/fa";
import NavbarStudent from "../../components/NavbarStudent";

const studentFeatures = [
  {
    icon: <FaFileAlt className="text-4xl text-violet-400 mb-4" />,
    title: "Resume Builder",
    desc: "Create and update your resumes effortlessly with professional templates.",
  },
  {
    icon: <FaUserGraduate className="text-4xl text-violet-400 mb-4" />,
    title: "Application Tracker",
    desc: "Track your job applications and manage your progress clearly.",
  },
  {
    icon: <FaBell className="text-4xl text-violet-400 mb-4" />,
    title: "Live Updates",
    desc: "Get real-time updates on interview schedules and announcements.",
  },
  {
    icon: <FaChartLine className="text-4xl text-violet-400 mb-4" />,
    title: "Student Dashboard",
    desc: "Access your performance analytics, test scores, and placement stats.",
  },
];

const Student = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] scroll-smooth font-poppins overflow-x-hidden">
      <NavbarStudent />

      {/* 🔙 Back to Main Home */}
      <div className="fixed top-[90px] left-3 z-50 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-100 bg-white/30 hover:bg-violet-600/70 px-4 py-2 rounded-full shadow-md hover:shadow-[0_0_18px_rgba(130,90,255,0.6)] transition-all font-semibold backdrop-blur-md"
          >
            <FaHome className="text-base" />
            Back to Home
          </NavLink>
        </motion.div>
      </div>

      {/* 🎓 Student Landing Section */}
      <section className="min-h-screen pt-28 flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Welcome To Student Portal
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-[#B497FF] drop-shadow-md">
              <Typewriter
                options={{
                  strings: [
                    "Track your placement journey",
                    "Stay organized and ahead",
                    "Ace every opportunity",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="text-[#3f3f5c] mb-8 text-sm sm:text-base md:text-lg">
              The student portal of CareerNexus helps streamline your placement preparation,
              resume updates, and goal tracking all in one powerful interface.
            </p>

            <ScrollLink
              to="student-features"
              smooth={true}
              duration={600}
              offset={-70}
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full
              bg-gradient-to-r from-[#b892ff] to-[#411686]
              shadow-[0_0_5px_#b892ff] hover:shadow-[0_0_10px_#b892ff,0_0_20px_#411686]
              transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              Get Started
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <FaArrowRight />
              </span>
            </ScrollLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl overflow-hidden border border-[#cbbfff] shadow-[0_0_25px_rgba(165,100,255,0.25)] hover:shadow-[0_0_45px_rgba(165,100,255,0.5)] transition-all duration-500 hover:scale-[1.04] backdrop-blur-md bg-white/5">
              <img
                src="/images/student.jpeg"
                alt="Student Portal"
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl transition duration-300 hover:brightness-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section
        id="student-features"
        className="min-h-screen py-20 bg-gradient-to-b from-[#E4EBFE] to-[#F8E5EB]"
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="text-4xl font-bold text-center text-[#6B4ECF] mb-16 font-orbitron">
            Student Features
          </h2>

          <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {studentFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/30 backdrop-blur-lg p-6 rounded-3xl shadow-lg hover:scale-[1.03] transition-all text-center border border-violet-200/30 hover:shadow-[0_0_25px_rgba(130,90,255,0.3)] cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-violet-100/40 p-4 rounded-full shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-violet-700 mb-2 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-[#4b436f] leading-relaxed text-sm sm:text-base">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💼 About Section */}
      <section
        id="student-about"
        className="py-20 bg-gradient-to-b from-[#F8E5EB] to-[#E4EBFE]"
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#6B4ECF] mb-4 font-orbitron">
              About Student Portal
            </h2>
            <p className="text-[#4b436f] leading-relaxed text-sm sm:text-base">
              The CareerNexus student portal is a smart solution tailored for student placement preparation.
              From resumes to updates to personal progress tracking, we provide everything in one powerful
              dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* 📍 Footer */}
      <footer className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">
            Your one-stop placement tracker
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Student;
