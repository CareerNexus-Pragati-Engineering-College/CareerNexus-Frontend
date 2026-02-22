import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaHome,
  FaUserTie,
  FaClipboardList,
  FaChartBar,
  FaClock,
} from "react-icons/fa";
import NavbarRecruiter from "../../components/NavbarRecruiter"; // ✅ updated

const recruiterFeatures = [
  {
    icon: <FaClipboardList className="text-4xl text-violet-400 mb-4" />,
    title: "Interview Scheduler",
    desc: "Easily manage interview time slots and send reminders to candidates.",
  },
  {
    icon: <FaChartBar className="text-4xl text-violet-400 mb-4" />,
    title: "Candidate Analytics",
    desc: "View candidates' profiles and evaluate them with insightful metrics.",
  },
  {
    icon: <FaUserTie className="text-4xl text-violet-400 mb-4" />,
    title: "Profile Management",
    desc: "Maintain your profile and company credentials seamlessly.",
  },
  {
    icon: <FaClock className="text-4xl text-violet-400 mb-4" />,
    title: "Real-Time Status",
    desc: "Get instant updates about upcoming interviews and progress.",
  },
];

const Recruiter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] scroll-smooth font-poppins">
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

      {/* 🧑‍💼 Hero Section */}
      <section
        id="recruiter-home"
        className="min-h-screen pt-28 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* 📝 Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Welcome To Recruiter Portal
          </h1>
          <div className="text-2xl sm:text-3xl font-semibold mb-6 text-[#B497FF] drop-shadow-md">
            <Typewriter
              options={{
                strings: [
                  "Empower the hiring process",
                  "Stay organized and efficient",
                  "Find the best talent easily",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-[#4b436f] mb-8">
            Efficiently coordinate interviews, track candidates’ progress, and make
            informed decisions — all in one simple interface.
          </p>

          <ScrollLink
            to="recruiter-features"
            smooth={true}
            duration={600}
            offset={-70}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#b892ff] to-[#411686]
             shadow-[0_0_5px_#b892ff] hover:shadow-[0_0_10px_#b892ff,0_0_20px_#411686]
             transition-all duration-300 transform hover:scale-105 cursor-pointer group"
          >
            Get Started
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <FaArrowRight />
            </span>
          </ScrollLink>
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
              src="/images/interviewer.jpeg" // ✅ make sure this image exists
              alt="Recruiter Portal"
              className="w-full h-auto object-cover rounded-2xl transition duration-300 hover:brightness-110"
            />
          </div>
        </motion.div>
      </section>

      {/* 🚀 Features */}
      <section
        id="recruiter-features"
        className="min-h-screen bg-gradient-to-b from-[#E4EBFE] to-[#F8E5EB] py-20 px-6 sm:px-10 md:px-24"
      >
        <h2 className="text-4xl font-bold text-center text-[#6B4ECF] mb-16 font-orbitron">
          Recruiter Features
        </h2>

        <div className="max-w-6xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2">
          {recruiterFeatures.map((feature, index) => (
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
      </section>

      {/* 📖 About */}
      <section
        id="recruiter-about"
        className="py-20 px-6 bg-gradient-to-b from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#6B4ECF] mb-4 font-orbitron">
            About Recruiter Portal
          </h2>
          <p className="text-[#4b436f]">
            Our portal simplifies the recruitment process by providing recruiters
            with powerful tools to manage schedules, track candidates, and assess
            performances efficiently — all from one intuitive dashboard.
          </p>
        </div>
      </section>

      {/* 📍 Navbar */}
      <NavbarRecruiter />

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

export default Recruiter;
