import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarTPO = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollLinks = [
    { to: "tpo-home", label: "Home" },
    { to: "tpo-features", label: "Features" },
    { to: "tpo-about", label: "About" },
  ];

  const linkClass =
    "cursor-pointer hover:text-violet-400 transition duration-300 font-poppins";
  const activeClass = "text-violet-400 underline underline-offset-4";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#0f0c1d] via-[#1b1433] to-[#0f0c1d] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🔹 Logo with Glow */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="CareerNexus Logo"
            className="h-10 w-10 drop-shadow-[0_0_12px_rgba(165,100,255,0.6)]"
          />
          <span className="text-white text-2xl font-poppins font-semibold tracking-wider drop-shadow-[0_0_8px_rgba(165,100,255,0.6)]">
            CareerNexus
          </span>
        </NavLink>

        {/* 🖥️ Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-white text-base font-poppins">
          {scrollLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass={activeClass}
              className={linkClass}
            >
              {link.label}
            </ScrollLink>
          ))}

          {/* ✨ Login Button Only */}
          <NavLink
            to="/tpo/login"
            className="ml-4 px-4 py-2 rounded-md bg-white/10 text-white border border-violet-400 hover:bg-violet-500 hover:text-white transition duration-300 shadow-[0_0_10px_rgba(165,100,255,0.4)] hover:shadow-[0_0_20px_rgba(165,100,255,0.6)]"
          >
            Login
          </NavLink>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <div className="md:hidden text-white text-xl">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0c1d] px-6 pb-6 space-y-4 text-white text-base font-poppins">
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

          {/* ✨ Mobile Login Only */}
          <div className="pt-2 flex flex-col gap-2">
            <NavLink
              to="/tpo/login"
              className="px-4 py-2 rounded-md bg-white/10 text-white border border-violet-400 hover:bg-violet-500 hover:text-white transition duration-300 shadow-[0_0_12px_rgba(165,100,255,0.6)]"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarTPO;
