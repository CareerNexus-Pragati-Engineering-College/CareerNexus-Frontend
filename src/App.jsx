import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/landingpage/Home";

// 🎓 Student
import Student from "./pages/student/Student";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import CompanyDetails from "./pages/student/CompanyDetails";

// 🏫 TPO
import TPO from "./pages/tpo/TPO";
import TPOLogin from "./pages/tpo/TPOLogin";

// 👨‍💼 Recruiter
import Recruiter from "./pages/recruiter/Recruiter";
import RecruiterLogin from "./pages/recruiter/RecruiterLogin";
import RecruiterDashboard from "./pages/recruiter/RecruiterHome";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterJob from "./pages/recruiter/RecruiterJob";

// 🛠️ Admin
import Admin from "./pages/admin/Admin";
import AdminAccessForm from "./pages/admin/AdminAccessForm";

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  const isLandingPage = path === "/";
  const isStudentLogin = path === "/student/login";
  const isTpoLogin = path === "/tpo/login";
  const isRecruiterLogin = path === "/recruiter/login";

  const showNavbarStudent = path.startsWith("/student") && !isStudentLogin;
  const showNavbarTPO = path.startsWith("/tpo") && !isTpoLogin;
  const showNavbarRecruiter = path.startsWith("/recruiter") && !isRecruiterLogin;

  return (
    <>
      {/* Optional: You can conditionally add Navbars here */}
      {/* {isLandingPage && <NavbarLanding />} */}
      {/* {showNavbarStudent && <NavbarStudent />} */}
      {/* {showNavbarTPO && <NavbarTPO />} */}
      {/* {showNavbarRecruiter && <NavbarRecruiter />} */}

      <Routes>
        {/* 🌐 Landing */}
        <Route path="/" element={<Home />} />

        {/* 🎓 Student */}
        <Route path="/student" element={<Student />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student/:userId/home" element={<StudentDashboard />} />
        
        <Route path="/student/:userId/profile" element={<StudentProfile />} />
        <Route path="/student/company/:id" element={<CompanyDetails />} />

        {/* 🏫 TPO */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/tpo/login" element={<TPOLogin />} />

        {/* 👨‍💼 Recruiter */}
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/home" element={<RecruiterDashboard />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/jobpostings" element={<RecruiterJob />} />

        {/* 🛠️ Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/AdminAccessForm" element={<AdminAccessForm />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
