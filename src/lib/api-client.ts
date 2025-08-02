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

    console.error("API Error:", message);

    if (error.response?.status === 401) {
      // Clear auth state and redirect to login on unauthorized
      const { useAuthStore } = await import("@/stores/auth-store");
      useAuthStore.getState().clearAuth();
      window.location.href = paths.auth.login.getHref();
    }

    return Promise.reject(error);
  }
);
