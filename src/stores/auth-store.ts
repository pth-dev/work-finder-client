import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'employer' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setInitialized: () => void;
  setAuthFromLocal: (user: User) => void;
  refreshAccessToken: () => Promise<string | null>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = 'work-finder-auth';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isInitializing: true,
      accessToken: null,
      refreshToken: null,

      // Actions
      login: async (email: string, _password: string) => {
        try {
          // TODO: Replace with actual API call
          const mockResponse = {
            user: {
              id: '1',
              name: 'John Doe',
              email,
              role: 'user' as const,
              isVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          };

          set({
            user: mockResponse.user,
            isAuthenticated: true,
            accessToken: mockResponse.accessToken,
            refreshToken: mockResponse.refreshToken,
            isInitializing: false,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          // TODO: Replace with actual API call
          const mockResponse = {
            user: {
              id: '1',
              name: data.name,
              email: data.email,
              role: 'user' as const,
              isVerified: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          };

          set({
            user: mockResponse.user,
            isAuthenticated: true,
            accessToken: mockResponse.accessToken,
            refreshToken: mockResponse.refreshToken,
            isInitializing: false,
          });
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          // TODO: Call logout API endpoint
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            isInitializing: false,
          });
        } catch (error) {
          console.error('Logout failed:', error);
          // Force logout on error
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            isInitializing: false,
          });
        }
      },

      getCurrentUser: async () => {
        try {
          const { accessToken } = get();
          if (!accessToken) {
            set({ isInitializing: false });
            return;
          }

          // TODO: Replace with actual API call
          const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user' as const,
            isVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isInitializing: false,
          });
        } catch (error) {
          console.error('Get current user failed:', error);
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            isInitializing: false,
          });
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData, updatedAt: new Date().toISOString() },
          });
        }
      },

      setInitialized: () => {
        set({ isInitializing: false });
      },

      setAuthFromLocal: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isInitializing: false,
        });
      },

      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // TODO: Replace with actual API call
          const mockResponse = {
            accessToken: 'new-mock-access-token',
          };

          set({ accessToken: mockResponse.accessToken });
          return mockResponse.accessToken;
        } catch (error) {
          console.error('Token refresh failed:', error);
          // Clear auth state on refresh failure
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
          });
          return null;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
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
    accessToken: store.accessToken,
  };
};