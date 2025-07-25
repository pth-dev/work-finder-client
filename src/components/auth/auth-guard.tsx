"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuthRedirect";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ("job_seeker" | "employer" | "admin")[];
  redirectTo?: string;
}

/**
 * AuthGuard component to protect routes based on authentication and roles
 */
export function AuthGuard({
  children,
  requireAuth = false,
  allowedRoles = [],
  redirectTo = "/",
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // If auth is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // If user is authenticated but doesn't have required role
    if (isAuthenticated && user && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        router.replace(redirectTo);
        return;
      }
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    requireAuth,
    allowedRoles,
    redirectTo,
    pathname,
    router,
  ]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1967D2]"></div>
      </div>
    );
  }

  // Don't render if auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Don't render if user doesn't have required role
  if (isAuthenticated && user && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return null;
    }
  }

  return <>{children}</>;
}
