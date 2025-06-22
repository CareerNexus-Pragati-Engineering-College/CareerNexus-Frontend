import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserGraduate,
} from "react-icons/fa";
import { motion } from "framer-motion";

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6d6f9] via-[#f5d0e5] to-[#fbe5ff] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-violet-300/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(165,100,255,0.2)] text-[#2a104d] relative"
      >
        {/* 🔙 Back Button */}
        <NavLink
          to="/student"
          className="absolute top-4 left-4 flex items-center gap-2 text-violet-600 hover:text-indigo-700 text-sm transition-all"
        >
          <FaArrowLeft />
          Back
        </NavLink>

        {/* 👤 Icon & Title */}
        <div className="flex flex-col items-center mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-400 rounded-full flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(165,100,255,0.4)] text-2xl"
          >
            <FaUserGraduate />
          </motion.div>
          <h2 className="text-3xl font-poppins font-bold text-center text-violet-700">
            Welcome Back
          </h2>
          <p className="text-sm text-violet-800 mt-1 text-center">
            Sign in to <span className="font-semibold">CareerNexus</span>
          </p>
        </div>

        {/* 📄 Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-violet-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/70 border border-violet-200 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-violet-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-md bg-white/70 border border-violet-200 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-violet-500 hover:text-violet-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-violet-600 gap-2 pl-1">
            <label className="flex items-center gap-2 pl-[1px]">
              <input type="checkbox" className="accent-violet-500" />
              <span className="font-poppins">Remember me</span>
            </label>
            <a href="#" className="hover:underline text-violet-500 font-poppins">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-pink-500 hover:to-violet-500 text-white py-2 rounded-md font-semibold shadow-[0_0_20px_rgba(165,100,255,0.5)] hover:shadow-[0_0_30px_rgba(165,100,255,0.7)] transition-all duration-300"
          >
            Sign In →
          </motion.button>

          <div className="flex items-center gap-4 text-violet-500 text-sm mt-2">
            <div className="flex-grow border-t border-violet-300" />
            or
            <div className="flex-grow border-t border-violet-300" />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white/60 hover:bg-white/80 border border-white/30 py-2 rounded-md transition text-violet-700"
          >
            <FaGoogle />
            Sign in with Google
          </motion.button>

          <p className="text-center text-sm text-violet-700 mt-4 font-poppins">
            Don’t have an account?{" "}
            <NavLink
              to="/student/signup"
              className="text-violet-600 font-medium hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
