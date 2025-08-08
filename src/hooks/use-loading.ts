import { useEffect } from "react";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useLoadingStore } from "@/stores/loading-store";

// Hook to integrate TanStack Query mutations with global loading
export const useMutationLoading = <TData, TError, TVariables>(
  mutation: UseMutationResult<TData, TError, TVariables>,
  operationName: string,
  options?: {
    globalLoading?: boolean;
    loadingMessage?: string;
    timeout?: number; // ✅ FIX: Add timeout option
  }
) => {
  const { setLoading, setOperationLoading } = useLoadingStore();

  useEffect(() => {
    if (options?.globalLoading) {
      setLoading(mutation.isPending, options.loadingMessage);
    } else {
      setOperationLoading(operationName, mutation.isPending);
    }

    // ✅ FIX: Add fallback timeout to clear loading state
    if (mutation.isPending && options?.timeout) {
      const timeoutId = setTimeout(() => {
        console.warn(`Loading timeout for operation: ${operationName}`);
        if (options?.globalLoading) {
          setLoading(false);
        } else {
          setOperationLoading(operationName, false);
        }
      }, options.timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [
    mutation.isPending,
    operationName,
    options?.globalLoading,
    options?.loadingMessage,
    options?.timeout,
    setLoading,
    setOperationLoading,
  ]);

  return mutation;
};

// Hook to integrate TanStack Query queries with global loading
export const useQueryLoading = <TData, TError>(
  query: UseQueryResult<TData, TError>,
  operationName: string,
  options?: {
    globalLoading?: boolean;
    loadingMessage?: string;
    timeout?: number;
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

    // ✅ FIX: Add fallback timeout to clear loading state for queries too
    if (isLoading && options?.timeout) {
      const timeoutId = setTimeout(() => {
        console.warn(`Query loading timeout for operation: ${operationName}`);
        if (options?.globalLoading) {
          setLoading(false);
        } else {
          setOperationLoading(operationName, false);
        }
      }, options.timeout);

      return () => clearTimeout(timeoutId);
    }
  }, [
    query.isLoading,
    query.isFetching,
    operationName,
    options?.globalLoading,
    options?.loadingMessage,
    options?.timeout,
    setLoading,
    setOperationLoading,
  ]);

  // ✅ FIX: Cleanup on unmount to prevent stuck loading states
  useEffect(() => {
    return () => {
      if (options?.globalLoading) {
        setLoading(false);
      } else {
        setOperationLoading(operationName, false);
      }
    };
  }, [operationName, options?.globalLoading, setLoading, setOperationLoading]);

  return query;
};

// Simple hook for manual loading control
export const useManualLoading = () => {
  const {
    setLoading,
    setOperationLoading,
    isOperationLoading,
    clearAllLoading,
  } = useLoadingStore();

  const startLoading = (message?: string) => setLoading(true, message);
  const stopLoading = () => setLoading(false);

  const startOperationLoading = (operation: string) =>
    setOperationLoading(operation, true);
  const stopOperationLoading = (operation: string) =>
    setOperationLoading(operation, false);

  return {
    startLoading,
    stopLoading,
    startOperationLoading,
    stopOperationLoading,
    isOperationLoading,
    clearAllLoading,
  };
};
