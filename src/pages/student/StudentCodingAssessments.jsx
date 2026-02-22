import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import requestApi from "../../services/request";
import { FaCode, FaCalendarAlt, FaClock, FaChevronRight } from "react-icons/fa";

const StudentCodingAssessments = () => {
  const { userId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await requestApi.get("/coding-exam/all");
        setAssessments(res.data);
      } catch (err) {
        console.error("Failed to fetch assessments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E5EB] via-[#ECEAFE] to-[#D6E6FD] text-[#2C225A] font-poppins">
      <NavbarStudentDashboard />
      <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold text-[#2F2F5B] mb-2 tracking-tight">Coding Assessments</h1>
          <p className="text-[#5C5C80] text-lg">Participate in challenges and test your skills.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        ) : assessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessments.map((test, index) => {
              const startTime = new Date(test.startTime);
              const endTime = new Date(test.endTime);
              const now = new Date();
              const isActive = now >= startTime && now <= endTime;
              const isExpired = now > endTime;
              const isFuture = now < startTime;

              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 flex flex-col hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {isActive ? (
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Live
                      </span>
                    ) : isFuture ? (
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Upcoming</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">Ended</span>
                    )}
                  </div>

                  <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform shadow-sm">
                    🚀
                  </div>

                  <h3 className="text-xl font-bold text-[#2F2F5B] mb-2">{test.assessmentName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="text-violet-500" />
                    {startTime.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-mono bg-gray-50 p-2 rounded-lg">
                    <FaClock className="text-violet-500" />
                    {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>

                  <div className="mt-auto">
                    {isActive ? (
                      <Link
                        to={`/student/${userId}/coding-assessment/${test.id}`}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 transition"
                      >
                        Start Assessment <FaChevronRight />
                      </Link>
                    ) : isFuture ? (
                      <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-xl cursor-not-allowed">
                        Waiting to Start
                      </button>
                    ) : (
                      <button disabled className="w-full bg-gray-100 text-gray-300 font-bold py-3 rounded-xl cursor-not-allowed">
                        Assessment Closed
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-16 text-center border border-dashed border-gray-300">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-[#2F2F5B] mb-2">No Active Assessments</h2>
            <p className="text-gray-500">There are no coding tests scheduled at the moment. Keep practicing!</p>
          </div>
        )}
      </div>

      {/* 📍 Footer */}
      <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
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

export default StudentCodingAssessments;
