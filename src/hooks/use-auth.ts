import { useAuthStore } from "../stores/auth-store";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export const useAuth = (): AuthState & AuthActions => {
  const authStore = useAuthStore();

  // Create wrapper functions for methods that don't exist in the store yet
  const register = async (userData: RegisterData) => {
    // TODO: Implement register functionality
    console.log("Register not implemented yet:", userData);
    throw new Error("Register functionality not implemented yet");
  };

  const updateProfile = async (userData: Partial<User>) => {
    // TODO: Implement update profile functionality
    console.log("Update profile not implemented yet:", userData);
    throw new Error("Update profile functionality not implemented yet");
  };

  const checkAuth = async () => {
    // TODO: Implement check auth functionality
    console.log("Check auth not implemented yet");
  };

  // Wrapper for login to match the expected signature
  const login = async (email: string, password: string) => {
    return authStore.login({ email, password });
  };

  return {
    // State
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    token: authStore.token,
    isLoading: authStore.isLoading,

    // Actions
    login,
    register,
    logout: authStore.logout,
    updateProfile,
    checkAuth,
  };
};

// Helper hooks for specific auth checks
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useCurrentUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

export const useUserRole = (): string | null => {
  const { user } = useAuth();
  return user?.role || null;
};

export const useHasRole = (requiredRole: string | string[]): boolean => {
  const { user } = useAuth();

  if (!user) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  return user.role === requiredRole;
};

export const useIsAdmin = (): boolean => {
  return useHasRole("admin");
};

export const useCanAccess = (requiredRoles: string[]): boolean => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return false;

  return requiredRoles.includes(user.role);
};
