/**
 * Authentication Wrapper for API Calls
 * Handles automatic token refresh using HttpOnly cookies
 */

import { getApiBaseUrl, createFetchOptions } from "./utils";

// Track if we're currently refreshing to prevent multiple refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * Attempt to refresh the authentication token
 * Returns true if refresh was successful, false otherwise
 */
async function refreshAuthToken(): Promise<boolean> {
  // If already refreshing, wait for the existing refresh to complete
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = performTokenRefresh();

  try {
    const result = await refreshPromise;
    return result;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

/**
 * Perform the actual token refresh
 */
async function performTokenRefresh(): Promise<boolean> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/auth/refresh`,
      createFetchOptions({
        method: "POST",
      })
    );

    if (response.ok) {
      return true;
    } else {
      // Refresh failed, redirect to login
      console.warn("Token refresh failed, redirecting to login");
      return false;
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
}

/**
 * Handle authentication redirect
 */
function handleAuthRedirect(): void {
  // Only redirect if we're in the browser
  if (typeof window !== "undefined") {
    // Store current path for redirect after login
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== "/login" && currentPath !== "/register") {
      localStorage.setItem("redirectAfterLogin", currentPath);
    }

    // Redirect to login page
    window.location.href = "/login";
  }
}

/**
 * Enhanced fetch function with automatic token refresh
 * This replaces the complex axios interceptor pattern
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Make the initial request
  const response = await fetch(url, createFetchOptions(options));

  // If request is successful, return response
  if (response.ok) {
    return response;
  }

  // If we get a 401 (Unauthorized), try to refresh the token
  if (response.status === 401) {
    console.log("Received 401, attempting token refresh...");

    const refreshSuccess = await refreshAuthToken();

    if (refreshSuccess) {
      console.log("Token refresh successful, retrying original request...");

      // Retry the original request with refreshed token
      const retryResponse = await fetch(url, createFetchOptions(options));

      // If retry also fails with 401, redirect to login
      if (retryResponse.status === 401) {
        console.warn(
          "Retry request also failed with 401, redirecting to login"
        );
        handleAuthRedirect();
        throw new Error("Authentication failed");
      }

      return retryResponse;
    } else {
      // Refresh failed, redirect to login
      console.warn("Token refresh failed, redirecting to login");
      handleAuthRedirect();
      throw new Error("Authentication failed");
    }
  }

  // For other errors, return the response as-is
  return response;
}

/**
 * Wrapper for authenticated GET requests
 */
export async function fetchAuthGet(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetchWithAuth(url, {
    ...options,
    method: "GET",
  });
}

/**
 * Wrapper for authenticated POST requests
 */
export async function fetchAuthPost(
  url: string,
  data?: unknown,
  options: RequestInit = {}
): Promise<Response> {
  return fetchWithAuth(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Wrapper for authenticated PUT requests
 */
export async function fetchAuthPut(
  url: string,
  data?: unknown,
  options: RequestInit = {}
): Promise<Response> {
  return fetchWithAuth(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Wrapper for authenticated DELETE requests
 */
export async function fetchAuthDelete(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetchWithAuth(url, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Check if user is authenticated by making a test request
 * This can be used by components to check auth status
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await fetchWithAuth(`${getApiBaseUrl()}/auth/me`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Get redirect path after login
 */
export function getRedirectAfterLogin(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("redirectAfterLogin");
  }
  return null;
}

/**
 * Clear redirect path after login
 */
export function clearRedirectAfterLogin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("redirectAfterLogin");
  }
}
