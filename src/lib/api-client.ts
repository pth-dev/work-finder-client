import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { paths } from "@/config/paths";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const message = error.response?.data?.message || error.message;
    const originalRequest = error.config;

    console.error("API Error:", message);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ✅ Check if user is still authenticated before trying to refresh
      const { useAuthStore } = await import("@/stores/auth-store");
      const authState = useAuthStore.getState();

      // If user is not authenticated, don't try to refresh
      if (!authState.isAuthenticated) {
        return Promise.reject(error);
      }

      // Skip refresh for auth endpoints to prevent loops
      if (originalRequest.url?.includes("/auth/")) {
        authState.clearAuth();
        window.location.href = paths.auth.login.getHref();
        return Promise.reject(error);
      }

      try {
        await api.post("/auth/refresh");

        try {
          const userResponse = await api.get("/users/me");
          authState.setUser(userResponse.data);
        } catch (userError) {
          console.warn(
            "Failed to fetch user info after token refresh:",
            userError
          );
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        authState.clearAuth();
        window.location.href = paths.auth.login.getHref();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
