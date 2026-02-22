import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import ProtectedRoute from "./services/ProtectedRoute";
import ProtectedRouteRecruiter from "./services/ProtectedRouteRecruiter";

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
import Resources from "./pages/student/Resources";
import StudentPractice from "./pages/student/StudentPractice";

// 🏫 TPO
import TPO from "./pages/tpo/TPO";
import TPOLogin from "./pages/tpo/TpoLogin";
import Tpohome from "./pages/tpo/Tpohome";
import TpoProfile from "./pages/tpo/TpoProfile";
import TPOStudents from "./pages/tpo/TPOStudents";
import TPORecruiters from "./pages/tpo/TPORecruiters";

// 👨‍💼 Recruiter
import Recruiter from "./pages/recruiter/Recruiter";
import RecruiterLogin from "./pages/recruiter/RecruiterLogin";
import RecruiterDashboard from "./pages/recruiter/RecruiterHome";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterJob from "./pages/recruiter/RecruiterJob";
import ApplicationsPage from "./pages/recruiter/ApplicationsPage";
import RecruitmentProcessPage from "./pages/recruiter/RecruitmentProcessPage";

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
        <Route path="/student/:userId/home" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/:userId/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/:userId/company/:id" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
        <Route path="/student/:userId/apply-jobs" element={<ProtectedRoute><StudentApplyJobs /></ProtectedRoute>} />
        <Route path="/student/apply-jobs" element={<StudentApplyJobs />} />
        <Route path="/student/:userId/applications" element={<ProtectedRoute><StudentApplications /></ProtectedRoute>} />
        <Route path="/student/:userId/test/:assessmentId" element={<ProtectedRoute><StudentTestPage /></ProtectedRoute>} />
        <Route path="/student/resources" element={<Resources />} />
        <Route path="/student/practice" element={<StudentPractice />} />



        {/* 🏫 TPO */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/tpo/login" element={<TPOLogin />} />
        <Route path="/tpo/:userId/home" element={<Tpohome />} />
        <Route path="/tpo/:userId/profile" element={<TpoProfile />} />
        <Route path="/tpo/:userid/students" element={<TPOStudents />} />
        <Route path="/tpo/:userId/recruiters" element={<TPORecruiters />} />

        {/* 👨‍💼 Recruiter */}
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/:userId/home" element={<ProtectedRouteRecruiter><RecruiterDashboard /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/profile" element={<ProtectedRouteRecruiter><RecruiterProfile /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/jobpostings" element={<ProtectedRouteRecruiter><RecruiterJob /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/applications" element={<ProtectedRouteRecruiter><ApplicationsPage /></ProtectedRouteRecruiter>} />
        <Route path="/recruiter/:userId/home" element={<RecruiterDashboard />} />
        <Route path="/recruiter/:userId/profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/:userId/jobpostings" element={<RecruiterJob />} />
        <Route path="/recruiter/:userId/applications" element={<ApplicationsPage />} />
        <Route path="/recruiter/:userId/recruitment-process/:jobId" element={<RecruitmentProcessPage />} />

        {/* 🛠️ Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/AdminAccessForm" element={<AdminAccessForm />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1200,
          style: {
            background: '#fff',
            color: '#333',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#A855F7',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="ml-2 hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center transition-colors text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
};

export default App;
