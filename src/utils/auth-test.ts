/**
 * Utility functions để test authentication
 * Chỉ sử dụng trong development
 */

import { getCurrentUser } from "@/lib/api/auth";

/**
 * Test getCurrentUser API call
 */
export async function testGetCurrentUser() {
  console.log("🧪 Testing getCurrentUser API...");
  
  try {
    const user = await getCurrentUser();
    console.log("✅ getCurrentUser success:", user);
    return { success: true, user };
  } catch (error) {
    console.error("❌ getCurrentUser failed:", error);
    return { success: false, error };
  }
}

/**
 * Test cookies
 */
export function testCookies() {
  console.log("🧪 Testing cookies...");
  
  if (typeof window === "undefined") {
    console.log("❌ Running on server, cannot check cookies");
    return { success: false, error: "Server-side" };
  }
  
  const cookies = document.cookie;
  const hasAccessToken = cookies.includes("access_token");
  
  console.log("🍪 All cookies:", cookies);
  console.log("🔑 Has access_token:", hasAccessToken);
  
  return { success: true, cookies, hasAccessToken };
}

/**
 * Run all auth tests
 */
export async function runAuthTests() {
  console.log("🚀 Running authentication tests...");
  
  const cookieTest = testCookies();
  const apiTest = await testGetCurrentUser();
  
  console.log("📊 Test Results:", {
    cookies: cookieTest,
    api: apiTest,
  });
  
  return {
    cookies: cookieTest,
    api: apiTest,
  };
}

// Expose to window for manual testing
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).authTest = {
    testGetCurrentUser,
    testCookies,
    runAuthTests,
  };
  
  console.log("🔧 Auth test utilities available at window.authTest");
}
