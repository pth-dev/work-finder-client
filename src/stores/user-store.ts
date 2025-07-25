import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import type { User, UserProfile } from "@/types/user";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  type LoginRequest,
  type RegisterRequest,
} from "@/lib/api/auth";
import { authTranslations } from "@/lib/i18n/store-translations";

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // Track if auth has been initialized

  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearUser: () => void;

  // Computed
  userDisplayName: string;
}

// Helper function to compute user display name
const getUserDisplayName = (user: User | null): string => {
  if (!user) return "";

  const { firstName, lastName } = user.profile || {};
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return user.name || user.email || "";
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => {
        // Create store instance
        const store = {
          // Initial state
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: false,
          userDisplayName: "",

          // Auth Actions
          login: async (data: LoginRequest) => {
            try {
              set((state) => {
                state.isLoading = true;
              });

              const user = await loginUser(data);

              set((state) => {
                state.user = user;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.userDisplayName = getUserDisplayName(user);
              });

              // Success toast with translation
              toast.success(authTranslations.loginSuccess());
            } catch (error: unknown) {
              set((state) => {
                state.isLoading = false;
              });
              // Error toast handled globally - no duplicate
              throw error;
            }
          },

          register: async (data: RegisterRequest) => {
            try {
              set((state) => {
                state.isLoading = true;
              });

              const user = await registerUser(data);

              set((state) => {
                state.user = user;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.userDisplayName = getUserDisplayName(user);
              });

              // Success toast with translation
              toast.success(authTranslations.registerSuccess());
            } catch (error: unknown) {
              set((state) => {
                state.isLoading = false;
              });
              // Error toast handled in sendRequest - no duplicate
              throw error;
            }
          },

          logout: async () => {
            try {
              await logoutUser();
              set((state) => {
                state.user = null;
                state.isAuthenticated = false;
              });
              // Success toast with translation
              toast.success(authTranslations.logoutSuccess());
            } catch (error) {
              // Even if logout fails on server, clear user locally
              set((state) => {
                state.user = null;
                state.isAuthenticated = false;
              });
              // Error toast handled in sendRequest - no duplicate
            }
          },

          checkAuth: async () => {
            try {
              console.log("[AuthStore] Starting checkAuth...");
              set((state) => {
                state.isLoading = true;
              });

              console.log("[AuthStore] Calling getCurrentUser API...");
              const user = await getCurrentUser();
              console.log("[AuthStore] getCurrentUser success:", {
                name: user.name,
                email: user.email,
                role: user.role,
              });

              set((state) => {
                state.user = user;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.isInitialized = true;
                state.userDisplayName = getUserDisplayName(user);
              });
              console.log("[AuthStore] Auth state updated successfully");
            } catch (error) {
              console.error("[AuthStore] checkAuth failed:", error);
              set((state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.isInitialized = true;
                state.userDisplayName = "";
              });
              console.log("[AuthStore] Auth state cleared due to error");
            }
          },

          // Basic Actions
          setUser: (user: User) =>
            set((state) => {
              state.user = user;
              state.isAuthenticated = true;
              state.userDisplayName = getUserDisplayName(user);
            }),

          updateProfile: (profileUpdates: Partial<UserProfile>) =>
            set((state) => {
              if (state.user) {
                state.user.profile = {
                  ...state.user.profile,
                  ...profileUpdates,
                };
                state.userDisplayName = getUserDisplayName(state.user);
              }
            }),

          clearUser: () =>
            set((state) => {
              state.user = null;
              state.isAuthenticated = false;
              state.userDisplayName = "";
            }),
        };

        return store;
      }),
      {
        name: "auth-store",
        partialize: (state: AuthStore) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          // Không persist isInitialized, isLoading để force re-check mỗi lần load
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);

// Helper hooks for common use cases
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useUserDisplayName = () =>
  useAuthStore((state) => state.userDisplayName);

export const useUserStore = useAuthStore;
