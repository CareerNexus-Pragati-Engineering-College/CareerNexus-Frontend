import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaKey } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const StudentForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { id: "password-mismatch" });
      return;
    }

    // sardaagaaa Send request to backend to verify OTP & reset password 

    toast.success("Password reset successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e6d6f9] via-[#f5d0e5] to-[#fbe5ff]">
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-violet-300/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(165,100,255,0.2)] text-[#2a104d] relative"
        >
          {/* 🔙 Back Button */}
          <NavLink
            to="/student/login"
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/90 border border-purple-100/50 hover:border-purple-300 rounded-full text-gray-600 hover:text-purple-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group z-50"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Login
          </NavLink>

          {/* 🔐 Icon & Title */}
          <div className="flex flex-col items-center mt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-400 rounded-full flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(165,100,255,0.4)] text-2xl"
            >
              <FaKey />
            </motion.div>
            <h2 className="text-2xl font-poppins font-bold text-center text-violet-700">
              Reset Password
            </h2>
            <p className="text-sm text-violet-800 mt-1 text-center">
              Enter the OTP sent to your email and set a new password
            </p>
          </div>

          {/* 📄 Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-4 pr-4 py-2 rounded-md bg-white/70 border border-violet-200 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-violet-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-violet-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-md bg-white/70 border border-violet-200 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-pink-500 hover:to-violet-500 text-white py-2 rounded-md font-semibold shadow-[0_0_20px_rgba(165,100,255,0.5)] hover:shadow-[0_0_30px_rgba(165,100,255,0.7)] transition-all duration-300"
            >
              Reset Password →
            </motion.button>
          </form>


        </motion.div>
      </div>

      {/* 📍 Footer */}
      <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8 mt-auto">
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

export default StudentForgotPassword;
