"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  cleanupLanguageSwitching,
  isLanguageSwitching,
} from "@/lib/i18n/language-switcher";

/**
 * Component to handle language switching loading state
 * Should be placed in the root layout
 */
export function LanguageLoadingHandler() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we're in the middle of a language switch
    if (isLanguageSwitching()) {
      setIsLoading(true);
      // Clean up after a short delay
      setTimeout(() => {
        cleanupLanguageSwitching();
        setIsLoading(false);
      }, 100);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Switching language...</span>
      </div>
    </div>
  );
}

/**
 * Hook to detect language switching state
 */
export function useLanguageSwitching() {
  const [isSwitching, setIsSwitching] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const checkSwitching = () => {
      setIsSwitching(isLanguageSwitching());
    };

    // Check initially
    checkSwitching();

    // Listen for changes
    const observer = new MutationObserver(checkSwitching);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-language-switching"],
    });

    return () => observer.disconnect();
  }, [isHydrated]);

  return isSwitching;
}
