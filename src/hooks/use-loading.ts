import { useEffect } from 'react';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useLoadingStore } from '@/stores/loading-store';

// Hook to integrate TanStack Query mutations with global loading
export const useMutationLoading = <TData, TError, TVariables>(
  mutation: UseMutationResult<TData, TError, TVariables>,
  operationName: string,
  options?: {
    globalLoading?: boolean;
    loadingMessage?: string;
  }
) => {
  const { setLoading, setOperationLoading } = useLoadingStore();

  useEffect(() => {
    if (options?.globalLoading) {
      setLoading(mutation.isPending, options.loadingMessage);
    } else {
      setOperationLoading(operationName, mutation.isPending);
    }
  }, [mutation.isPending, operationName, options?.globalLoading, options?.loadingMessage, setLoading, setOperationLoading]);

  return mutation;
};

// Hook to integrate TanStack Query queries with global loading
export const useQueryLoading = <TData, TError>(
  query: UseQueryResult<TData, TError>,
  operationName: string,
  options?: {
    globalLoading?: boolean;
    loadingMessage?: string;
  }
) => {
  const { setLoading, setOperationLoading } = useLoadingStore();

  useEffect(() => {
    const isLoading = query.isLoading || query.isFetching;
    
    if (options?.globalLoading) {
      setLoading(isLoading, options.loadingMessage);
    } else {
      setOperationLoading(operationName, isLoading);
    }
  }, [query.isLoading, query.isFetching, operationName, options?.globalLoading, options?.loadingMessage, setLoading, setOperationLoading]);

  return query;
};

// Simple hook for manual loading control
export const useManualLoading = () => {
  const { setLoading, setOperationLoading, isOperationLoading, clearAllLoading } = useLoadingStore();

  const startLoading = (message?: string) => setLoading(true, message);
  const stopLoading = () => setLoading(false);
  
  const startOperationLoading = (operation: string) => setOperationLoading(operation, true);
  const stopOperationLoading = (operation: string) => setOperationLoading(operation, false);

  return {
    startLoading,
    stopLoading,
    startOperationLoading,
    stopOperationLoading,
    isOperationLoading,
    clearAllLoading,
  };
};