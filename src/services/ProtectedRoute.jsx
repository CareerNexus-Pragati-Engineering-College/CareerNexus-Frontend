import React from "react";

import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const studentRole=localStorage.getItem("role");
  const { userId } = useParams();


  if (!token) {

 toast.error("You are not authorized to access this page. Please log in.");
    return <Navigate to="/student/login" replace />;
   
  }

  if (studentRole!="student") {
    toast.error("You are not authorized to access this page.");

    return  <Navigate to="/student/login" replace />;
  }

  return children;




};


export default ProtectedRoute;
