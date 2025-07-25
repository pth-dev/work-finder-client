"use client";

import { useEffect, useState } from "react";

/**
 * Hook to prevent hydration mismatch by ensuring component only renders after hydration
 * Use this for components that access browser-only APIs or have different server/client state
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook for safe localStorage access that prevents hydration mismatch
 */
export function useSafeLocalStorage<T>(key: string, initialValue: T) {
  const isHydrated = useHydration();
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, isHydrated]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
