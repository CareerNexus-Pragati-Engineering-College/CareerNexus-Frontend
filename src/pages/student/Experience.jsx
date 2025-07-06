import React, { useRef, useEffect } from "react";
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

const Experience = ({ experiences, selectedExperience, setSelectedExperience }) => {
  const swiperRef = useRef(null);

  // Pause Swiper autoplay when modal is open
  useEffect(() => {
    if (swiperRef.current?.autoplay) {
      if (selectedExperience) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  }, [selectedExperience]);

  return (
    <div className="lg:w-2/3 relative bg-white/60 border border-violet-200/50 p-6 rounded-2xl shadow-xl flex flex-col items-center min-h-[450px] overflow-hidden">
      <AnimatePresence>
        {selectedExperience ? (
          <motion.div
            key={selectedExperience.id}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xl z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-violet-300/50 shadow-lg w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 text-[#6B4ECF] text-2xl font-bold hover:text-violet-700 transition"
              >
                ✕
              </button>

              <div className="relative mb-6 flex justify-center">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#d5c8f5] to-[#f4c9e5] opacity-70 blur-lg" />
                <img
                  src={selectedExperience.profilePic || "/images/profile.png"}
                  alt={selectedExperience.title}
                  className="relative h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
                />
              </div>

              <h2 className="text-center text-2xl font-bold text-[#2C225A] mb-2 after:content-[''] after:block after:w-24 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-[#bfa8f0] after:to-[#e8b1cf] after:mt-2 after:mx-auto">
                {selectedExperience.title}
              </h2>

              <p className="text-center text-sm sm:text-base leading-relaxed text-[#4b436f] mt-4 px-4">
                {selectedExperience.details}
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-violet-600 mb-6 text-center">
              Interview Experiences
            </h2>

            <Swiper
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
  effect="coverflow"
  centeredSlides
  slidesPerView="auto"
  loop={false}  // ✅ Disable looping to maintain exact order
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  keyboard={{ enabled: true }}
  navigation
  coverflowEffect={{
    rotate: 0,
    stretch: -60,
    depth: 500,
    modifier: 1.5,
    slideShadows: false,
  }}
  className="w-full max-w-4xl"
>

              {experiences.map((exp, index) => (
                <SwiperSlide
                  key={exp.id}
                  style={{ width: "180px" }}
                  className="relative flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setSelectedExperience(exp)}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200/60 shadow-xl p-4 rounded-2xl flex flex-col items-center w-48 h-64 opacity-90 transition"
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
