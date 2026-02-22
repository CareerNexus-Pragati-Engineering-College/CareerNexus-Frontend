import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserGraduate,
  FaUser,
  FaGoogle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_APP_BACKEND_HOST;
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) {
      toast.error("You are already logged in. Redirecting to Home...");
      return navigate(`/student/${localStorage.getItem("userId")}/home`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendUrl}:${backendPort}/auth/student/register`, {
        userId: rollNo,
        email,
        password,
      });

      toast.success("Registration Successful redirect to login ..");
      navigate("/student/login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Signup Error:", error);
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
        {/* 🔙 Back Button */}
        <NavLink
          to="/student"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/90 border border-purple-100/50 hover:border-purple-300 rounded-full text-gray-600 hover:text-purple-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group z-50"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back
        </NavLink>

        {/* 👤 Icon & Title */}
        <div className="flex flex-col items-center mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-5 text-white shadow-xl shadow-purple-500/30 text-3xl"
          >
            <FaUserGraduate />
          </motion.div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Join CareerNexus
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center font-medium">
            Create your student account
          </p>
        </div>

        {/* 📄 Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          <div className="relative">
            <FaUser className="absolute left-4 top-[1.1rem] text-purple-400 text-lg" />
            <input
              type="text"
              placeholder="Roll Number (User ID)"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-[1.1rem] text-purple-400 text-lg" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-[1.1rem] text-purple-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6 text-lg"
          >
            Create Account
          </motion.button>

          <div className="flex items-center gap-4 text-gray-400 text-sm mt-4 font-medium">
            <div className="flex-grow border-t border-gray-200" />
            or
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 py-3.5 rounded-xl transition-all text-gray-700 font-semibold shadow-sm"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Sign up with Google
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-6 font-medium">
            Already have an account?{" "}
            <NavLink
              to="/student/login"
              className="text-purple-600 font-bold hover:underline"
            >
              Log in
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentSignup;
