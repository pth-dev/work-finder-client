"use client";

import { useEffect, useState } from "react";

interface HydrationDebugProps {
  children: React.ReactNode;
  name?: string;
}

/**
 * Debug component to help identify hydration mismatch issues
 * Only use in development
 */
export function HydrationDebug({ children, name = "Component" }: HydrationDebugProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    console.log(`${name} - Hydration started`);
    setIsHydrated(true);
    console.log(`${name} - Hydration completed`);
  }, [name]);

  if (process.env.NODE_ENV === "production") {
    return <>{children}</>;
  }

  return (
    <div data-hydration-debug={name} data-hydrated={isHydrated}>
      {children}
    </div>
  );
}

/**
 * Hook to safely access browser APIs after hydration
 */
export function useSafeBrowserAPI() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient,
    safeWindow: isClient ? window : undefined,
    safeDocument: isClient ? document : undefined,
    safeLocalStorage: isClient ? localStorage : undefined,
    safeSessionStorage: isClient ? sessionStorage : undefined,
  };
}
