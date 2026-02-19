// src/pages/admin/AdminAccessForm.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const AdminAccessForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { userId: username, email: email, password: password, role: role };

    try {
      const response = await axios.post(`http://localhost:8080/auth/${role}/register`, payload);
      toast.success("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(`Failed to register user.${error.response.data.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6d6f9] via-[#f5d0e5] to-[#fbe5ff] flex items-center justify-center px-4 py-16">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-violet-300/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(165,100,255,0.2)] text-[#2a104d] relative font-poppins"
      >
        <NavLink
          to="/admin"
          className="absolute top-4 left-4 flex items-center gap-2 text-violet-600 hover:text-indigo-700 text-sm transition-all"
        >
          <FaArrowLeft />
          Back
        </NavLink>

        <div className="flex flex-col items-center mt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-400 rounded-full flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(165,100,255,0.4)] text-2xl"
          >
            <FaUserTie />
          </motion.div>
          <h2 className="text-3xl font-bold text-center text-violet-700">Admin Access</h2>
          <p className="text-sm text-violet-800 mt-1 text-center">
            Grant new access in <span className="font-semibold">CareerNexus</span>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-violet-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/70 border border-violet-200 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

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

          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full py-2 px-3 rounded-md bg-white/70 border border-violet-200 text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="tpo">TPO</option>

            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-pink-500 hover:to-violet-500 text-white py-2 rounded-md font-semibold shadow-[0_0_20px_rgba(165,100,255,0.5)] hover:shadow-[0_0_30px_rgba(165,100,255,0.7)] transition-all duration-300"
          >
            Grant Access →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAccessForm;
