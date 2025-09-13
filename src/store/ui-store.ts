/**
 * UI Store - Zustand
 * Global UI state management for modals, theme, layout, loading states
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface UIState {
  // Theme & Layout
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  sidebarWidth: number;
  
  // Loading states
  globalLoading: boolean;
  loadingText: string;
  loadingProgress: number;
  
  // Modal states
  modals: {
    createProject: boolean;
    createTask: boolean;
    editTask: boolean;
    deleteConfirmation: boolean;
    userProfile: boolean;
    settings: boolean;
    shortcuts: boolean;
    feedback: boolean;
  };
  
  // Notification/Toast
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    timestamp: number;
  }>;
  
  // View preferences
  viewMode: 'list' | 'grid' | 'kanban' | 'calendar';
  density: 'compact' | 'normal' | 'comfortable';
  
  // Search & filters
  globalSearchOpen: boolean;
  globalSearchQuery: string;
  quickFilters: {
    showCompleted: boolean;
    showOverdue: boolean;
    assignedToMe: boolean;
  };
  
  // Layout states
  rightPanelOpen: boolean;
  rightPanelContent: 'task-details' | 'project-info' | 'analytics' | null;
  
  // Mobile responsiveness
  isMobile: boolean;
  mobileMenuOpen: boolean;
}

export interface UIActions {
  // Theme & Layout
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarWidth: (width: number) => void;
  
  // Loading states
  setGlobalLoading: (loading: boolean, text?: string) => void;
  setLoadingProgress: (progress: number) => void;
  
  // Modal actions
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  
  // Notifications
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // View preferences
  setViewMode: (mode: UIState['viewMode']) => void;
  setDensity: (density: UIState['density']) => void;
  
  // Search & filters
  openGlobalSearch: () => void;
  closeGlobalSearch: () => void;
  setGlobalSearchQuery: (query: string) => void;
  setQuickFilter: (filter: keyof UIState['quickFilters'], value: boolean) => void;
  resetQuickFilters: () => void;
  
  // Layout
  openRightPanel: (content: NonNullable<UIState['rightPanelContent']>) => void;
  closeRightPanel: () => void;
  toggleRightPanel: () => void;
  
  // Mobile
  setIsMobile: (isMobile: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  
  // Utility
  reset: () => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  theme: 'system',
  sidebarCollapsed: false,
  sidebarWidth: 280,
  
  globalLoading: false,
  loadingText: '',
  loadingProgress: 0,
  
  modals: {
    createProject: false,
    createTask: false,
    editTask: false,
    deleteConfirmation: false,
    userProfile: false,
    settings: false,
    shortcuts: false,
    feedback: false,
  },
  
  notifications: [],
  
  viewMode: 'list',
  density: 'normal',
  
  globalSearchOpen: false,
  globalSearchQuery: '',
  quickFilters: {
    showCompleted: true,
    showOverdue: true,
    assignedToMe: false,
  },
  
  rightPanelOpen: false,
  rightPanelContent: null,
  
  isMobile: false,
  mobileMenuOpen: false,
};

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // Theme & Layout
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
            
            // Apply theme to document
            const root = document.documentElement;
            if (theme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              root.classList.toggle('dark', systemTheme === 'dark');
            } else {
              root.classList.toggle('dark', theme === 'dark');
            }
          }),
          
        toggleSidebar: () =>
          set((state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
          }),
          
        setSidebarCollapsed: (collapsed) =>
          set((state) => {
            state.sidebarCollapsed = collapsed;
          }),
          
        setSidebarWidth: (width) =>
          set((state) => {
            state.sidebarWidth = Math.max(200, Math.min(400, width));
          }),
          
        // Loading states
        setGlobalLoading: (loading, text = '') =>
          set((state) => {
            state.globalLoading = loading;
            state.loadingText = text;
            if (!loading) {
              state.loadingProgress = 0;
            }
          }),
          
        setLoadingProgress: (progress) =>
          set((state) => {
            state.loadingProgress = Math.max(0, Math.min(100, progress));
          }),
          
        // Modal actions
        openModal: (modal) =>
          set((state) => {
            state.modals[modal] = true;
          }),
          
        closeModal: (modal) =>
          set((state) => {
            state.modals[modal] = false;
          }),
          
        closeAllModals: () =>
          set((state) => {
            Object.keys(state.modals).forEach(key => {
              state.modals[key as keyof typeof state.modals] = false;
            });
          }),
          
        // Notifications
        addNotification: (notification) =>
          set((state) => {
            const id = Math.random().toString(36).substring(7);
            const timestamp = Date.now();
            
            state.notifications.unshift({
              ...notification,
              id,
              timestamp,
              duration: notification.duration || 5000,
            });
            
            // Auto-remove notification after duration
            if (notification.duration !== 0) {
              setTimeout(() => {
                get().removeNotification(id);
              }, notification.duration || 5000);
            }
          }),
          
        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id);
          }),
          
        clearNotifications: () =>
          set((state) => {
            state.notifications = [];
          }),
          
        // View preferences
        setViewMode: (mode) =>
          set((state) => {
            state.viewMode = mode;
          }),
          
        setDensity: (density) =>
          set((state) => {
            state.density = density;
          }),
          
        // Search & filters
        openGlobalSearch: () =>
          set((state) => {
            state.globalSearchOpen = true;
          }),
          
        closeGlobalSearch: () =>
          set((state) => {
            state.globalSearchOpen = false;
            state.globalSearchQuery = '';
          }),
          
        setGlobalSearchQuery: (query) =>
          set((state) => {
            state.globalSearchQuery = query;
          }),
          
        setQuickFilter: (filter, value) =>
          set((state) => {
            state.quickFilters[filter] = value;
          }),
          
        resetQuickFilters: () =>
          set((state) => {
            state.quickFilters = {
              showCompleted: true,
              showOverdue: true,
              assignedToMe: false,
            };
          }),
          
        // Layout
        openRightPanel: (content) =>
          set((state) => {
            state.rightPanelOpen = true;
            state.rightPanelContent = content;
          }),
          
        closeRightPanel: () =>
          set((state) => {
            state.rightPanelOpen = false;
            state.rightPanelContent = null;
          }),
          
        toggleRightPanel: () =>
          set((state) => {
            state.rightPanelOpen = !state.rightPanelOpen;
            if (!state.rightPanelOpen) {
              state.rightPanelContent = null;
            }
          }),
          
        // Mobile
        setIsMobile: (isMobile) =>
          set((state) => {
            state.isMobile = isMobile;
            if (!isMobile) {
              state.mobileMenuOpen = false;
            }
          }),
          
        toggleMobileMenu: () =>
          set((state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
          }),
          
        closeMobileMenu: () =>
          set((state) => {
            state.mobileMenuOpen = false;
          }),
          
        // Utility
        reset: () =>
          set((state) => {
            Object.assign(state, initialState);
          }),
      })),
      {
        name: 'flowtim-ui',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          sidebarWidth: state.sidebarWidth,
          viewMode: state.viewMode,
          density: state.density,
          quickFilters: state.quickFilters,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);

// Selectors
export const selectTheme = (state: UIStore) => state.theme;
export const selectSidebarCollapsed = (state: UIStore) => state.sidebarCollapsed;
export const selectGlobalLoading = (state: UIStore) => state.globalLoading;
export const selectModals = (state: UIStore) => state.modals;
export const selectNotifications = (state: UIStore) => state.notifications;
export const selectViewMode = (state: UIStore) => state.viewMode;
export const selectQuickFilters = (state: UIStore) => state.quickFilters;
export const selectRightPanelOpen = (state: UIStore) => state.rightPanelOpen;