import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./locales/en.json";
import viTranslations from "./locales/vi.json";

// Define supported languages
export const SUPPORTED_LANGUAGES = {
  en: "English",
  vi: "Tiếng Việt",
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// i18n configuration
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    // Resources
    resources: {
      en: {
        translation: enTranslations,
      },
      vi: {
        translation: viTranslations,
      },
    },

    // Language detection options
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator", "htmlTag"],
      // Cache user language
      caches: ["localStorage"],
      // Exclude certain detection methods
      excludeCacheFor: ["cimode"],
    },

    // Fallback language
    fallbackLng: "en",

    // Default namespace
    defaultNS: "translation",

    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === "development",

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React options
    react: {
      // Trigger re-render when language changes
      bindI18n: "languageChanged",
      // Trigger re-render when namespace changes
      bindI18nStore: "added removed",
      // Use Suspense for loading translations
      useSuspense: false,
    },
  });

export default i18n;
