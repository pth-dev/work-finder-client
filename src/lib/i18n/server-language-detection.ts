import { cookies } from 'next/headers';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type SupportedLocale } from './types';

const LANGUAGE_COOKIE_NAME = 'user-language';

/**
 * Detect user's preferred language on the server side
 * Priority: 1. User profile -> 2. Cookie -> 3. Default
 */
export async function detectServerLanguage(
  userPreference?: string | null
): Promise<SupportedLocale> {
  // 1. User is logged in and has language preference
  if (userPreference && SUPPORTED_LOCALES.includes(userPreference as SupportedLocale)) {
    return userPreference as SupportedLocale;
  }

  // 2. Check cookie (server-side)
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;
    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)) {
      return cookieLocale as SupportedLocale;
    }
  } catch (error) {
    // Cookies might not be available in some contexts
    console.warn('Could not access cookies for language detection:', error);
  }

  // 3. Default fallback
  return DEFAULT_LOCALE;
}
