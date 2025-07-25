export type SupportedLocale = 'en' | 'vi';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'vi'];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export interface LanguageInfo {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_INFO: Record<SupportedLocale, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
};
