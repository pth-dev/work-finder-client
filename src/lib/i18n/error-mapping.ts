/**
 * Backend Error Code to Frontend Translation Key Mapping
 * This follows the proven pattern where backend returns standardized error codes
 * and frontend translates them to user-friendly messages
 */

// Common backend error codes that might be returned by NestJS API
export const ERROR_CODE_MAPPING = {
  // Authentication & Authorization Errors
  AUTH_INVALID_CREDENTIALS: "errors.unauthorized",
  AUTH_USER_NOT_FOUND: "errors.unauthorized",
  AUTH_TOKEN_EXPIRED: "errors.sessionExpired",
  AUTH_TOKEN_INVALID: "errors.sessionExpired",
  AUTH_UNAUTHORIZED: "errors.unauthorized",
  AUTH_FORBIDDEN: "errors.forbidden",
  AUTH_EMAIL_NOT_VERIFIED: "errors.emailNotVerified",

  // Validation Errors
  VALIDATION_ERROR: "errors.validation",
  VALIDATION_EMAIL_REQUIRED: "errors.emailRequired",
  VALIDATION_EMAIL_INVALID: "errors.emailInvalid",
  VALIDATION_PASSWORD_REQUIRED: "errors.passwordRequired",
  VALIDATION_PASSWORD_TOO_SHORT: "errors.passwordTooShort",
  VALIDATION_PASSWORDS_DO_NOT_MATCH: "errors.passwordsDoNotMatch",
  VALIDATION_FIRST_NAME_REQUIRED: "errors.firstNameRequired",
  VALIDATION_LAST_NAME_REQUIRED: "errors.lastNameRequired",

  // User Management Errors
  USER_ALREADY_EXISTS: "errors.userAlreadyExists",
  USER_NOT_FOUND: "errors.userNotFound",
  USER_INACTIVE: "errors.userInactive",
  USER_SUSPENDED: "errors.userSuspended",

  // Job Related Errors
  JOB_NOT_FOUND: "errors.jobNotFound",
  JOB_APPLICATION_ALREADY_EXISTS: "errors.jobApplicationAlreadyExists",
  JOB_APPLICATION_DEADLINE_PASSED: "errors.jobApplicationDeadlinePassed",
  JOB_INACTIVE: "errors.jobInactive",

  // Company Related Errors
  COMPANY_NOT_FOUND: "errors.companyNotFound",
  COMPANY_INACTIVE: "errors.companyInactive",

  // File Upload Errors
  FILE_TOO_LARGE: "errors.fileTooLarge",
  FILE_TYPE_NOT_SUPPORTED: "errors.fileTypeNotSupported",
  FILE_UPLOAD_FAILED: "errors.fileUploadFailed",

  // Network & Server Errors
  NETWORK_ERROR: "errors.network",
  SERVER_ERROR: "errors.serverError",
  SERVICE_UNAVAILABLE: "errors.serviceUnavailable",
  RATE_LIMIT_EXCEEDED: "errors.rateLimitExceeded",

  // Resource Errors
  RESOURCE_NOT_FOUND: "errors.notFound",
  RESOURCE_CONFLICT: "errors.resourceConflict",
  RESOURCE_GONE: "errors.resourceGone",

  // Generic Fallback
  UNKNOWN_ERROR: "errors.generic",
} as const;

// Import standardized types
import type { ApiResponse, ErrorResponse, AnyApiResponse } from "@/types/api";

// Type aliases for backward compatibility
export type BackendErrorResponse = ErrorResponse;
export type BackendSuccessResponse<T = any> = ApiResponse<T>;
export type BackendResponse<T = any> = AnyApiResponse<T>;

/**
 * Map backend error code to frontend translation key
 * @param errorCode - Error code from backend
 * @returns Translation key for frontend
 */
export function mapErrorCodeToTranslationKey(errorCode: string): string {
  return (
    ERROR_CODE_MAPPING[errorCode as keyof typeof ERROR_CODE_MAPPING] ||
    "errors.generic"
  );
}

/**
 * Extract error information from backend response
 * @param response - Backend response object
 * @returns Error information or null if response is successful
 */
export function extractErrorInfo(response: BackendResponse): {
  translationKey: string;
  originalCode: string;
  details?: Record<string, any>;
  field?: string;
} | null {
  if (response.success) {
    return null;
  }

  const errorResponse = response as ErrorResponse;
  const { code, details } = errorResponse.error;

  return {
    translationKey: mapErrorCodeToTranslationKey(code),
    originalCode: code,
    details,
  };
}

/**
 * Check if a response indicates an error
 * @param response - Backend response
 * @returns True if response contains an error
 */
export function isErrorResponse(
  response: BackendResponse
): response is BackendErrorResponse {
  return !response.success;
}

/**
 * Handle HTTP status codes and map them to error codes
 * @param status - HTTP status code
 * @returns Appropriate error code
 */
export function mapHttpStatusToErrorCode(status: number): string {
  switch (status) {
    case 400:
      return "VALIDATION_ERROR";
    case 401:
      return "AUTH_UNAUTHORIZED";
    case 403:
      return "AUTH_FORBIDDEN";
    case 404:
      return "RESOURCE_NOT_FOUND";
    case 409:
      return "RESOURCE_CONFLICT";
    case 429:
      return "RATE_LIMIT_EXCEEDED";
    case 500:
      return "SERVER_ERROR";
    case 503:
      return "SERVICE_UNAVAILABLE";
    default:
      if (status >= 400 && status < 500) {
        return "VALIDATION_ERROR";
      } else if (status >= 500) {
        return "SERVER_ERROR";
      }
      return "UNKNOWN_ERROR";
  }
}

/**
 * Create a standardized error response for frontend use
 * @param errorCode - Backend error code
 * @param details - Additional error details
 * @returns Standardized error object
 */
export function createErrorResponse(
  errorCode: string,
  details?: Record<string, any>
): {
  translationKey: string;
  code: string;
  details?: Record<string, any>;
} {
  return {
    translationKey: mapErrorCodeToTranslationKey(errorCode),
    code: errorCode,
    details,
  };
}
