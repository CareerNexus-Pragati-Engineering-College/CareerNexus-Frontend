import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarStudent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollLinks = [
    { to: "student-home", label: "Home" },
    { to: "student-features", label: "Features" },
    { to: "student-about", label: "About" },
  ];

  const linkClass =
    "cursor-pointer hover:text-violet-400 transition duration-300 font-poppins";
  const activeClass = "text-violet-400 underline underline-offset-4";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f0c1d] via-[#1b1433] to-[#0f0c1d] shadow-md">
      <div className="max-w-auto  flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4">
        {/* 🔹 Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="CareerNexus Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 drop-shadow-[0_0_12px_rgba(165,100,255,0.6)] transition-transform group-hover:scale-105"
          />
          <span className="text-white text-xl sm:text-2xl font-poppins font-semibold tracking-wider drop-shadow-[0_0_8px_rgba(165,100,255,0.6)]">
            CareerNexus
          </span>
        </NavLink>

        {/* 🖥️ Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-white text-base font-poppins">
          {scrollLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth
              duration={450}
              offset={-80}
              spy
              className={linkClass}
              activeClass={activeClass}
            >
              {link.label}
            </ScrollLink>
          ))}

          {/* Login/Signup */}
          <NavLink
            to="/student/login"
            className="px-4 py-2 rounded-md border border-violet-400 text-white bg-white/10 hover:bg-violet-500 hover:text-white shadow-[0_0_10px_rgba(165,100,255,0.4)] hover:shadow-[0_0_20px_rgba(165,100,255,0.6)] transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/student/signup"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-[0_0_12px_rgba(165,100,255,0.6)] hover:shadow-[0_0_20px_rgba(165,100,255,0.8)] transition"
          >
            Signup
          </NavLink>
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0c1d] px-6 py-4 space-y-4 text-white text-base font-poppins border-t border-violet-500/20 shadow-md">
          {scrollLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-80}
              spy
              className={linkClass}
              activeClass={activeClass}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </ScrollLink>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            <NavLink
              to="/student/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-white/10 border border-violet-400 hover:bg-violet-500 hover:text-white shadow-[0_0_12px_rgba(165,100,255,0.6)] transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/student/signup"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-[0_0_14px_rgba(165,100,255,0.6)] transition"
            >
              Signup
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarStudent;
