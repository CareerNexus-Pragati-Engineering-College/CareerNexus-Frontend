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
    icon: <FaFileAlt className="text-4xl text-violet-500" />,
    title: "Candidate Management",
    desc: "Seamlessly manage student profiles, resumes, and applications with high-performance tracking tools.",
    gradient: "from-violet-500/10 to-transparent",
    borderColor: "group-hover:border-violet-400",
  },
  {
    icon: <FaChartBar className="text-4xl text-indigo-500" />,
    title: "Analytics Dashboard",
    desc: "Gain deep insights into placement statistics, department progress, and company trends in real-time.",
    gradient: "from-indigo-500/10 to-transparent",
    borderColor: "group-hover:border-indigo-400",
  },
  {
    icon: <FaBell className="text-4xl text-purple-500" />,
    title: "Smart Notifications",
    desc: "Broadcast instant updates, interview schedules, and critical alerts directly to students' dashboards.",
    gradient: "from-purple-500/10 to-transparent",
    borderColor: "group-hover:border-purple-400",
  },
  {
    icon: <FaUserTie className="text-4xl text-fuchsia-500" />,
    title: "TPO Command Center",
    desc: "Empower your administration with a centralized hub for all campus placement operations and data.",
    gradient: "from-fuchsia-500/10 to-transparent",
    borderColor: "group-hover:border-fuchsia-400",
  },
];

const TPO = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] scroll-smooth font-poppins overflow-x-hidden">

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
          <p className="text-[#3f3f5c] mb-8 text-sm sm:text-base">
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
        className="py-24 relative overflow-hidden bg-gradient-to-b from-[#E4EBFE] to-[#F8E5EB]"
      >
        <div className="container mx-auto px-6 sm:px-10 md:px-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.3em] text-violet-600 mb-4 block font-outfit"
            >
              Efficiency Redefined
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-black text-[#2F2F5B] mb-6 font-outfit"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Powerful Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Administrative Excellence</span>
            </motion.h2>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {tpoFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-white/60 ${feature.borderColor} border-opacity-30`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]`}></div>

                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-white/80 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2F2F5B] mb-4 font-outfit group-hover:text-violet-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#5C5C80] text-sm leading-relaxed font-outfit">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📘 About Section */}
      <section id="tpo-about" className="py-24 px-6 bg-gradient-to-b from-[#F8E5EB] to-[#E4EBFE]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white/30 backdrop-blur-2xl border border-white/60 p-12 md:p-16 rounded-[3rem] shadow-2xl text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

            <h2 className="text-4xl md:text-5xl font-black text-[#6B4ECF] mb-8 font-outfit">
              About TPO Portal
            </h2>
            <p className="text-[#5C5C80] text-lg md:text-xl leading-relaxed mb-8 font-outfit">
              The CareerNexus TPO portal is a transformation of the modern recruitment workflow. Built for Training & Placement Officers to simplify coordination, provide deep analytics, and create a seamless bridge between institutions and industry leaders.
            </p>
            <div className="flex flex-wrap justify-center gap-6 font-outfit">
              <div className="bg-white/60 px-6 py-3 rounded-full text-sm font-bold text-[#2F2F5B] shadow-sm border border-white/80">Efficient</div>
              <div className="bg-white/60 px-6 py-3 rounded-full text-sm font-bold text-[#2F2F5B] shadow-sm border border-white/80">Data-Driven</div>
              <div className="bg-white/60 px-6 py-3 rounded-full text-sm font-bold text-[#2F2F5B] shadow-sm border border-white/80">User-Centric</div>
            </div>
          </motion.div>
        </div>
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

      <NavbarTPO />
    </div>
  );
};

export default TPO;
