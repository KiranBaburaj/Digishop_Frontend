import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (token) {
    // If the user is logged in, redirect to the home page
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children; // If not logged in, return the child components (Login/Register)
};

export default PublicRoute;
