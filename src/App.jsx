import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./services/ProtectedRoute"; //routes protection and restriction kosam
import ProtectedRouteRecruiter from "./services/ProtectedRouteRecruiter"; //recruiter routes protection and restriction kosam


// Pages
import Home from "./pages/landingpage/Home";

// 🎓 Student
import Student from "./pages/student/Student";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import CompanyDetails from "./pages/student/CompanyDetails";
import StudentApplyJobs from "./pages/student/StudentApplyJobs";
import StudentTestPage from "./pages/student/StudentTestPage";
import StudentApplications from "./pages/student/StudentApplications";

// 🏫 TPO
import TPO from "./pages/tpo/TPO";
import TPOLogin from "./pages/tpo/TpoLogin";

// 👨‍💼 Recruiter
import Recruiter from "./pages/recruiter/Recruiter";
import RecruiterLogin from "./pages/recruiter/RecruiterLogin";
import RecruiterDashboard from "./pages/recruiter/RecruiterHome";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterJob from "./pages/recruiter/RecruiterJob";
import ApplicationsPage from "./pages/recruiter/ApplicationsPage";

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
        <Route path="/student/:userId/home" element={ <ProtectedRoute><StudentDashboard /> </ProtectedRoute>  } />

        <Route path="/student/:userId/profile" element={<ProtectedRoute> <StudentProfile /> </ProtectedRoute>} />
        <Route path="/student/:userId/company/:id" element={ <ProtectedRoute><CompanyDetails /> </ProtectedRoute> }/>
        <Route path="/student/:userId/apply-jobs" element={ <ProtectedRoute><StudentApplyJobs /></ProtectedRoute> } />
        <Route path="/student/:userId/applications" element={<ProtectedRoute><StudentApplications /></ProtectedRoute>} />
        <Route path="/student/test" element={<StudentTestPage />} />

        {/* 🏫 TPO */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/tpo/login" element={<TPOLogin />} />

        {/* 👨‍💼 Recruiter */}
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/:userId/home" element={<ProtectedRouteRecruiter><RecruiterDashboard /></ProtectedRouteRecruiter> } />
        <Route path="/recruiter/:userId/profile" element={<ProtectedRouteRecruiter><RecruiterProfile /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/jobpostings"  element={<ProtectedRouteRecruiter><RecruiterJob /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/applications" element={<ProtectedRouteRecruiter><ApplicationsPage /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/home" element={<RecruiterDashboard />} />
        <Route path="/recruiter/:userId/profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/jobpostings" element={<RecruiterJob />} />
        <Route path="/recruiter/applications" element={<ApplicationsPage />} />

        {/* 🛠️ Admin */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/AdminAccessForm" element={<ProtectedRoute><AdminAccessForm /></ProtectedRoute>} />
      </Routes>


      <ToastContainer />
    </>
  );
};

export default App;
