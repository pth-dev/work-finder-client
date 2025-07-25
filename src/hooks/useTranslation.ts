"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  mapErrorCodeToTranslationKey,
  type BackendResponse,
  extractErrorInfo,
} from "@/lib/i18n/error-mapping";
import { type SupportedLocale } from "@/lib/i18n/types";
import { switchLanguage } from "@/lib/i18n/language-switcher";

/**
 * Enhanced translation hook with error handling and language switching
 */
export function useTranslation() {
  const t = useTranslations();
  const locale = useLocale() as SupportedLocale;

  /**
   * Translate a key with optional parameters
   */
  const translate = (key: string, params?: Record<string, any>) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key; // Fallback to key itself
    }
  };

  /**
   * Translate backend error response to user-friendly message
   */
  const translateError = (response: BackendResponse | string): string => {
    if (typeof response === "string") {
      // If it's just an error code string
      const translationKey = mapErrorCodeToTranslationKey(response);
      return translate(translationKey);
    }

    // If it's a full backend response
    const errorInfo = extractErrorInfo(response);
    if (!errorInfo) {
      return translate("errors.generic");
    }

    return translate(errorInfo.translationKey);
  };

  /**
   * Change language with optimized UX
   */
  const changeLanguage = (newLocale: SupportedLocale) => {
    if (newLocale === locale) return; // No change needed
    switchLanguage(newLocale);
  };

  /**
   * Get current locale
   */
  const getCurrentLocale = (): SupportedLocale => locale;

  /**
   * Check if current locale is RTL (Right-to-Left)
   */
  const isRTL = (): boolean => {
    // Add RTL languages here if needed
    const rtlLanguages: SupportedLocale[] = [];
    return rtlLanguages.includes(locale);
  };

  return {
    t: translate,
    translateError,
    changeLanguage,
    getCurrentLocale,
    isRTL,
    locale,
  };
}

/**
 * Hook for navigation translations
 */
export function useNavigationTranslation() {
  const { t } = useTranslation();

  return {
    home: t("navigation.home"),
    jobs: t("navigation.jobs"),
    companies: t("navigation.companies"),
    about: t("navigation.about"),
    contact: t("navigation.contact"),
    login: t("navigation.login"),
    register: t("navigation.register"),
    dashboard: t("navigation.dashboard"),
    profile: t("navigation.profile"),
    settings: t("navigation.settings"),
    logout: t("navigation.logout"),
  };
}

/**
 * Hook for common UI translations
 */
export function useCommonTranslation() {
  const { t } = useTranslation();

  return {
    loading: t("common.loading"),
    error: t("common.error"),
    success: t("common.success"),
    retry: t("common.retry"),
    cancel: t("common.cancel"),
    save: t("common.save"),
    edit: t("common.edit"),
    delete: t("common.delete"),
    confirm: t("common.confirm"),
    close: t("common.close"),
    back: t("common.back"),
    next: t("common.next"),
    previous: t("common.previous"),
    search: t("common.search"),
    filter: t("common.filter"),
    sort: t("common.sort"),
    clear: t("common.clear"),
    apply: t("common.apply"),
    submit: t("common.submit"),
    reset: t("common.reset"),
  };
}
