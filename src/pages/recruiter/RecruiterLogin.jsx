import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTie,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const RecruiterLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST;
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token") && localStorage.getItem("role") == "recruiter") {
      toast.error("You are already logged in. Redirecting to Home...", { id: "already-logged-in" });
      return navigate(`/recruiter/${localStorage.getItem("userId")}/home`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) {
      toast.error("Please enter both user ID and password.", { id: "missing-fields" });
      return;
    }
    const payload = { userId: userId, password: password, role: "recruiter" };
    try {
      const response = await axios.post(`${backendUrl}:${backendPort}/auth/login`, payload);
      toast.success(`Login successful! ${response.data?.msg} `);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", "recruiter");
      navigate(`/recruiter/${userId}${response.data.router}`);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(`Login failed: ${error?.response?.data?.message}`);
    }
  };

  const inputClasses = "w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/80 border border-purple-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-16 font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 p-8 sm:p-10 rounded-[2rem] shadow-2xl relative"
      >
        <NavLink
          to="/recruiter"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/90 border border-purple-100/50 hover:border-purple-300 rounded-full text-gray-600 hover:text-purple-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group z-50"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back
        </NavLink>

        <div className="flex flex-col items-center mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-5 text-white shadow-xl shadow-purple-500/30 text-3xl"
          >
            <FaUserTie />
          </motion.div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Welcome Recruiter
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center font-medium">
            Sign in to <span className="text-purple-600 font-semibold">CareerNexus</span>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-4 top-[1.1rem] text-purple-400 text-lg" />
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-[1.1rem] text-purple-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[1.1rem] text-gray-400 hover:text-purple-600 cursor-pointer transition-colors text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 gap-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-all cursor-pointer" />
              <span className="font-medium group-hover:text-purple-600 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-all">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-4 text-lg"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div >
  );
};

export default RecruiterLogin;
