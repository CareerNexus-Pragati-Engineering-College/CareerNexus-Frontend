// src/App.jsx
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from "./pages/landingpage/Home";

// 🎓 Student
import Student from "./pages/student/Student";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import StudentHome from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import CompanyDetails from "./pages/student/CompanyDetails";

// 🏫 TPO
import TPO from "./pages/tpo/TPO";
import TPOLogin from "./pages/tpo/TPOLogin";

// 👨‍💼 Interviewer
import Interviewer from "./pages/interviewer/Interviewer";
import InterviewerLogin from "./pages/interviewer/InterviewerLogin";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import InterviewerProfile from "./pages/interviewer/InterviewerProfile";
import InterviewerJob from "./pages/interviewer/InterviewerJob";

// 🛠️ Admin
import Admin from "./pages/admin/Admin";
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
      {/* Navbars (conditionally rendered if needed) */}
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
        <Route path="/student/:userId/profile" element={<StudentProfile />} />
        <Route path="/student/company/:id" element={<CompanyDetails />} />

        {/* 🏫 TPO */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/tpo/login" element={<TPOLogin />} />

        {/* 👨‍💼 Interviewer */}
        <Route path="/interviewer" element={<InterviewerDashboard />} /> 
        <Route path="/interviewer/home" element={<InterviewerDashboard />} /> 
        <Route path="/interviewer/login" element={<InterviewerLogin />} />
        <Route path="/interviewer/main" element={<Interviewer />} /> 
        <Route path="/interviewer/profile" element={<InterviewerProfile />} />
        <Route path="/interviewer/jobpostings" element={<InterviewerJob />} />

        {/* 🛠️ Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/AdminAccessForm" element={<AdminAccessForm />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
