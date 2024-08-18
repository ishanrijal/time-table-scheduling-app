// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected element
  return element;
};

export default ProtectedRoute;
