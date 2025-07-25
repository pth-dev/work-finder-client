"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/user-store";

/**
 * Hook to handle authentication-based redirects
 * Redirects authenticated users away from auth pages
 * Note: Middleware handles most redirects, this is a fallback for client-side navigation
 */
export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't redirect while loading or if not authenticated
    if (isLoading || !isAuthenticated || !user) return;

    // Pages that authenticated users shouldn't access
    const authPages = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ];

    // Check if current page is an auth page
    const isAuthPage = authPages.some((page) => pathname.startsWith(page));

    if (isAuthPage) {
      // Add small delay để tránh conflict với middleware
      const timeoutId = setTimeout(() => {
        // Redirect based on user role
        if (user.role === "job_seeker") {
          router.replace("/");
        } else if (user.role === "employer") {
          router.replace("/employer/dashboard");
        } else if (user.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, user, pathname, router, isLoading]);
}

/**
 * Hook to get user authentication status and role
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    isJobSeeker: user?.role === "job_seeker",
    isEmployer: user?.role === "employer",
    isAdmin: user?.role === "admin",
  };
}
