import { useTranslation } from "react-i18next";
import { useToast } from "@/services/toast-service";
import { getAuthError } from "@/i18n/helpers";

/**
 * Reusable hook for handling authentication errors consistently
 * Follows DRY principle and provides standardized error handling
 */
export function useAuthErrorHandler() {
  const { t } = useTranslation();
  const toastService = useToast();

  const handleAuthError = (error: any, form?: any) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // Handle specific authentication error cases
    switch (status) {
      case 401:
        if (message === "auth.messages.login.invalidCredentials") {
          // Show validation error on form if available
          if (form) {
            form.setError("root", {
              type: "manual",
              message: getAuthError(t, "invalidCredentials"),
            });
          } else {
            toastService.error(getAuthError(t, "invalidCredentials"));
          }
        } else if (message === "auth.messages.otp.invalidOtp") {
          if (form) {
            form.setError("root", {
              type: "manual",
              message: getAuthError(t, "otpInvalid"),
            });
          } else {
            toastService.error(getAuthError(t, "otpInvalid"));
          }
        } else if (message === "auth.messages.otp.otpExpired") {
          toastService.error(getAuthError(t, "otpExpired"));
        } else {
          // Generic unauthorized error
          toastService.error(getAuthError(t, "sessionExpired"));
        }
        break;

      case 422:
        // Account not verified
        if (message === "auth.messages.login.accountNotVerified") {
          toastService.error(getAuthError(t, "accountNotVerified"));
        } else {
          toastService.error(t("common:errors.api.badRequest"));
        }
        break;

      case 423:
        // Account locked
        toastService.error(getAuthError(t, "accountLocked"));
        break;

      case 429:
        // Too many attempts
        toastService.error(getAuthError(t, "loginAttempts"));
        break;

      case 404:
        // Email not found
        if (message === "auth.messages.forgotPassword.emailNotFound") {
          if (form) {
            form.setError("email", {
              type: "manual",
              message: getAuthError(t, "emailNotFound"),
            });
          } else {
            toastService.error(getAuthError(t, "emailNotFound"));
          }
        } else {
          toastService.error(t("common:errors.api.notFound"));
        }
        break;

      case 409:
        // Email already exists
        if (message === "auth.messages.registration.emailExists") {
          if (form) {
            form.setError("email", {
              type: "manual",
              message: getAuthError(t, "emailExists"),
            });
          } else {
            toastService.error(getAuthError(t, "emailExists"));
          }
        } else {
          toastService.error(t("common:errors.api.conflict"));
        }
        break;

      default:
        // Network error or server error
        if (!error?.response) {
          toastService.error(t("common:errors.api.networkError"));
        } else {
          toastService.error(t("common:errors.api.serverError"));
        }
        break;
    }
  };

  return { handleAuthError };
}
