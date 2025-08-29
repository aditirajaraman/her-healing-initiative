// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation(); // Get the current location object
  
  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/users/login" state={{ from: location }} replace />;
  }
  else{
    console.log('--------------------Found token----------------');
    console.log(token);
  }
  
  // If a token exists, render the child component
  return children;
};

export default ProtectedRoute;