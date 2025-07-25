/**
 * HTTP Status Codes Constants
 * Standardized HTTP status codes for consistent error handling
 */

export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

/**
 * HTTP Status Code to Error Code Mapping
 * Maps HTTP status codes to standardized error codes
 */
export const HTTP_STATUS_TO_ERROR_CODE: Record<number, string> = {
  [HTTP_STATUS.BAD_REQUEST]: 'BAD_REQUEST',
  [HTTP_STATUS.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HTTP_STATUS.FORBIDDEN]: 'FORBIDDEN',
  [HTTP_STATUS.NOT_FOUND]: 'NOT_FOUND',
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'METHOD_NOT_ALLOWED',
  [HTTP_STATUS.CONFLICT]: 'CONFLICT',
  [HTTP_STATUS.VALIDATION_ERROR]: 'VALIDATION_ERROR',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'TOO_MANY_REQUESTS',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
  [HTTP_STATUS.BAD_GATEWAY]: 'BAD_GATEWAY',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
} as const;

/**
 * Check if status code indicates success
 */
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Check if status code indicates client error
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * Check if status code indicates server error
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

/**
 * Get error code from HTTP status
 */
export function getErrorCodeFromStatus(status: number): string {
  return HTTP_STATUS_TO_ERROR_CODE[status] || 'UNKNOWN_ERROR';
}
