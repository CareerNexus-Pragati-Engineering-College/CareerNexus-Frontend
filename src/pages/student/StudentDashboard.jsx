// src/pages/student/StudentHome.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import getUserId from "../../services/getUserId"; // Function to get user ID
import requestApi from "../../services/request";




const trackerStats = [
  { title: "Companies Applied", value: 12 },
  { title: "Interviews Attended", value: 5 },
  { title: "Offers Received", value: 2 },
];

const placementNews = [
  "Google to visit campus on July 10",
  "Microsoft offers 5 new roles",
  "Accenture conducting virtual drive",
  "Infosys interview results declared",
  "Tech Mahindra recruitment in process",
];


const StudentHome = () => {
  const Companies = [
  { userId: 1, company: "Google", img_loc: "/images/google.png" },
  { userId: 2, company: "Microsoft", img_loc: "/images/microsoft.png" },
  { userId: 3, company: "Amazon", img_loc: "/images/amazon.png" },
  { userId: 4, company: "Infosys", img_loc: "/images/infosys.png" },
  { userId: 5, company: "TCS", img_loc: "/images/tcs.png" },
  { userId: 6, company: "Wipro", img_loc: "/images/wipro.png" },
  { userId: 7, company: "Accenture", img_loc: "/images/accenture.png" },
  { userId: 8, company: "HCL", img_loc: "/images/hcl.png" },
  { userId: 9, company: "Tech Mahindra", img_loc: "/images/techmahindra.png" },
];
 const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT 
  const scrollRef = useRef(null);
  const [visitedCompanies, setVisitedCompanies] = useState([]);
  const scrollAmount = 220; // Adjust this for the scroll jump per click

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

useEffect(() => {
   const data= requestApi.get(`/student/companies-visited`);
  data.then((response) => {
      const companies = response.data;
      console.log(companies);
      setVisitedCompanies(companies || Companies);
    });
    


  }, []);

  return (
    <>
      <NavbarStudentDashboard />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] text-[#2C225A] font-poppins flex flex-col items-center px-4 sm:px-6 pt-24 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✨ Hero Section */}
        <section className="w-full max-w-7xl min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex-1 text-left max-w-2xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2F2F5B] mb-4 drop-shadow-md tracking-wide leading-tight">
              Welcome to Your Dashboard, {getUserId()}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#4b436f] mb-4 leading-relaxed max-w-xl">
              Explore exciting career opportunities, connect with top companies, and take the next step toward your future — all in one place.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#8c73cc] font-medium drop-shadow-md mt-2">
              Let’s begin your success story!
            </p>
          </motion.div>

          {/* Right column - Job listings */}
          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-violet-200/50 shadow-xl text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">Apply for Jobs</h2>
              <p className="text-sm sm:text-base text-[#4b436f] mb-5">Browse the latest openings & apply instantly.</p>
              <div className="space-y-2 mb-4 text-left">
                {[
                  { company: "Google", role: "Frontend Engineer" },
                  { company: "Microsoft", role: "Full-Stack Developer" },
                  { company: "Amazon", role: "Cloud Engineer" },
                  { company: "Infosys", role: "Software Trainee" },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/60 border border-violet-100 p-2 rounded-lg shadow-sm hover:bg-white/80 transition"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#2C225A]">{job.role}</h3>
                      <span className="text-xs sm:text-sm text-violet-500 font-medium">{job.company}</span>
                    </div>
                    <button className="px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-md hover:scale-105 transition">
                      Apply
                    </button>
                  </div>
                ))}
              </div>
              
              
            </div>
          </motion.div>
        </section>

        {/* 🏢 Companies Visited Section */}
        <section className="relative w-full max-w-7xl mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#6B4ECF] mb-10 text-center drop-shadow-md">Companies Visited</h2>

          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaChevronLeft className="text-[#6B4ECF] w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaChevronRight className="text-[#6B4ECF] w-5 h-5" />
          </button>

          {/* Companies list */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-4"
          >
            {visitedCompanies.map((company) => (
              <Link
                key={company.userId}
                to={`/student/company/${company.userId}`}
                className="bg-white/60 border border-violet-200/40 backdrop-blur-xl p-5 sm:p-7 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[180px] transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] hover:bg-white/80 cursor-pointer"
              >
                <img
                  src={`${backendUrl}:${backendPort}/uploads/images${ company.img_loc}`|| company.img_loc}
                  alt={"Company Logo"}
                  className="h-20 w-20 sm:h-24 sm:w-24 mb-3 sm:mb-4 object-contain drop-shadow-sm"
                />
                <span className="text-base sm:text-lg font-medium text-[#2C225A] text-center">{company.company}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 📊 Progress Tracker */}
        <section className="w-full max-w-6xl mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">Progress Tracker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trackerStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/50 border border-violet-200/50 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-2xl sm:text-3xl font-bold text-[#6B4ECF]">{stat.value}</span>
                <p className="text-xs sm:text-sm text-[#2C225A] mt-2">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 📰 Latest Placement News */}
        <section className="w-full max-w-6xl mb-16 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#6B4ECF] mb-6 text-center">Latest Placement News</h2>
          <motion.div className="flex gap-4 sm:gap-8 animate-marquee">
            {placementNews.concat(placementNews).map((news, index) => (
              <div
                key={index}
                className="bg-white/60 border border-violet-200/40 rounded-xl shadow-md p-3 sm:p-4 min-w-[200px] sm:min-w-[250px] whitespace-nowrap text-center text-xs sm:text-base text-[#2C225A] font-medium"
              >
                {news}
              </div>
            ))}
          </motion.div>
        </section>
      </motion.div>
    </>
    
  );
};

export default StudentHome;
