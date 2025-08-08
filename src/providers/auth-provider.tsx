import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores";
import { api } from "@/lib/api-client";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isInitializing, isAuthenticated, user, setInitialized, setUser } =
    useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 AuthProvider: Initializing auth...", {
        isAuthenticated,
        hasUser: !!user,
        isInitializing,
      });

      try {
        // ✅ FIX: Only fetch user data if we have persisted auth but no user data
        // This prevents redundant API calls when user just logged in successfully
        if (isAuthenticated && !user) {
          console.log("📡 AuthProvider: Fetching user data from server...");
          const userResponse = await api.get("/users/me");
          setUser(userResponse.data);
        } else if (!isAuthenticated) {
          // No persisted auth state, user is not authenticated
          console.log("❌ AuthProvider: No auth state, clearing user");
          setUser(null);
        } else if (isAuthenticated && user) {
          // User is already authenticated with user data, no need to fetch
          console.log(
            "✅ AuthProvider: User already authenticated with data, skipping API call"
          );
        }
      } catch (error) {
        // ✅ User not authenticated or token expired - clear auth state
        console.log("🚫 AuthProvider: User not authenticated:", error);
        setUser(null);
      } finally {
        console.log("🏁 AuthProvider: Initialization complete");
        setInitialized();
      }
    };

    // ✅ FIX: Only initialize when actually needed
    if (isInitializing) {
      console.log("🚀 AuthProvider: Starting initialization...");
      initializeAuth();
    }
  }, [isInitializing]); // ✅ FIX: Remove other dependencies to prevent race conditions

  // ✅ FIX: Only show loading if we're actually initializing AND don't have user data yet
  // If user just logged in, they already have user data, so don't show loading
  if (isInitializing && !user) {
    console.log("🔄 AuthProvider: Showing loading screen");
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
