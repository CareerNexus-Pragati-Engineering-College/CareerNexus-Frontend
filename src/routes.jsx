// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/landingpage/Home";
import Features from "./pages/landingpage/Features";
import About from "./pages/landingpage/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
