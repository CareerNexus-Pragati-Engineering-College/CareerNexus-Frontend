import React from "react";
import { motion } from "framer-motion";
import NavbarTpoDashboard from "../../components/NavbarTPODashboard";
import {
  FaUserGraduate,
  FaUserCheck,
  FaClipboardCheck,
  FaUniversity,
} from "react-icons/fa";
import getUserId from "../../services/getUserId";

const studentStats = [
  { title: "Students Registered", value: 450, icon: <FaUserGraduate size={30} /> },
  { title: "Placed Students", value: 120, icon: <FaUserCheck size={30} /> },
  { title: "Interviews Scheduled", value: 200, icon: <FaClipboardCheck size={30} /> },
];

const recentRecruiters = [
  "TCS",
  "Infosys",
  "Google",
  "Amazon",
  "Wipro",
  "Adobe",
  "Capgemini",
];
const TpoHome = () => {
  const userId = getUserId();

  return (
    <>
      <NavbarTpoDashboard />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] via-[#ECEAFE] to-[#D6E6FD] text-[#2C225A] font-outfit pt-28 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 🌟 Welcome Section */}
        <section className="max-w-6xl mx-auto text-center mb-16 px-6">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="bg-violet-100 text-violet-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm border border-violet-200">
              Dashboard Overview
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#2F2F5B] tracking-tight mb-4 font-outfit">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{userId || 'TPO'}!</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#5C5C80] max-w-2xl mx-auto font-outfit leading-relaxed">
              Monitor placements, track student data, and collaborate with recruiters effortlessly through your central command center.
            </p>
          </motion.div>
        </section>

        {/* 📈 Stats Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 px-4">
          {studentStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 text-center transition-shadow duration-300 hover:shadow-[0_20px_50px_-10px_rgba(130,90,255,0.2)]"
            >
              {/* Optional background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="text-violet-600 p-4 bg-white rounded-2xl shadow-sm border border-violet-50 group-hover:scale-110 group-hover:bg-violet-50 transition-all duration-300 mb-4">
                  {stat.icon}
                </div>
                <h2 className="text-4xl font-extrabold text-[#2F2F5B] font-outfit">{stat.value}</h2>
                <p className="mt-2 text-sm text-[#5C5C80] font-semibold uppercase tracking-wider font-outfit">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 🏢 Recruiters Section */}
        <section className="max-w-6xl mx-auto mb-20 text-center px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-extrabold text-[#2F2F5B] mb-10 font-outfit"
          >
            Recent <span className="text-violet-600">Recruiters</span>
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {recentRecruiters.map((recruiter, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/50 backdrop-blur-md border border-white/60 px-8 py-4 rounded-2xl shadow-sm text-[#2F2F5B] font-bold text-sm sm:text-lg hover:bg-white hover:shadow-md hover:border-violet-200 transition-all duration-300 cursor-pointer font-outfit"
              >
                {recruiter}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 🏫 College Info Section */}
        <section className="max-w-4xl mx-auto px-4">
          <motion.div
            className="group bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[2.5rem] shadow-xl text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-violet-100">
                  <FaUniversity className="text-violet-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-[#2F2F5B] font-outfit">
                  Your Institution
                </h3>
              </div>
              <p className="text-lg text-[#5C5C80] leading-relaxed font-outfit max-w-2xl mx-auto">
                Seamlessly manage campus placements, keep track of student achievements, and
                engage with top companies through one platform tailored for TPO needs.
              </p>
            </div>
          </motion.div>
        </section>
      </motion.div>

    </>
  );
};

export default TpoHome;
