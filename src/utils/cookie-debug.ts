/**
 * Cookie debugging utilities
 */

export function debugCookies() {
  if (typeof window === "undefined") {
    console.log("❌ Cannot debug cookies on server side");
    return;
  }

  console.log("🍪 Cookie Debug Information:");
  console.log("Current URL:", window.location.href);
  console.log("Domain:", window.location.hostname);
  console.log("Protocol:", window.location.protocol);
  
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  
  console.log("All cookies:", cookies);
  console.log("Access token exists:", !!cookies.access_token);
  console.log("Refresh token exists:", !!cookies.refresh_token);
  
  // Check if cookies are being sent in requests
  fetch('/api/test', { credentials: 'include' })
    .then(() => console.log("✅ Cookies are being sent with requests"))
    .catch(() => console.log("❌ Issue with cookie transmission"));
    
  return cookies;
}

// Auto-run in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).debugCookies = debugCookies;
  console.log("🔧 Cookie debug available at window.debugCookies()");
}
