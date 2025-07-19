import React from "react";
import { motion } from "framer-motion";
import NavbarTpoDashboard from "../../components/NavbarTPODashboard"; 
import {
  FaUserGraduate,
  FaUserCheck,
  FaClipboardCheck,
  FaUniversity,
} from "react-icons/fa";

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
  return (
    <>
      <NavbarTpoDashboard />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] via-[#ECEAFE] to-[#D6E6FD] text-[#2C225A] font-poppins pt-24 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🌟 Welcome Section */}
        <section className="max-w-6xl mx-auto text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-[#2F2F5B] drop-shadow-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Welcome, TPO!
          </motion.h1>
          <motion.p
            className="mt-4 text-lg sm:text-xl text-[#4b436f] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Monitor placements, track student data, and collaborate with recruiters effortlessly.
          </motion.p>
        </section>

        {/* 📈 Stats Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 px-4">
          {studentStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-md border border-violet-200 shadow-xl rounded-2xl p-6 text-center"
            >
              <div className="text-violet-700 mb-3">{stat.icon}</div>
              <h2 className="text-3xl font-bold text-[#6B4ECF]">{stat.value}</h2>
              <p className="mt-2 text-sm text-[#2C225A] font-medium">{stat.title}</p>
            </motion.div>
          ))}
        </section>

        {/* 🏢 Recruiters Section */}
        <section className="max-w-6xl mx-auto mb-20 text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#6B4ECF] mb-8">
            Recent Recruiters
          </h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {recentRecruiters.map((recruiter, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-md border border-violet-200 px-5 py-3 rounded-xl shadow-md text-[#2C225A] font-semibold text-sm sm:text-base"
              >
                {recruiter}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 🏫 College Info Section */}
        <section className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-white/70 backdrop-blur-md border border-violet-300 p-6 rounded-2xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <FaUniversity className="text-violet-700 text-3xl" />
              <h3 className="text-xl font-semibold text-[#2F2F5B]">
                Your Institution
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#4b436f] leading-relaxed">
              Seamlessly manage campus placements, keep track of student achievements, and
              engage with top companies through one platform tailored for TPO needs.
            </p>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default TpoHome;
