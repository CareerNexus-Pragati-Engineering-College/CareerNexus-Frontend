import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import companiesData from "./Companies";

const CompanyDetails = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();
  const company = companiesData.find((c) => c.id === id);
  const [selectedExperience, setSelectedExperience] = useState(null);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-500 p-4">
        <h2 className="text-xl font-medium">Company not found</h2>
        <button
          onClick={() => navigate(`/student/${userId}/home`)}
          className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-full"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <NavbarStudentDashboard />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins flex flex-col px-4 sm:px-6 pt-24 pb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >


        {/* Back Button */}
        <div className="max-w-7xl mx-auto w-full flex justify-start mb-6">
          <button
            onClick={() => navigate(`/student/${userId}/home`)}
            className="px-5 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-full shadow-md hover:scale-105 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full mx-auto">
          {/* Left Column */}
          <div className="lg:w-1/3 bg-white/60 border border-violet-200/50 p-6 rounded-2xl shadow-md text-center">
            <img
              src={company.logo}
              alt={company.name}
              className="h-24 w-24 mx-auto mb-2 object-contain"
            />
            <h1 className="text-2xl font-bold text-[#6B4ECF] mb-2">
              {company.name}
            </h1>
            <p className="text-sm mb-4 leading-relaxed">{company.description}</p>
            <h2 className="text-xl font-semibold text-violet-600 mb-2">Job Details</h2>
            <p className="text-sm whitespace-pre-line">{company.jobDetails}</p>
          </div>

          {/* Right Column */}
          <div className="lg:w-2/3 relative bg-white/70 border border-violet-200/50 p-6 rounded-2xl shadow-xl flex flex-col items-center min-h-[480px] overflow-hidden">
            <h2 className="text-xl font-semibold text-violet-600 mb-6 text-center">
              Interview Experiences
            </h2>

            <Swiper
              modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
              effect="coverflow"
              centeredSlides
              slidesPerView="auto"
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              navigation
              coverflowEffect={{
                rotate: 0,
                stretch: -50,
                depth: 500,
                modifier: 1.5,
                slideShadows: false,
              }}
              className="w-full max-w-5xl"
            >
              {company.experiences.map((exp) => (
                <SwiperSlide
                  key={exp.id}
                  style={{ width: "200px" }}
                  className="relative flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setSelectedExperience(exp)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200/60 shadow-xl p-4 rounded-2xl flex flex-col items-center w-52 h-72 opacity-90 transition"
                  >
                    <img
                      src="/images/profile.png"
                      className="h-20 w-20 mb-3 rounded-lg"
                      alt="Profile"
                    />
                    <h3 className="text-md font-medium text-center mb-2 text-[#2C225A]">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-center text-[#4b436f] line-clamp-2 px-1">
                      {exp.details}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <AnimatePresence>
              {selectedExperience && (
                <motion.div
                  key="modal"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 py-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="relative max-w-3xl w-full bg-white/80 backdrop-blur-lg border border-violet-200 rounded-3xl shadow-2xl p-6 sm:p-10 overflow-y-auto max-h-[90vh] no-scrollbar">

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedExperience(null)}
                      className="absolute top-4 right-4 text-violet-600 hover:text-pink-500 text-2xl font-bold transition"
                    >
                      ✕
                    </button>

                    {/* Profile Avatar with Glow */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-300 via-violet-400 to-indigo-300 blur-xl opacity-50"></div>
                        <img
                          src={selectedExperience.profilePic || "/images/profile.png"}
                          alt={selectedExperience.title}
                          className="relative h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#2C225A] mb-4">
                      {selectedExperience.title}
                    </h2>

                    {/* Details */}
                    <p className="text-sm sm:text-base leading-relaxed text-[#3D345B] text-justify whitespace-pre-line">
                      {selectedExperience.details}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


          </div>
        </div>
      </motion.div>

      {/* 📍 Footer */}
      <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">Your one-stop placement tracker</p>
        </div>
      </footer>
    </>
  );
};

export default CompanyDetails;
