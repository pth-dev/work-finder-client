import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return (
      <Navigate 
        to={paths.auth.login.getHref(location.pathname)} 
        replace 
      />
    );
  }

  return <>{children}</>;
};
