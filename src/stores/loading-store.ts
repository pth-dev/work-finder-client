import { create } from 'zustand';

interface LoadingState {
  // Global loading states
  isLoading: boolean;
  loadingMessage?: string;
  
  // Specific operation loading states
  operations: Record<string, boolean>;
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void;
  setOperationLoading: (operation: string, loading: boolean) => void;
  isOperationLoading: (operation: string) => boolean;
  clearAllLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  loadingMessage: undefined,
  operations: {},

  setLoading: (loading: boolean, message?: string) => {
    set({
      isLoading: loading,
      loadingMessage: loading ? message : undefined,
    });
  },

  setOperationLoading: (operation: string, loading: boolean) => {
    set((state) => ({
      operations: {
        ...state.operations,
        [operation]: loading,
      },
      // Update global loading if any operation is loading
      isLoading: loading || Object.values({
        ...state.operations,
        [operation]: loading,
      }).some(Boolean),
    }));
  },

  isOperationLoading: (operation: string) => {
    return get().operations[operation] || false;
  },

  clearAllLoading: () => {
    set({
      isLoading: false,
      loadingMessage: undefined,
      operations: {},
    });
  },
}));