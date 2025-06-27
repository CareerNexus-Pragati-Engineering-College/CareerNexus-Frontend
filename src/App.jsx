// src/App.jsx
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/landingpage/Home";
import Student from "./pages/student/Student";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup"; 
import StudentHome from "./pages/student/StudentDashboard";  // StudentHome is loaded here
import StudentProfile from "./pages/student/StudentProfile";
import CompanyDetails from "./pages/student/CompanyDetails"; // Make sure this is imported
import TPO from "./pages/tpo/TPO";
import TPOLogin from "./pages/tpo/TPOLogin";
import Interviewer from "./pages/interviewer/Interviewer";
import InterviewerLogin from "./pages/interviewer/InterviewerLogin";
import Admin from "./pages/admin/Admin"; // ✅ NEW: Admin Page
import AdminAccessForm from "./pages/admin/AdminAccessForm";

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  const isLandingPage = path === "/";
  const isStudentLogin = path === "/student/login";
  const isTpoLogin = path === "/tpo/login";
  const isInterviewerLogin = path === "/interviewer/login";

  const showNavbarStudent = path.startsWith("/student") && !isStudentLogin;
  const showNavbarTPO = path.startsWith("/tpo") && !isTpoLogin;
  const showNavbarInterviewer = path.startsWith("/interviewer") && !isInterviewerLogin;

  return (
    <>
      {/* Conditional Navbars (you can enable as needed) */}
      {/* {isLandingPage && <NavbarLanding />} */}
      {/* {showNavbarStudent && <NavbarStudent />} */}
      {/* {showNavbarTPO && <NavbarTPO />} */}
      {/* {showNavbarInterviewer && <NavbarInterviewer />} */}

      <Routes>
        {/* 🌐 Landing */}
        <Route path="/" element={<Home />} />

        {/* 🎓 Student */}
        <Route path="/student" element={<Student />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} /> 
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* 🏫 TPO */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/tpo/login" element={<TPOLogin />} />

        {/* 👨‍💼 Interviewer */}
        <Route path="/interviewer" element={<Interviewer />} />
        <Route path="/interviewer/login" element={<InterviewerLogin />} />

        {/* 🛠️ Admin */}
        <Route path="/admin" element={<Admin />} /> {/* ✅ NEW Route */}
        <Route path="/admin/AdminAccessForm" element={<AdminAccessForm/>}/>

      </Routes>
    </>
  );
};

export default App;
