import { create } from 'zustand';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  
  // Notification state
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: number;
  }>;
  
  // Modal state
  modals: Record<string, boolean>;
  
  // Search state
  globalSearch: string;
}

interface AppStore extends AppState {
  // UI Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  
  // Notification actions
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Modal actions
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  
  // Search actions
  setGlobalSearch: (search: string) => void;
  clearGlobalSearch: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  sidebarCollapsed: false,
  theme: 'light',
  loading: false,
  notifications: [],
  modals: {},
  globalSearch: '',

  // UI Actions
  toggleSidebar: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    // You can also update the document class or localStorage here
    document.documentElement.setAttribute('data-theme', theme);
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // Notification actions
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();
    
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id, timestamp },
      ],
    }));

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Modal actions
  openModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    }));
  },

  closeModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    }));
  },

  toggleModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] },
    }));
  },

  // Search actions
  setGlobalSearch: (search: string) => {
    set({ globalSearch: search });
  },

  clearGlobalSearch: () => {
    set({ globalSearch: '' });
  },
}));
