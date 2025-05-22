import { useState, useCallback } from 'react';
import api from '../services/api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (method: string, url: string, data?: any) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await api.request({
          method,
          url,
          data,
        });

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        return response.data;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('An unknown error occurred'),
        });
        throw error;
      }
    },
    []
  );

  const get = useCallback((url: string) => request('GET', url), [request]);
  const post = useCallback((url: string, data: any) => request('POST', url, data), [request]);
  const put = useCallback((url: string, data: any) => request('PUT', url, data), [request]);
  const del = useCallback((url: string) => request('DELETE', url), [request]);

  return {
    ...state,
    get,
    post,
    put,
    delete: del,
  };
}
