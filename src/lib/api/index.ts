// Modern API exports - using fetch() instead of axios
export * from "./auth";
export * from "./jobs";
export * from "./companies";
export * from "./applications";
export * from "./utils";
export * from "./with-auth";

// API configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  timeout: 30000,
} as const;
