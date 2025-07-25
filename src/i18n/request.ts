import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  type SupportedLocale,
} from "@/lib/i18n/types";

export default getRequestConfig(async () => {
  // Get language from middleware-set header or detect from other sources
  const headersList = await headers();
  const localeFromHeader =
    headersList.get("x-next-intl-locale") || headersList.get("x-user-language");

  // Ensure that a valid locale is used
  let locale: SupportedLocale = DEFAULT_LOCALE;
  if (
    localeFromHeader &&
    SUPPORTED_LOCALES.includes(localeFromHeader as SupportedLocale)
  ) {
    locale = localeFromHeader as SupportedLocale;
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
      locale,
      messages,
      timeZone: locale === "vi" ? "Asia/Ho_Chi_Minh" : "UTC",
      now: new Date(),
      // You can also configure other options here
      formats: {
        dateTime: {
          short: {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        },
      },
    };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);

    // Fallback to default locale messages
    const fallbackMessages = (
      await import(`../../messages/${DEFAULT_LOCALE}.json`)
    ).default;

    return {
      locale: DEFAULT_LOCALE,
      messages: fallbackMessages,
      timeZone: "UTC",
      now: new Date(),
    };
  }
});
