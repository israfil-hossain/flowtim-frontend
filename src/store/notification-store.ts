/**
 * Notification Store - Zustand
 * Real-time notifications, alerts, and toast management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  persistent?: boolean;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
    primary?: boolean;
  }>;
  data?: any; // Additional data for the notification
}

export interface NotificationState {
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Toast notifications (temporary)
  toasts: Notification[];
  
  // UI State
  showNotificationPanel: boolean;
  notificationSound: boolean;
  
  // Settings
  maxNotifications: number;
  defaultDuration: number;
}

export interface NotificationActions {
  // Add notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  addToast: (toast: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  
  // Success shortcuts
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  
  // Remove notifications
  removeNotification: (id: string) => void;
  removeToast: (id: string) => void;
  clearAllNotifications: () => void;
  clearAllToasts: () => void;
  
  // Mark as read
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  
  // UI actions
  showNotifications: () => void;
  hideNotifications: () => void;
  toggleNotifications: () => void;
  
  // Settings
  setNotificationSound: (enabled: boolean) => void;
  setMaxNotifications: (max: number) => void;
  setDefaultDuration: (duration: number) => void;
  
  // Utility
  getNotificationById: (id: string) => Notification | null;
  getUnreadNotifications: () => Notification[];
  playNotificationSound: () => void;
  
  // Reset
  reset: () => void;
}

type NotificationStore = NotificationState & NotificationActions;

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  toasts: [],
  showNotificationPanel: false,
  notificationSound: true,
  maxNotifications: 100,
  defaultDuration: 5000,
};

// Notification sound
const playNotificationAudio = () => {
  if (typeof window !== 'undefined' && 'Audio' in window) {
    try {
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Ignore audio play errors (e.g., user hasn't interacted with page)
      });
    } catch {
      // Audio not supported or file not found
    }
  }
};

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      
      // Add notifications
      addNotification: (notificationData) =>
        set((state) => {
          const id = Math.random().toString(36).substring(7);
          const timestamp = Date.now();
          
          const notification: Notification = {
            ...notificationData,
            id,
            timestamp,
            read: false,
          };
          
          state.notifications.unshift(notification);
          state.unreadCount += 1;
          
          // Limit notifications
          if (state.notifications.length > state.maxNotifications) {
            state.notifications = state.notifications.slice(0, state.maxNotifications);
          }
          
          // Play sound if enabled
          if (state.notificationSound) {
            get().playNotificationSound();
          }
        }),
        
      addToast: (toastData) =>
        set((state) => {
          const id = Math.random().toString(36).substring(7);
          const timestamp = Date.now();
          
          const toast: Notification = {
            ...toastData,
            id,
            timestamp,
            read: true, // Toasts are considered read immediately
            duration: toastData.duration || state.defaultDuration,
          };
          
          state.toasts.unshift(toast);
          
          // Auto-remove toast after duration
          if (toast.duration && toast.duration > 0) {
            setTimeout(() => {
              get().removeToast(id);
            }, toast.duration);
          }
        }),
        
      // Shortcut methods
      success: (title, message = '', duration) =>
        get().addToast({
          type: 'success',
          title,
          message,
          duration,
        }),
        
      error: (title, message = '', duration = 0) => // Error toasts persist by default
        get().addToast({
          type: 'error',
          title,
          message,
          duration,
          persistent: duration === 0,
        }),
        
      warning: (title, message = '', duration) =>
        get().addToast({
          type: 'warning',
          title,
          message,
          duration,
        }),
        
      info: (title, message = '', duration) =>
        get().addToast({
          type: 'info',
          title,
          message,
          duration,
        }),
        
      // Remove notifications
      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (notification && !notification.read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.notifications = state.notifications.filter(n => n.id !== id);
        }),
        
      removeToast: (id) =>
        set((state) => {
          state.toasts = state.toasts.filter(t => t.id !== id);
        }),
        
      clearAllNotifications: () =>
        set((state) => {
          state.notifications = [];
          state.unreadCount = 0;
        }),
        
      clearAllToasts: () =>
        set((state) => {
          state.toasts = [];
        }),
        
      // Mark as read
      markAsRead: (id) =>
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (notification && !notification.read) {
            notification.read = true;
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }),
        
      markAllAsRead: () =>
        set((state) => {
          state.notifications.forEach(n => {
            n.read = true;
          });
          state.unreadCount = 0;
        }),
        
      // UI actions
      showNotifications: () =>
        set((state) => {
          state.showNotificationPanel = true;
        }),
        
      hideNotifications: () =>
        set((state) => {
          state.showNotificationPanel = false;
        }),
        
      toggleNotifications: () =>
        set((state) => {
          state.showNotificationPanel = !state.showNotificationPanel;
        }),
        
      // Settings
      setNotificationSound: (enabled) =>
        set((state) => {
          state.notificationSound = enabled;
        }),
        
      setMaxNotifications: (max) =>
        set((state) => {
          state.maxNotifications = Math.max(10, Math.min(500, max));
          
          // Trim notifications if needed
          if (state.notifications.length > state.maxNotifications) {
            const removed = state.notifications.slice(state.maxNotifications);
            const unreadRemoved = removed.filter(n => !n.read).length;
            state.notifications = state.notifications.slice(0, state.maxNotifications);
            state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);
          }
        }),
        
      setDefaultDuration: (duration) =>
        set((state) => {
          state.defaultDuration = Math.max(1000, Math.min(30000, duration));
        }),
        
      // Utility functions
      getNotificationById: (id) => {
        const state = get();
        return state.notifications.find(n => n.id === id) || null;
      },
      
      getUnreadNotifications: () => {
        const state = get();
        return state.notifications.filter(n => !n.read);
      },
      
      playNotificationSound: () => {
        const state = get();
        if (state.notificationSound) {
          playNotificationAudio();
        }
      },
      
      // Reset
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    })),
    { name: 'NotificationStore' }
  )
);

// Selectors
export const selectNotifications = (state: NotificationStore) => state.notifications;
export const selectUnreadCount = (state: NotificationStore) => state.unreadCount;
export const selectToasts = (state: NotificationStore) => state.toasts;
export const selectShowNotificationPanel = (state: NotificationStore) => state.showNotificationPanel;

// Hook for easy toast usage
export const useToast = () => {
  const { success, error, warning, info, removeToast } = useNotificationStore();
  
  return {
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
  };
};