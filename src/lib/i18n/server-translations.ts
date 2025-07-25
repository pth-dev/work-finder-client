import { getTranslations, getLocale } from "next-intl/server";
import { type SupportedLocale } from "./types";

/**
 * Server-side translation utilities for Server Components
 */

/**
 * Get translations for a specific namespace in Server Components
 */
export async function getServerTranslations(namespace?: string) {
  return await getTranslations(namespace);
}

/**
 * Get current locale in Server Components
 */
export async function getServerLocale(): Promise<SupportedLocale> {
  return (await getLocale()) as SupportedLocale;
}

/**
 * Get navigation translations for Server Components
 */
export async function getServerNavigationTranslations() {
  const t = await getTranslations("navigation");

  return {
    home: t("home"),
    jobs: t("jobs"),
    companies: t("companies"),
    about: t("about"),
    contact: t("contact"),
    login: t("login"),
    register: t("register"),
    dashboard: t("dashboard"),
    profile: t("profile"),
    settings: t("settings"),
    logout: t("logout"),
  };
}

/**
 * Get common UI translations for Server Components
 */
export async function getServerCommonTranslations() {
  const t = await getTranslations("common");

  return {
    loading: t("loading"),
    error: t("error"),
    success: t("success"),
    retry: t("retry"),
    cancel: t("cancel"),
    save: t("save"),
    edit: t("edit"),
    delete: t("delete"),
    confirm: t("confirm"),
    close: t("close"),
    back: t("back"),
    next: t("next"),
    previous: t("previous"),
    search: t("search"),
    filter: t("filter"),
    sort: t("sort"),
    clear: t("clear"),
    apply: t("apply"),
    submit: t("submit"),
    reset: t("reset"),
  };
}

/**
 * Get page metadata translations for Server Components
 */
export async function getServerMetadataTranslations(page: string) {
  const t = await getTranslations(`metadata.${page}`);

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

/**
 * Format date/time for server-side rendering
 */
export async function formatServerDateTime(
  date: Date,
  options?: Intl.DateTimeFormatOptions
) {
  const locale = await getServerLocale();

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);
}

/**
 * Format number for server-side rendering
 */
export async function formatServerNumber(
  number: number,
  options?: Intl.NumberFormatOptions
) {
  const locale = await getServerLocale();
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Format currency for server-side rendering
 */
export async function formatServerCurrency(
  amount: number,
  currency: string = "VND"
) {
  const locale = await getServerLocale();
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
