import { useTransition as useReactTransition, useCallback } from 'react';

/**
 * Custom hook for managing transitions with better UX
 * Wraps React 18's useTransition with additional utilities
 */
export function useTransition() {
  const [isPending, startTransition] = useReactTransition();

  // Wrapper for search operations that don't need to be urgent
  const startNonUrgentUpdate = useCallback((callback: () => void) => {
    startTransition(() => {
      callback();
    });
  }, [startTransition]);

  // For filter updates
  const startFilterUpdate = useCallback((callback: () => void) => {
    startTransition(() => {
      callback();
    });
  }, [startTransition]);

  // For sort operations
  const startSortUpdate = useCallback((callback: () => void) => {
    startTransition(() => {
      callback();
    });
  }, [startTransition]);

  // For pagination that doesn't need to be immediate
  const startPaginationUpdate = useCallback((callback: () => void) => {
    startTransition(() => {
      callback();
    });
  }, [startTransition]);

  return {
    isPending,
    startTransition,
    startNonUrgentUpdate,
    startFilterUpdate,
    startSortUpdate,
    startPaginationUpdate,
  };
}