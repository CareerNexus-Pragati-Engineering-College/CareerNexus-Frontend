// src/services/ProtectedRouteRecruiter.jsx
import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";






const ProtectedRouteRecruiter = ({ children }) => {
  const token = localStorage.getItem("token");

  const storedUserId = localStorage.getItem("userId");
  const { userId } = useParams();

  if (!token) {

    toast.error("You must log in as a recruiter to access this page.");
    return <Navigate to="/recruiter/login" replace />;

  }

  if (userId && userId !== storedUserId) {

    toast.error("Invalid recruiter access.");

    return <Navigate to="/recruiter/login" replace />;

  }

  return children;

};

export default ProtectedRouteRecruiter;
