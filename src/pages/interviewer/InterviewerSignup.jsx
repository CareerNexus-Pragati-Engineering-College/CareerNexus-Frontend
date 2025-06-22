// // src/pages/interviewer/InterviewerSignup.jsx
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaUserTie,
//   FaArrowLeft,
//   FaUser,
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// const InterviewerSignup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     if (!email.includes("@") || !email.includes(".")) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     setError("");
//     console.log("Interviewer Signup:", { name, email, password });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0c1d] via-[#2a1a5e] to-black flex items-center justify-center px-4 py-14 relative">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl text-white mt-6 relative"
//       >
//         <NavLink
//           to="/interviewer"
//           className="absolute top-4 left-4 flex items-center gap-2 text-violet-400 hover:text-white transition"
//         >
//           <FaArrowLeft /> Back
//         </NavLink>

//         <div className="flex flex-col items-center mt-6">
//           <div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center mb-4 shadow-md shadow-violet-400 text-2xl">
//             <FaUserTie />
//           </div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-center">Join CareerNexus</h2>
//           <p className="text-sm text-gray-300 mt-1 text-center">
//             Create your interviewer account
//           </p>
//         </div>

//         <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaLock className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Create password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-10 py-2 rounded-md bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               required
//             />
//             <div
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           <motion.button
//             whileTap={{ scale: 0.96 }}
//             type="submit"
//             className="w-full bg-white text-black py-2 rounded-md font-semibold transition"
//           >
//             Create Account →
//           </motion.button>

//           <p className="text-center text-sm text-gray-400 mt-4">
//             Already have an account?{' '}
//             <NavLink
//               to="/interviewer/login"
//               className="text-violet-400 font-medium hover:underline"
//             >
//               Log in
//             </NavLink>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default InterviewerSignup;
