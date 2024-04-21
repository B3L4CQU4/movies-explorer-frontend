import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLogined = localStorage.getItem("isLogined")

  return isLogined ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute