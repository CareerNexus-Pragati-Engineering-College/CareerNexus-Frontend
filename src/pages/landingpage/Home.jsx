import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight } from "react-icons/fa";
import NavbarLanding from "../../components/NavbarLanding";

const features = [
  {
    title: "Smart Tracker",
    img: "/images/features/tracker.jpg",
    desc: "Easily track your placement applications, statuses, and deadlines.",
  },
  {
    title: "Analytics Dashboard",
    img: "/images/features/analytics.jpg",
    desc: "Visualize your placement progress with charts and insights.",
  },
  {
    title: "Notifications",
    img: "/images/features/notifications.jpg",
    desc: "Get alerts for interviews, deadlines, and important updates.",
  },
  {
    title: "To-Do Manager",
    img: "/images/features/todo.jpg",
    desc: "Organize tasks, set goals, and stay on top of your placement prep.",
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#2F2F5B]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
            >
              Transform Your Future
            </motion.h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-[#B497FF] drop-shadow-md">
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

            <p className="text-[#5C5C80] mb-8 text-sm sm:text-base md:text-lg">
              CareerNexus helps you manage applications, deadlines, analytics, and tasks — all in one place.
            </p>

            <ScrollLink
              to="features"
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
      <section id="features" className="py-20 bg-gradient-to-br from-[#F8E5EB] to-[#E4EBFE]">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <motion.h2
            className="text-4xl font-bold text-center text-[#6B4ECF] mb-16 font-orbitron"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h2>

          <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(122,93,227,0.4)] group cursor-pointer"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg mb-5 shadow-md group-hover:shadow-violet-400/30 transition"
                />
                <h3 className="text-2xl font-semibold text-[#6B4ECF] group-hover:text-[#5A3ABD] mb-2 transition-all font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-[#4E4376] group-hover:text-[#3c3263] transition text-sm sm:text-base">
                  {feature.desc}
                </p>
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
            <h2 className="text-4xl font-bold text-[#6B4ECF] mb-4 font-orbitron">About CareerNexus</h2>
            <p className="text-[#4E4376] leading-relaxed text-sm sm:text-base">
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
            <h2 className="text-4xl font-bold text-[#6B4ECF] mb-8 font-orbitron">Contact Us</h2>

            <div className="bg-white/30 border border-violet-300/40 rounded-xl backdrop-blur-lg shadow-xl p-6 sm:p-8 space-y-4 transition-all">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-3 bg-white/60 text-[#4E4376] placeholder-gray-500 rounded-md border border-violet-200 focus:ring-2 focus:ring-violet-400 focus:outline-none"
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
  <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2">
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
