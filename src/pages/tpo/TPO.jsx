// src/pages/tpo/TPO.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaHome,
  FaFileAlt,
  FaChartBar,
  FaBell,
  FaUserTie,
} from "react-icons/fa";
import NavbarTPO from "../../components/NavbarTPO";


const tpoFeatures = [
  {
    icon: <FaFileAlt className="text-4xl text-violet-400 mb-4" />,
    title: "Candidate Management",
    desc: "Manage student applications and resumes with efficiency.",
  },
  {
    icon: <FaChartBar className="text-4xl text-violet-400 mb-4" />,
    title: "Analytics Dashboard",
    desc: "Track placement statistics and department progress in real time.",
  },
  {
    icon: <FaBell className="text-4xl text-violet-400 mb-4" />,
    title: "Notifications",
    desc: "Send updates and alerts to students instantly.",
  },
  {
    icon: <FaUserTie className="text-4xl text-violet-400 mb-4" />,
    title: "TPO Dashboard",
    desc: "Monitor activities and streamline placement operations.",
  },
];

const TPO = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] scroll-smooth font-poppins">

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

      {/* 🧑‍💼 TPO Hero Section */}
      <section
        id="tpo-home"
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
            Welcome To TPO Portal
          </h1>
          <div className="text-2xl sm:text-3xl font-semibold mb-6 text-[#B497FF] drop-shadow-md">
            <Typewriter
              options={{
                strings: [
                  "Oversee candidate data",
                  "Coordinate interviews",
                  "Boost placement outcomes",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-[#3f3f5c] mb-8">
            CareerNexus empowers TPOs to organize, monitor, and improve placement
            activities with precision and ease.
          </p>

          <ScrollLink
            to="tpo-features"
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
              alt="TPO Portal"
              className="w-full h-auto object-cover rounded-2xl transition duration-300 hover:brightness-110"
            />
          </div>
        </motion.div>
      </section>

      {/* 🔧 TPO Features */}
      <section
        id="tpo-features"
        className="min-h-screen bg-gradient-to-b from-[#E4EBFE] to-[#F8E5EB] py-20 px-6 sm:px-10 md:px-24"
      >
        <h2 className="text-4xl font-bold text-center text-[#6B4ECF] mb-16 font-orbitron">
          TPO Features
        </h2>

        <div className="max-w-6xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2">
          {tpoFeatures.map((feature, index) => (
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

      {/* 📘 About Section */}
      <section id="tpo-about" className="py-20 px-6 bg-gradient-to-b from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#6B4ECF] mb-4 font-orbitron">
            About TPO Portal
          </h2>
          <p className="text-[#4b436f]">
            The CareerNexus TPO portal is tailored for Training & Placement Officers
            to simplify recruitment coordination, monitor analytics, and streamline
            placement operations.
          </p>
        </div>
      </section>

      <NavbarTPO />
      
    </div>
  );
};

export default TPO;
