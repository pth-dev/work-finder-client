import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginForm } from "../types";

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;

  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      // Actions
      login: async (credentials: LoginForm) => {
        set({ isLoading: true });

        try {
          // TODO: Replace with actual API call
          console.log("Login attempt:", credentials);

          // Mock successful login
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: credentials.email,
            role: "candidate", // Default role for login
          };

          set({
            user: mockUser,
            token: "mock-token",
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear any stored tokens
        localStorage.removeItem("auth-storage");
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
