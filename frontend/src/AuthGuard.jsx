import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/ConfigContext';

const AuthGuard = ({ children }) => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user')

  // Check if user is authenticated (you can adjust this condition based on your actual authentication logic)
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render children if user is authenticated
  return <>{children}</>;
};

export default AuthGuard;
