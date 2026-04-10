import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If the user is not authenticated, gracefully bounce them to the login screen
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, user is good to go
  return children;
};
