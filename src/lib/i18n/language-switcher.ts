"use client";

import { startTransition } from "react";
import { saveLanguagePreference } from "./language-detection";
import { type SupportedLocale } from "./types";

/**
 * Optimized language switching without full page reload
 * Uses React's startTransition for better UX
 */
export function switchLanguage(newLocale: SupportedLocale) {
  // Save preference immediately
  saveLanguagePreference(newLocale);

  // Use startTransition for better UX
  startTransition(() => {
    // Set a flag to indicate language change is in progress
    document.documentElement.setAttribute("data-language-switching", "true");

    // Add loading state to body
    document.body.style.opacity = "0.8";
    document.body.style.pointerEvents = "none";

    // Small delay to show loading state, then reload
    setTimeout(() => {
      window.location.reload();
    }, 150);
  });
}

/**
 * Check if language switching is in progress
 */
export function isLanguageSwitching(): boolean {
  return document.documentElement.hasAttribute("data-language-switching");
}

/**
 * Clean up language switching state (called after reload)
 */
export function cleanupLanguageSwitching() {
  document.documentElement.removeAttribute("data-language-switching");
  document.body.style.opacity = "";
  document.body.style.pointerEvents = "";
}
