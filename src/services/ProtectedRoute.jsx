import React from "react";

import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const { userId } = useParams();


  if (!token) {

 toast.error("You are not authorized to access this page. Please log in.");
    return <Navigate to="/" replace />;
   
  }

  if (userId && userId !== storedUserId) {
    toast.error("You are not authorized to access this page.");

    return <Navigate to="/" replace />;
  }

  return children;




};


export default ProtectedRoute;
