"use client";

import { useAuthStore } from "@/stores/user-store";
import { useEffect, useState } from "react";

/**
 * Debug component để monitor authentication state
 * Chỉ sử dụng trong development
 */
export function AuthDebug() {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuthStore();
  const [cookieInfo, setCookieInfo] = useState<string>("");

  useEffect(() => {
    // Check cookies từ client side (chỉ để debug)
    if (typeof window !== "undefined") {
      const cookies = document.cookie;
      setCookieInfo(cookies);
    }
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🐛 Auth Debug</h3>
      <div className="space-y-1">
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? "✅" : "❌"}
        </div>
        <div>
          <strong>Loading:</strong> {isLoading ? "⏳" : "✅"}
        </div>
        <div>
          <strong>Initialized:</strong> {isInitialized ? "✅" : "❌"}
        </div>
        <div>
          <strong>User:</strong> {user ? `${user.name} (${user.role})` : "None"}
        </div>
        <div>
          <strong>Cookies:</strong> {cookieInfo ? "Present" : "None"}
        </div>
        <div className="text-xs text-gray-300 mt-2">
          <strong>Cookies Detail:</strong>
          <div className="break-all">{cookieInfo || "No cookies"}</div>
        </div>
      </div>
    </div>
  );
}
