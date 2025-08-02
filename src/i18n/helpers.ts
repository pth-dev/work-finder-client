import { TFunction } from "react-i18next";

/**
 * Common i18n helper functions for standardized message patterns
 */

// Type definitions for common message patterns
export interface ValidationErrorOptions {
  field: string;
  min?: number;
  max?: number;
  target?: string;
  size?: number;
  types?: string;
  startField?: string;
  endField?: string;
}

export interface ApiErrorOptions {
  statusCode?: number;
  message?: string;
}

/**
 * Get standardized validation error message
 */
export const getValidationError = (
  t: TFunction,
  type:
    | "required"
    | "email"
    | "minLength"
    | "maxLength"
    | "passwordMismatch"
    | "invalidFormat"
    | "strongPassword"
    | "numeric"
    | "positive"
    | "range"
    | "unique"
    | "match"
    | "url"
    | "phoneNumber"
    | "fileSize"
    | "fileType"
    | "dateInPast"
    | "dateInFuture"
    | "startBeforeEnd"
    | "endAfterStart"
    | "termsAccepted"
    | "currentJobRequired"
    | "currentStudyRequired"
    | "salaryRange"
    | "nameFormat",
  options: ValidationErrorOptions
): string => {
  const key = `common:errors.validation.${type}`;
  return t(key, options);
};

/**
 * Get standardized API error message based on status code or error type
 */
export const getApiError = (
  t: TFunction,
  type:
    | "networkError"
    | "serverError"
    | "unauthorized"
    | "forbidden"
    | "notFound"
    | "timeout"
    | "badRequest"
    | "conflict"
    | "tooManyRequests"
    | "serviceUnavailable",
  options?: ApiErrorOptions
): string => {
  const key = `common:errors.api.${type}`;
  return t(key, options);
};

/**
 * Get standardized auth error message
 */
export const getAuthError = (
  t: TFunction,
  type:
    | "emailNotFound"
    | "invalidCredentials"
    | "emailExists"
    | "accountNotVerified"
    | "otpInvalid"
    | "otpExpired"
    | "tokenInvalid"
    | "sessionExpired"
    | "passwordWeak"
    | "accountLocked"
    | "loginAttempts"
): string => {
  const key = `common:errors.auth.${type}`;
  return t(key);
};

/**
 * Get standardized success notification message
 */
export const getSuccessMessage = (
  t: TFunction,
  type:
    | "saved"
    | "updated"
    | "deleted"
    | "created"
    | "sent"
    | "uploaded"
    | "downloaded"
    | "copied"
): string => {
  const key = `common:notifications.success.${type}`;
  return t(key);
};

/**
 * Get standardized action label
 */
export const getActionLabel = (
  t: TFunction,
  type:
    | "loading"
    | "save"
    | "cancel"
    | "submit"
    | "edit"
    | "delete"
    | "search"
    | "filter"
    | "sort"
    | "apply"
    | "close"
    | "back"
    | "next"
    | "previous"
    | "reset"
    | "confirm"
    | "retry"
    | "refresh"
    | "continue"
    | "skip"
): string => {
  const key = `common:actions.${type}`;
  return t(key);
};

/**
 * Get standardized field label
 */
export const getFieldLabel = (
  t: TFunction,
  type:
    | "email"
    | "password"
    | "confirmPassword"
    | "currentPassword"
    | "newPassword"
    | "fullName"
    | "firstName"
    | "lastName"
    | "phone"
    | "address"
    | "city"
    | "country"
    | "company"
    | "position"
    | "description"
    | "title"
    | "content"
    | "category"
    | "tags"
    | "date"
    | "time"
    | "status"
    | "type"
    | "priority"
): string => {
  const key = `common:fields.${type}`;
  return t(key);
};

/**
 * Map HTTP status codes to API error types
 */
export const mapStatusCodeToError = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return "badRequest";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "notFound";
    case 408:
      return "timeout";
    case 409:
      return "conflict";
    case 429:
      return "tooManyRequests";
    case 500:
    case 502:
    case 503:
      return "serverError";
    case 504:
      return "timeout";
    default:
      return "serverError";
  }
};

/**
 * Get API error message from HTTP status code
 */
export const getApiErrorFromStatus = (
  t: TFunction,
  statusCode: number,
  options?: ApiErrorOptions
): string => {
  const errorType = mapStatusCodeToError(statusCode);
  return getApiError(t, errorType as any, options);
};

/**
 * Common form validation error handler
 */
export const getFormValidationError = (
  t: TFunction,
  fieldName: string,
  validationType: string,
  validationOptions?: any
): string => {
  const field = getFieldLabel(t, fieldName as any);

  switch (validationType) {
    case "required":
      return getValidationError(t, "required", { field });
    case "email":
      return getValidationError(t, "email", { field });
    case "minLength":
      return getValidationError(t, "minLength", {
        field,
        min: validationOptions?.min,
      });
    case "maxLength":
      return getValidationError(t, "maxLength", {
        field,
        max: validationOptions?.max,
      });
    case "passwordMismatch":
      return getValidationError(t, "passwordMismatch", { field });
    case "strongPassword":
      return getValidationError(t, "strongPassword", { field });
    default:
      return getValidationError(t, "invalidFormat", { field });
  }
};

/**
 * Enhanced toast service integration
 */
export const createToastHelpers = (t: TFunction) => ({
  success: {
    saved: () => getSuccessMessage(t, "saved"),
    updated: () => getSuccessMessage(t, "updated"),
    deleted: () => getSuccessMessage(t, "deleted"),
    created: () => getSuccessMessage(t, "created"),
    sent: () => getSuccessMessage(t, "sent"),
  },
  error: {
    validation: (field: string, type: string, options?: any) =>
      getFormValidationError(t, field, type, options),
    api: (statusCode: number) => getApiErrorFromStatus(t, statusCode),
    auth: (type: string) => getAuthError(t, type as any),
    network: () => getApiError(t, "networkError"),
  },
  action: {
    loading: () => getActionLabel(t, "loading"),
    save: () => getActionLabel(t, "save"),
    cancel: () => getActionLabel(t, "cancel"),
    submit: () => getActionLabel(t, "submit"),
    retry: () => getActionLabel(t, "retry"),
  },
});
