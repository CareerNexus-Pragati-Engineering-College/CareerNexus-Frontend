import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarLanding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollLinks = [
    { to: "home", label: "Home" },
    { to: "features", label: "Features" },
    { to: "about", label: "About" },
    { to: "contact", label: "Contact" },
  ];

  const routeLinks = [
    { path: "/student", label: "Student" },
    { path: "/tpo", label: "TPO" },
    { path: "/interviewer", label: "Interviewer" },
  ];

  const linkClass =
    "cursor-pointer text-[#EADFFD] hover:text-white transition duration-300 font-poppins tracking-wide";
  const activeClass = "text-white underline underline-offset-4";

  return (
    <nav className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] shadow-xl fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🔗 Logo Scrolls to Home */}
        <ScrollLink
          to="home"
          smooth
          duration={600}
          offset={-70}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-10 drop-shadow-[0_0_12px_rgba(165,100,255,0.5)]"
          />
          <span className="text-white text-2xl font-poppins font-semibold tracking-wider drop-shadow-[0_0_8px_rgba(165,100,255,0.6)]">
            CareerNexus
          </span>
        </ScrollLink>

        {/* 🖥️ Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-poppins tracking-wide">
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
            >
              {link.label}
            </ScrollLink>
          ))}
          {routeLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
            >
              {link.label}
            </NavLink>
          ))}
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
        <div className="md:hidden bg-[#0f0c1d] px-6 pb-6 space-y-4 text-white text-base">
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
          {routeLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarLanding;
