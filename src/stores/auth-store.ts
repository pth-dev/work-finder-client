import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  user_id: number;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = "work-finder-auth";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isInitializing: true,

      // Actions
      setUser: (user: User | null) => {
        set((state) => ({
          user,
          isAuthenticated: !!user,
          isInitializing: false, // ✅ Set initialized when user is set
        }));
      },

      clearAuth: () => {
        // Clear auth state (tokens stored in HTTP-only cookies)
        set({
          user: null,
          isAuthenticated: false,
          isInitializing: false, // Ensure we don't re-initialize after logout
        });
      },

      setInitialized: () => {
        set({ isInitializing: false });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper function to get client auth state (for components)
export const getClientAuthState = () => {
  const store = useAuthStore.getState();
  return {
    isAuthenticated: store.isAuthenticated,
    user: store.user,
  };
};
