/**
 * Translation utilities for use in Zustand stores and other contexts
 * where React hooks are not available
 */

import { getCurrentLanguage } from './language-detection';

// Import translation files directly
import enMessages from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';

const messages = {
  en: enMessages,
  vi: viMessages,
} as const;

/**
 * Get translated message for use in stores/contexts where hooks aren't available
 * @param key - Translation key in dot notation (e.g., 'auth.loginSuccess')
 * @param params - Optional parameters for interpolation
 * @returns Translated message or key if not found
 */
export function getTranslation(key: string, params?: Record<string, any>): string {
  const locale = getCurrentLanguage();
  const messageObj = messages[locale];
  
  // Navigate through nested object using dot notation
  const keys = key.split('.');
  let value: any = messageObj;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Return key if translation not found
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string: ${key} for locale: ${locale}`);
    return key;
  }
  
  // Simple parameter interpolation
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : match;
    });
  }
  
  return value;
}

/**
 * Get auth-related translations
 */
export const authTranslations = {
  loginSuccess: () => getTranslation('auth.loginSuccess'),
  registerSuccess: () => getTranslation('auth.registerSuccess'),
  logoutSuccess: () => getTranslation('auth.logoutSuccess'),
  loginError: () => getTranslation('errors.unauthorized'),
  registerError: () => getTranslation('errors.validation'),
  sessionExpired: () => getTranslation('errors.sessionExpired'),
};

/**
 * Get common UI translations
 */
export const commonTranslations = {
  loading: () => getTranslation('common.loading'),
  error: () => getTranslation('common.error'),
  success: () => getTranslation('common.success'),
  retry: () => getTranslation('common.retry'),
  cancel: () => getTranslation('common.cancel'),
  save: () => getTranslation('common.save'),
  submit: () => getTranslation('common.submit'),
};

/**
 * Get error translations by error code
 */
export function getErrorTranslation(errorCode: string): string {
  // Map common error codes to translation keys
  const errorKeyMap: Record<string, string> = {
    'AUTH_INVALID_CREDENTIALS': 'errors.unauthorized',
    'AUTH_USER_NOT_FOUND': 'errors.unauthorized',
    'AUTH_TOKEN_EXPIRED': 'errors.sessionExpired',
    'VALIDATION_ERROR': 'errors.validation',
    'VALIDATION_EMAIL_INVALID': 'errors.emailInvalid',
    'VALIDATION_PASSWORD_REQUIRED': 'errors.passwordRequired',
    'USER_ALREADY_EXISTS': 'errors.userAlreadyExists',
    'NETWORK_ERROR': 'errors.network',
    'SERVER_ERROR': 'errors.serverError',
  };
  
  const translationKey = errorKeyMap[errorCode] || 'errors.generic';
  return getTranslation(translationKey);
}
