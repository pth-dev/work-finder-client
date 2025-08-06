import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

// Language code display mapping
const LANGUAGE_CODES = {
  en: "EN",
  vi: "VI",
} as const;

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language as SupportedLanguage;
  const currentLanguageCode =
    LANGUAGE_CODES[currentLanguage] || LANGUAGE_CODES.en;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-2 text-gray-700 hover:text-[#1967d2] transition-colors rounded-lg hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t("header.language.switchLanguage")}
      >
        <span className="text-sm font-semibold text-gray-600">
          {currentLanguageCode}
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 md:w-4 md:h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-[9999] animate-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => {
              const language = code as SupportedLanguage;
              const languageCode = LANGUAGE_CODES[language];
              const isActive = currentLanguage === language;

              return (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(language)}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "text-[#1967d2] bg-[#1967d2]/10 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span className="text-sm font-semibold text-gray-600 w-6">
                    {languageCode}
                  </span>
                  <span className="ml-3">{name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-[#1967d2] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
