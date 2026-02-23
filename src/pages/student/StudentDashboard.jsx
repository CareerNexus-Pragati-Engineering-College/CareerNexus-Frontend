// src/pages/student/StudentHome.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavbarStudentDashboard from "../../components/NavbarStudentDashboard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserId from "../../services/getUserId"; // Function to get user ID
import requestApi from "../../services/request";




const trackerStats = [
  { title: "Companies Applied", value: 12, icon: "🎯", color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Interviews Attended", value: 5, icon: "🗣️", color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Offers Received", value: 2, icon: "🏆", color: "text-emerald-500", bg: "bg-emerald-50" },
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
  const { userId } = useParams(); // Get the URL parameter
  const scrollRef = useRef(null);
  const [visitedCompanies, setVisitedCompanies] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [recentApplications, setRecentApplications] = useState([]);
  const scrollAmount = 220; // Adjust this for the scroll jump per click

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch visited companies
    requestApi.get(`/student/companies-visited`)
      .then((response) => {
        setVisitedCompanies(response.data || Companies);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setVisitedCompanies(Companies);
      });

    // ✅ Fetch latest trending jobs
    requestApi.get(`/jobs/latest`)
      .then((response) => {
        console.log("Trending Jobs:", response.data);
        setTrendingJobs(response.data);
        setLoadingJobs(false);
      })
      .catch((error) => {
        console.error("Error fetching latest jobs:", error);
        setLoadingJobs(false);
      });

  }, []);


    // ✅ Fetch recent applications
    requestApi.get(`/applications/my-applications`)
     .then((res) => {
       if (Array.isArray(res.data)) {
          const sorted = res.data
           .sort((a, b) =>
             new Date(b.applicationDate) - new Date(a.applicationDate)
           )
            .slice(0, 3); // only latest 3
         
         setRecentApplications(sorted);
       }
     })
     .catch((error) => {
       console.error("Error fetching applications:", error);
     });

}, []);





  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE] font-poppins">
      <NavbarStudentDashboard />

      <motion.div
        className="flex-grow text-[#2C225A] flex flex-col items-center px-4 sm:px-6 pt-24 pb-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✨ Hero Section */}
        <section className="relative w-full max-w-7xl min-h-[60vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-16 px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            className="flex-1 text-left max-w-3xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {/* Descriptive Pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-violet-200 shadow-sm mb-6 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-violet-700 tracking-wide">Student Portal Active</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-[#2F2F5B]">Welcome back,</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 drop-shadow-sm">
                {getUserId()}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4b436f] mb-8 leading-relaxed max-w-2xl font-light">
              Explore exciting career opportunities, connect with top companies, and take the next step toward your future — all in one seamless experience.
            </p>

            <motion.p
              className="text-xl sm:text-2xl text-violet-700 font-semibold flex items-center gap-3 drop-shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              🚀 Let’s begin your success story!
            </motion.p>
          </motion.div>

          {/* Right column - Job listings */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(107,78,207,0.15)] overflow-hidden">
              {/* Decorative background blobs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

              <div className="relative z-10 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-[#2C225A]">Trending Roles</h2>
                  <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">New</span>
                </div>
                <p className="text-sm text-[#4b436f] mb-6">Browse the latest openings & apply instantly.</p>

                <div className="space-y-3">
                  {loadingJobs ? (
                    <p className="text-sm text-gray-500">Loading latest jobs...</p>
                  ) : trendingJobs.length > 0 ? (
                    trendingJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group flex items-center justify-between bg-white/80 border border-violet-100/50 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-violet-300 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-violet-50 rounded-lg text-xl group-hover:bg-violet-100 transition-colors shadow-sm">
                            💼
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#2C225A]">
                              {job.jobTitle}
                            </h3>
                            <span className="text-xs sm:text-sm text-violet-600 font-medium">
                              {job.companyName}
                            </span>
                            <p className="text-xs text-gray-500">
                              📍 {job.locations} • 💰 {job.salaryPackage}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/student/${userId}/apply-jobs?jobId=${job.id}&apply=true`}
                          className="px-4 py-1.5 bg-gradient-to-r from-violet-600 hover:from-violet-700 to-indigo-600 hover:to-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Apply
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No latest jobs available right now.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 🏢 Companies Visited Section */}
        <section className="relative w-full max-w-7xl mb-20 px-4">
          <div className="flex flex-col items-center mb-10">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Campus Drives</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F2F5B] text-center drop-shadow-sm">Companies Visited</h2>
          </div>

          {visitedCompanies && visitedCompanies.length > 0 ? (
            <div className="relative">
              {/* Scroll Buttons - Only show if there are enough items to scroll */}
              {visitedCompanies.length > 4 && (
                <>
                  <button
                    onClick={scrollLeft}
                    className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur border border-violet-100 p-3 rounded-full shadow-[0_4px_12px_rgba(107,78,207,0.15)] hover:scale-110 hover:bg-violet-50 transition-all duration-300 group"
                  >
                    <FaChevronLeft className="text-violet-600 w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur border border-violet-100 p-3 rounded-full shadow-[0_4px_12px_rgba(107,78,207,0.15)] hover:scale-110 hover:bg-violet-50 transition-all duration-300 group"
                  >
                    <FaChevronRight className="text-violet-600 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </>
              )}

              {/* Companies list */}
              <div
                ref={scrollRef}
                className={`flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-6 ${visitedCompanies.length < 4 ? 'justify-center sm:justify-start' : ''}`}
              >
                {visitedCompanies.map((company, index) => (
                  <motion.div
                    key={company.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div
                      className="group bg-white/70 border border-violet-100 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(107,78,207,0.08)] flex flex-col items-center justify-center min-w-[200px] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(107,78,207,0.2)] hover:bg-white relative overflow-hidden"
                    >
                      {/* Decorative gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/5 group-hover:to-indigo-500/5 transition-colors duration-300"></div>

                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 mb-4 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <img
                          src={company.img_loc?.startsWith('/') ? `${backendUrl}:${backendPort}/uploads/images${company.img_loc}` : company.img_loc}
                          alt={`${company.company} Logo`}
                          className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm"
                          onError={(e) => { e.target.src = '/images/default-company.png'; e.target.onerror = null; }}
                        />
                      </div>
                      <span className="text-lg font-bold text-[#2C225A] text-center group-hover:text-violet-700 transition-colors">{company.company}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Dynamically padding with placeholder cards if we have fewer than 4 companies */}
                {Array.from({ length: Math.max(0, 4 - visitedCompanies.length) }).map((_, i) => (
                  <motion.div
                    key={`placeholder-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (visitedCompanies.length + i) * 0.1, duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div className="bg-white/40 border border-dashed border-violet-200/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center min-w-[200px] h-full transform transition-all duration-300 relative overflow-hidden">
                      <div className="bg-violet-50/50 p-4 rounded-2xl border border-violet-100/50 mb-4 flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 opacity-70">
                        <span className="text-3xl opacity-60">⏳</span>
                      </div>
                      <span className="text-sm font-semibold text-violet-400 text-center tracking-wide">More Companies<br />Visiting Soon</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              className="w-full bg-white/50 backdrop-blur-xl border border-violet-100 rounded-3xl p-10 sm:p-16 flex flex-col items-center justify-center shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl text-violet-500">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-[#2F2F5B] mb-3">No Companies Visited Yet</h3>
              <p className="text-[#4b436f] max-w-md text-lg">
                Stay tuned! Top recruiters will start visiting soon. Keep preparing and updating your profile to grab the best opportunities.
              </p>
            </motion.div>
          )}
        </section>

        {/* 📊 Progress Tracker */}
        <section className="relative w-full max-w-7xl mb-16 px-4">
          <div className="flex flex-col items-center mb-10">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Your Journey</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F2F5B] text-center drop-shadow-sm">Progress Tracker</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {trackerStats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative bg-white/70 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(107,78,207,0.06)] flex flex-col items-center text-center group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Decorative background circle */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out z-0`}></div>

                <div className={`relative z-10 w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:rotate-12 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <span className={`text-4xl sm:text-5xl font-black ${stat.color} tracking-tight mb-2 drop-shadow-sm`}>
                    {stat.value}
                  </span>
                  <p className="text-sm sm:text-base font-medium text-[#4b436f] tracking-wide">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* � Recent Applications (Simple List View) */}
        <section className="relative w-full max-w-7xl mb-16 px-4">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Application Track</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F2F5B] text-center drop-shadow-sm">Recent Applications</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentApplications.length > 0 ? (
  recentApplications.map((app, index) => {
    const locations = JSON.parse(app.jobPost.locations || "[]") || [];

    return (
      <motion.div
        key={index}
        className="bg-white/70 backdrop-blur-xl border border-white/60 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-[0_4px_20px_rgba(107,78,207,0.04)] hover:shadow-[0_8px_30px_rgba(107,78,207,0.1)] transition-all duration-300 gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index }}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm text-2xl text-blue-500">
            🏢
          </div>
          <div>
            <h3 className="font-extrabold text-[#2C225A] text-lg sm:text-xl">
              {app.jobPost.jobTitle}
            </h3>
            <p className="text-sm font-medium text-[#4b436f] mt-0.5">
              {app.jobPost.companyName} •{" "}
              <span className="text-gray-400">
                Applied on {new Date(app.applicationDate).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div>
          <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold ${
            app.status === "ACCEPTED"
              ? "bg-green-100 text-green-700"
              : app.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {app.status}
          </span>
                  </div>
               </motion.div>
              );
           })
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No recent applications.
           </p>
          )}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to={`/student/${userId}/applications`}
              className="text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors flex items-center gap-1"
            >
              View All Applications <FaChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      </motion.div>

      {/* 📍 Footer */}
      <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8">
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

export default StudentHome;
