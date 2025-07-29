import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const location = useLocation();
  
  // Mock authentication check - replace with real auth logic
  const isAuthenticated = false; // TODO: Replace with actual auth state
  
  if (requireAuth && !isAuthenticated) {
    // User is not authenticated and auth is required
    return <Navigate to={AUTH_ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  
  if (!requireAuth && isAuthenticated) {
    // User is authenticated but trying to access auth pages
    const from = location.state?.from?.pathname || PUBLIC_ROUTES.HOME;
    return <Navigate to={from} replace />;
  }
  
  return <>{children}</>;
};