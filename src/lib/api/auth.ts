/**
 * Authentication API Functions
 * Using native fetch() with HttpOnly cookie authentication
 */

import { handleResponse, getApiBaseUrl } from "./utils";
import type { User } from "@/types/user";

// Types
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  password: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role: "job_seeker" | "employer";
}

export interface AuthResponse {
  user: User;
}

// Base API URL
const API_BASE_URL = getApiBaseUrl();

/**
 * Login user with email and password
 */
export async function loginUser(data: LoginRequest): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include HttpOnly cookies
    body: JSON.stringify(data),
  });

  const result = await handleResponse<AuthResponse>(response);
  return result.user;
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterRequest): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include HttpOnly cookies
    body: JSON.stringify(data),
  });

  const result = await handleResponse<AuthResponse>(response);
  return result.user;
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  console.log("[getCurrentUser] Making request to:", `${API_BASE_URL}/auth/me`);

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // Include HttpOnly cookies
  });

  console.log("[getCurrentUser] Response status:", response.status);
  console.log(
    "[getCurrentUser] Response headers:",
    Object.fromEntries(response.headers.entries())
  );

  if (!response.ok) {
    console.error("[getCurrentUser] Request failed:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    });
  }

  // Backend returns { user: {...} }, wrapped by interceptor as { data: { user: {...} } }
  // handleResponse extracts data field, so we get { user: {...} }
  const result = await handleResponse<{ user: User }>(response);
  console.log("[getCurrentUser] Parsed result:", result);

  return result.user;
}

/**
 * Logout current user and clear authentication state
 */
export async function logoutUser(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Include HttpOnly cookies
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  } finally {
    // Clear any stored redirect path
    if (typeof window !== "undefined") {
      localStorage.removeItem("redirectAfterLogin");
    }
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // Include HttpOnly cookies
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }
}

/**
 * Request password reset
 */
export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ token, password: newPassword }),
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Change password for authenticated user
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}
