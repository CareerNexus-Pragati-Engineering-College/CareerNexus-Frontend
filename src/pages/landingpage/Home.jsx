import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight, FaChartLine, FaChartPie, FaBell, FaTasks } from "react-icons/fa";
import NavbarLanding from "../../components/NavbarLanding";

const features = [
  {
    title: "Smart Placement Tracker",
    icon: <FaChartLine className="text-4xl text-blue-500" />,
    desc: "Seamlessly monitor your application status across multiple companies. Stay updated on every stage from recruitment to onboarding.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-blue-400",
  },
  {
    title: "Insightful Analytics",
    icon: <FaChartPie className="text-4xl text-purple-500" />,
    desc: "Gain deep insights into your performance with interactive charts and metrics. Identify strengths and areas for improvement.",
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-400",
  },
  {
    title: "Real-time Notifications",
    icon: <FaBell className="text-4xl text-amber-500" />,
    desc: "Never miss a deadline or interview. Get instant alerts for upcoming events and important placement updates directly.",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "group-hover:border-amber-400",
  },
  {
    title: "Intelligent Task Manager",
    icon: <FaTasks className="text-4xl text-emerald-500" />,
    desc: "Organize your preparation with a dedicated to-do manager. Set goals, track progress, and stay productive every day.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-400",
  },
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-[#4A4A7B] bg-soft-glow scroll-smooth overflow-x-hidden">
      <NavbarLanding />

      {/* 🏠 Landing Section */}
      <section id="home" className="min-h-screen pt-28 flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#2F2F5B] font-outfit"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
            >
              Transform Your Future
            </motion.h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-[#B497FF] drop-shadow-md font-outfit">
              <Typewriter
                options={{
                  strings: [
                    "Track your placement journey",
                    "Stay organized and ahead",
                    "Ace every opportunity",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="text-[#5C5C80] mb-8 text-sm sm:text-base md:text-lg font-outfit">
              CareerNexus helps you manage applications, deadlines, analytics, and tasks — all in one place.
            </p>

            <ScrollLink
              to="features"
              smooth={true}
              duration={600}
              offset={-70}
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full
              bg-gradient-to-r from-[#b892ff] to-[#411686] font-outfit
              shadow-[0_0_5px_#b892ff] hover:shadow-[0_0_10px_#b892ff,0_0_20px_#411686]
              transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              Get Started
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                <FaArrowRight />
              </span>
            </ScrollLink>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl overflow-hidden border border-[#cbbfff] shadow-[0_0_20px_rgba(180,150,255,0.2)] transition-transform duration-300 hover:shadow-[0_0_35px_rgba(180,150,255,0.4)] hover:scale-[1.03]">
              <img
                src="/images/landing.jpeg"
                alt="Landing"
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl transition duration-300 hover:brightness-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 block font-outfit"
            >
              Why Choose CareerNexus?
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-[#2F2F5B] mb-6 font-outfit"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Powerful Features for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dream Career</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#5C5C80] text-lg font-outfit"
            >
              Everything you need to streamline your placement journey, all in one intuitive platform designed for student success.
            </motion.p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.15)] ${feature.borderColor} hover:border-opacity-50`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-white transition-colors duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2F2F5B] mb-4 font-outfit group-hover:text-indigo-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#5C5C80] leading-relaxed font-outfit text-sm">
                    {feature.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💼 About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE]">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-[#6B4ECF] mb-4 font-outfit">About CareerNexus</h2>
            <p className="text-[#4E4376] leading-relaxed text-sm sm:text-base font-outfit">
              CareerNexus is your all-in-one placement preparation tool — helping you manage
              applications, deadlines, analytics, and tasks with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 📬 Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE]">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-[#6B4ECF] mb-8 font-outfit">Contact Us</h2>

            <div className="bg-white/30 border border-violet-300/40 rounded-xl backdrop-blur-lg shadow-xl p-6 sm:p-8 space-y-4 transition-all">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none font-outfit"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none font-outfit"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none font-outfit"
                ></textarea>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#b892ff] to-[#411686] shadow-[0_0_5px_#b892ff] hover:shadow-[0_0_10px_#b892ff,0_0_20px_#411686] transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📍 Footer */}
      <footer className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
          <p className="text-sm sm:text-base opacity-90">
            &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
          </p>
          <p className="text-xs opacity-60">
            Your one-stop placement tracker
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
