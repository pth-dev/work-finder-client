/**
 * API Utility Functions
 * Shared utilities for API functions
 */

/**
 * Helper function to handle API responses
 * Provides consistent error handling across all API functions
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  const responseData = await response.json();

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    // Handle new API response format
    if (responseData && !responseData.success) {
      errorMessage = responseData.message || errorMessage;

      // Create detailed error with backend error info
      const error = new Error(errorMessage) as Error & {
        status: number;
        code?: string;
        details?: any;
      };
      error.status = response.status;

      if (responseData.error) {
        error.code = responseData.error.code;
        error.details = responseData.error.details;
      }

      throw error;
    }

    // Fallback for non-standard error responses
    const error = new Error(errorMessage) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  // For successful responses, return the data field
  if (responseData && responseData.success && "data" in responseData) {
    return responseData.data;
  }

  // Fallback for non-standard success responses
  return responseData;
}

/**
 * Build query string from parameters
 * Handles arrays and filters out empty values
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams.toString();
}

/**
 * Get base API URL
 */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
}

/**
 * Create fetch options with default settings
 */
export function createFetchOptions(options: RequestInit = {}): RequestInit {
  return {
    credentials: "include", // Always include HttpOnly cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };
}
