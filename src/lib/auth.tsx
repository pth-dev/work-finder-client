import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores";

type UserRole = "job_seeker" | "recruiter" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: UserRole[];
  excludeRoles?: UserRole[];
}

interface PublicRouteProps {
  children: React.ReactNode;
  excludeRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  excludeRoles,
}) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  // Check user trong role hạn chế
  if (
    excludeRoles &&
    user?.role &&
    excludeRoles.includes(user.role as UserRole)
  ) {
    const redirectPath = getDefaultDashboardForRole(user.role as UserRole);
    return <Navigate to={redirectPath} replace />;
  }

  // If specific permissions are required, check user's role
  if (permission && user?.role) {
    if (!permission.includes(user.role as UserRole)) {
      const redirectPath = getDefaultDashboardForRole(user.role as UserRole);
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
};

// Component cho public routes với khả năng exclude roles
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  excludeRoles,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  // Nếu user đã login và role bị exclude, redirect về dashboard
  if (
    isAuthenticated &&
    excludeRoles &&
    user?.role &&
    excludeRoles.includes(user.role as UserRole)
  ) {
    const redirectPath = getDefaultDashboardForRole(user.role as UserRole);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

// Helper function to get default dashboard based on role
function getDefaultDashboardForRole(role: UserRole): string {
  switch (role) {
    case "job_seeker":
      return paths.app.root.getHref();
    case "recruiter":
      return paths.recruiter.root.getHref();
    case "admin":
      return paths.admin.root.getHref();
    default:
      return paths.auth.login.getHref();
  }
}
