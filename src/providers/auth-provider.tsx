import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores";
import { api } from "@/lib/api-client";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isInitializing, isAuthenticated, setInitialized, setUser } =
    useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Only try to fetch user if we think user might be authenticated
        // (e.g., has persisted auth state)
        if (isAuthenticated) {
          const userResponse = await api.get("/users/me");
          setUser(userResponse.data);
        } else {
          // No persisted auth state, user is not authenticated
          setUser(null);
        }
      } catch (error) {
        // ✅ User not authenticated or token expired - clear auth state
        console.log("User not authenticated:", error);
        setUser(null);
      } finally {
        setInitialized();
      }
    };

    if (isInitializing) {
      initializeAuth();
    }
  }, [isInitializing, isAuthenticated, setInitialized, setUser]);

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
