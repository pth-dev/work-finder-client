"use client";

import { useEffect, useState, ReactNode } from "react";
import { useAuthStore } from "@/stores/user-store";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component để khởi tạo authentication state khi app load
 * Giải quyết flash content issue bằng cách verify auth status với server trước khi render children
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("[AuthProvider] Starting authentication initialization...");
      console.log("[AuthProvider] Current auth state:", {
        isAuthenticated,
        user: user?.username,
      });

      try {
        // Verify authentication status với server
        console.log("[AuthProvider] Calling checkAuth()...");
        await checkAuth();
        console.log("[AuthProvider] checkAuth() completed successfully");
      } catch (error) {
        // Nếu checkAuth fail, auth store sẽ tự động clear user state
        console.error(
          "[AuthProvider] Authentication verification failed:",
          error
        );
      } finally {
        // Đánh dấu auth đã được khởi tạo
        console.log("[AuthProvider] Authentication initialization completed");
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []); // Chỉ chạy một lần khi component mount

  // Prevent flash content bằng cách không render children cho đến khi auth state được verify
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Hook để check xem auth đã được khởi tạo chưa
 */
export function useAuthInitialized() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [checkAuth]);

  return isInitialized;
}
