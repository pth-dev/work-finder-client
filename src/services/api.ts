import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../stores/auth-store';
import { useAppStore } from '../stores/app-store';
import type { ApiResponse, ApiError } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set loading state
    useAppStore.getState().setLoading(true);
    
    return config;
  },
  (error) => {
    useAppStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    useAppStore.getState().setLoading(false);
    return response;
  },
  async (error) => {
    useAppStore.getState().setLoading(false);
    
    const { response } = error;
    
    // Handle 401 errors (unauthorized)
    if (response?.status === 401) {
      const authStore = useAuthStore.getState();
      
      // Try to refresh token
      try {
        await authStore.refreshToken();
        // Retry the original request
        return api.request(error.config);
      } catch (refreshError) {
        // If refresh fails, logout user
        authStore.logout();
        window.location.href = '/login';
      }
    }
    
    // Handle other errors
    const apiError: ApiError = {
      message: response?.data?.message || error.message || 'An error occurred',
      code: response?.data?.code || 'UNKNOWN_ERROR',
      details: response?.data?.details,
    };
    
    // Show error notification
    useAppStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message: apiError.message,
    });
    
    return Promise.reject(apiError);
  }
);

// API methods
export const apiService = {
  // Generic methods
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.get(url, config),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.post(url, data, config),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.put(url, data, config),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.patch(url, data, config),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.delete(url, config),

  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),
      
    register: (userData: { name: string; email: string; password: string }) =>
      api.post('/auth/register', userData),
      
    logout: () =>
      api.post('/auth/logout'),
      
    refreshToken: () =>
      api.post('/auth/refresh'),
      
    forgotPassword: (email: string) =>
      api.post('/auth/forgot-password', { email }),
      
    resetPassword: (token: string, password: string) =>
      api.post('/auth/reset-password', { token, password }),
  },

  // User endpoints
  users: {
    getProfile: () =>
      api.get('/users/profile'),
      
    updateProfile: (data: any) =>
      api.put('/users/profile', data),
      
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      api.put('/users/change-password', data),
  },

  // Jobs endpoints (example for work finder app)
  jobs: {
    getJobs: (params?: any) =>
      api.get('/jobs', { params }),
      
    getJob: (id: string) =>
      api.get(`/jobs/${id}`),
      
    createJob: (data: any) =>
      api.post('/jobs', data),
      
    updateJob: (id: string, data: any) =>
      api.put(`/jobs/${id}`, data),
      
    deleteJob: (id: string) =>
      api.delete(`/jobs/${id}`),
      
    applyToJob: (id: string, data: any) =>
      api.post(`/jobs/${id}/apply`, data),
  },
};

export default api;
