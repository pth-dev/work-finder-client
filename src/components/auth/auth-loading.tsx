"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuthRedirect";

interface AuthLoadingProps {
  children: React.ReactNode;
}

/**
 * Component để handle loading state cho auth pages
 * Prevent flash content và ensure proper redirects
 */
export function AuthLoading({ children }: AuthLoadingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    console.log("[AuthLoading] State check:", {
      isLoading,
      isAuthenticated,
      user: user?.name,
      pathname,
    });

    // Nếu đang loading, không render gì cả
    if (isLoading) {
      console.log("[AuthLoading] Still loading, not rendering");
      setShouldRender(false);
      return;
    }

    // Nếu user đã authenticated và đang ở auth page, redirect
    if (isAuthenticated && user) {
      const authPages = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      const isAuthPage = authPages.some((page) => pathname.startsWith(page));

      if (isAuthPage) {
        console.log(
          "[AuthLoading] Authenticated user on auth page, redirecting..."
        );
        // Redirect based on role
        if (user.role === "job_seeker") {
          router.replace("/");
        } else if (user.role === "employer") {
          router.replace("/employer/dashboard");
        } else if (user.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
        return;
      }
    }

    // Nếu không authenticated hoặc không phải auth page, render children
    console.log("[AuthLoading] Rendering children");
    setShouldRender(true);
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Show loading spinner while checking auth or redirecting
  if (isLoading || !shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra trạng thái đăng nhập...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
