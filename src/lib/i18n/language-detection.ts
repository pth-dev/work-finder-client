import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  type SupportedLocale,
} from "./types";

const LANGUAGE_COOKIE_NAME = "user-language";
const LANGUAGE_STORAGE_KEY = "user-language";

/**
 * Detect user's preferred language on the client side
 * Priority: 1. User profile -> 2. localStorage -> 3. Browser -> 4. Default
 */
export function detectClientLanguage(
  userPreference?: string | null
): SupportedLocale {
  // 1. User is logged in and has language preference
  if (
    userPreference &&
    SUPPORTED_LOCALES.includes(userPreference as SupportedLocale)
  ) {
    return userPreference as SupportedLocale;
  }

  // Only run client-side code in browser
  if (typeof window !== "undefined") {
    // 2. Check localStorage
    try {
      const storedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (
        storedLocale &&
        SUPPORTED_LOCALES.includes(storedLocale as SupportedLocale)
      ) {
        return storedLocale as SupportedLocale;
      }
    } catch (error) {
      console.warn(
        "Could not access localStorage for language detection:",
        error
      );
    }

    // 3. Check browser language
    try {
      const browserLang = navigator.language.split("-")[0];
      if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
        return browserLang as SupportedLocale;
      }
    } catch (error) {
      console.warn("Could not access navigator.language:", error);
    }
  }

  // 4. Default fallback
  return DEFAULT_LOCALE;
}

/**
 * Save user language preference to both localStorage and cookie
 */
export function saveLanguagePreference(locale: SupportedLocale): void {
  if (typeof window === "undefined") return;

  try {
    // Save to localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);

    // Save to cookie (for server-side access)
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch (error) {
    console.error("Failed to save language preference:", error);
  }
}

/**
 * Get current language from localStorage (client-side only)
 */
export function getCurrentLanguage(): SupportedLocale {
  // Always return default on server-side
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
      return stored as SupportedLocale;
    }
  } catch (error) {
    console.warn("Could not get current language from localStorage:", error);
  }

  return DEFAULT_LOCALE;
}

/**
 * Remove language preference (reset to default)
 */
export function clearLanguagePreference(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    document.cookie = `${LANGUAGE_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch (error) {
    console.error("Failed to clear language preference:", error);
  }
}
