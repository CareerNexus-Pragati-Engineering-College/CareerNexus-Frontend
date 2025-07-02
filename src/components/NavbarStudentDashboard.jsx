import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaLaptopCode,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineLibraryBooks, MdWork } from "react-icons/md";
import getUserId from "../services/getUserId";
import logout from "../services/logout"; // Import the logout function

const NavbarStudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const newJobCount = 3; // 🔔 Replace with dynamic count if needed

  // 🟣 Class for animated active link
  const getActiveClass = ({ isActive }) =>
    isActive
      ? "relative flex items-center gap-2 text-violet-400 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-violet-400 after:animate-pulse"
      : "flex items-center gap-2 hover:text-violet-400 transition";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#0f0c1d] via-[#1b1433] to-[#0f0c1d] shadow-md font-poppins">
      <div className="max-w-auto px-6 py-4 flex items-center justify-between">
        {/* 🔹 Logo */}
        <NavLink to={`/student/${getUserId()}/home`} className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="CareerNexus Logo"
            className="h-10 w-10 drop-shadow-[0_0_12px_rgba(165,100,255,0.6)]"
          />
          <span className="text-white text-2xl font-semibold tracking-wider drop-shadow-[0_0_8px_rgba(165,100,255,0.6)]">
            CareerNexus
          </span>
        </NavLink>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-white text-base">
          <NavLink to="/student/practice" className={getActiveClass}>
            <FaLaptopCode className="text-lg text-violet-400" />
            Practice
          </NavLink>
          <NavLink to="/student/resources" className={getActiveClass}>
            <MdOutlineLibraryBooks className="text-lg text-violet-400" />
            Resources
          </NavLink>
          <NavLink to={`/student/${getUserId()}/apply-jobs`} className={getActiveClass}>
            <div className="relative flex items-center gap-2">
              <MdWork className="text-lg text-violet-400" />
              Apply Jobs
     
             
            </div>
          </NavLink>
          <NavLink to={`/student/${getUserId()}/applications`} className={getActiveClass}>
            <FaClipboardList className="text-lg text-violet-400" />
            Applications
          </NavLink>

          {/* 🔹 Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center text-white hover:text-violet-400 focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="text-2xl drop-shadow-md" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1b1433] border border-violet-500/30 rounded-lg shadow-xl p-2 z-50">
                <NavLink
                  to={`/student/${getUserId()}/profile?page=update`}
                  className="flex items-center px-3 py-2 text-white hover:text-violet-400 transition rounded-md"
                  onClick={() => setShowDropdown(false)}
                >
                  <FaUserCircle className="mr-2 text-lg" />
                  Profile
                </NavLink>
                <button
                  className="flex items-center w-full px-3 py-2 text-red-500 hover:text-red-400 transition rounded-md mt-1"
                  onClick={async () => {
                    setShowDropdown(false);
                  logout(); // Call the logout function
                 
                      navigate("/student/login"); }}
                    
                >
                  <FaSignOutAlt className="mr-2 text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Mobile Toggle */}
        <div className="md:hidden text-white text-xl">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0c1d] px-6 pb-6 space-y-4 text-white text-base">
          <NavLink to="/student/practice" className={getActiveClass} onClick={() => setIsOpen(false)}>
            <FaLaptopCode className="text-lg text-violet-400" />
            Practice
          </NavLink>
          <NavLink to="/student/resources" className={getActiveClass} onClick={() => setIsOpen(false)}>
            <MdOutlineLibraryBooks className="text-lg text-violet-400" />
            Resources
          </NavLink>
          <NavLink to="/student/apply-jobs" className={getActiveClass} onClick={() => setIsOpen(false)}>
            <div className="relative flex items-center gap-2">
              <MdWork className="text-lg text-violet-400" />
              Apply Jobs
            </div>
          </NavLink>
          <NavLink to="/student/applications" className={getActiveClass} onClick={() => setIsOpen(false)}>
            <FaClipboardList className="text-lg text-violet-400" />
            Applications
          </NavLink>
          <button
            className="flex items-center gap-2 text-red-500 mt-2 hover:text-red-400 transition"
            onClick={async () => {
              setIsOpen(false);
              logout(); // Call the logout function
              navigate("/student/login");
            }}
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarStudentDashboard;
