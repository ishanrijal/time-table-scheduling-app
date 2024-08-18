// RedirectIfLoggedIn.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfLoggedIn = ({ element }) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Redirect to the dashboard if the user is already logged in
    return <Navigate to="/dashboard/information" />;
  }

  // Otherwise, render the passed element (e.g., Login or Signup page)
  return element;
};

export default RedirectIfLoggedIn;
