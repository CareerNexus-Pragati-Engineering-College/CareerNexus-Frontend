import React from "react";


import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const { userId } = useParams();

{/*
  if (!token) {


    return <Navigate to="/student/login" replace />;
  }

  if (userId && userId !== storedUserId) {


    return <Navigate to="/student/login" replace />;
  }
*/}
  return children;




};


export default ProtectedRoute;
