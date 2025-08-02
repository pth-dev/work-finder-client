import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isInitializing, setInitialized } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Auth is handled by HTTP-only cookies, just mark as initialized
        setInitialized();
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setInitialized();
      }
    };

    if (isInitializing) {
      initializeAuth();
    }
  }, [isInitializing, setInitialized]);

  // Show loading while auth is initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}