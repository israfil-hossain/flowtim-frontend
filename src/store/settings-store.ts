/**
 * Settings Store - Zustand
 * User preferences, app settings, and configuration
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface NotificationSettings {
  email: {
    taskAssigned: boolean;
    taskDue: boolean;
    projectUpdates: boolean;
    mentions: boolean;
    newsletters: boolean;
  };
  push: {
    taskAssigned: boolean;
    taskDue: boolean;
    projectUpdates: boolean;
    mentions: boolean;
  };
  inApp: {
    taskAssigned: boolean;
    taskDue: boolean;
    projectUpdates: boolean;
    mentions: boolean;
    sounds: boolean;
  };
}

export interface SettingsState {
  // User Preferences
  language: string;
  timezone: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';
  weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
  
  // UI Preferences
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  showAvatars: boolean;
  animationsEnabled: boolean;
  
  // Dashboard Settings
  defaultView: 'dashboard' | 'projects' | 'tasks' | 'calendar';
  itemsPerPage: number;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
  
  // Task Settings
  defaultTaskView: 'list' | 'kanban' | 'calendar';
  showCompletedTasks: boolean;
  autoCompleteSubtasks: boolean;
  taskCreationDefaults: {
    priority: string;
    assignToSelf: boolean;
    setDueDate: boolean;
    dueDateOffset: number; // days
  };
  
  // Notification Settings
  notifications: NotificationSettings;
  
  // Keyboard Shortcuts
  keyboardShortcuts: {
    enabled: boolean;
    shortcuts: Record<string, string>;
  };
  
  // Privacy & Security
  privacy: {
    showOnlineStatus: boolean;
    allowDataCollection: boolean;
    shareUsageStats: boolean;
  };
  
  // Advanced Settings
  advanced: {
    developerMode: boolean;
    debugMode: boolean;
    betaFeatures: boolean;
  };
}

export interface SettingsActions {
  // General settings
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
  setDateFormat: (format: SettingsState['dateFormat']) => void;
  setTimeFormat: (format: SettingsState['timeFormat']) => void;
  setWeekStartsOn: (day: SettingsState['weekStartsOn']) => void;
  
  // UI settings
  setTheme: (theme: SettingsState['theme']) => void;
  setCompactMode: (enabled: boolean) => void;
  setShowAvatars: (enabled: boolean) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  
  // Dashboard settings
  setDefaultView: (view: SettingsState['defaultView']) => void;
  setItemsPerPage: (count: number) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (seconds: number) => void;
  
  // Task settings
  setDefaultTaskView: (view: SettingsState['defaultTaskView']) => void;
  setShowCompletedTasks: (show: boolean) => void;
  setAutoCompleteSubtasks: (enabled: boolean) => void;
  setTaskCreationDefaults: (defaults: Partial<SettingsState['taskCreationDefaults']>) => void;
  
  // Notification settings
  setNotificationSetting: (
    type: keyof NotificationSettings,
    setting: keyof NotificationSettings['email'],
    enabled: boolean
  ) => void;
  
  // Keyboard shortcuts
  setKeyboardShortcutsEnabled: (enabled: boolean) => void;
  setKeyboardShortcut: (action: string, shortcut: string) => void;
  resetKeyboardShortcuts: () => void;
  
  // Privacy settings
  setPrivacySetting: (setting: keyof SettingsState['privacy'], enabled: boolean) => void;
  
  // Advanced settings
  setAdvancedSetting: (setting: keyof SettingsState['advanced'], enabled: boolean) => void;
  
  // Utility
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

type SettingsStore = SettingsState & SettingsActions;

const defaultNotifications: NotificationSettings = {
  email: {
    taskAssigned: true,
    taskDue: true,
    projectUpdates: false,
    mentions: true,
    newsletters: false,
  },
  push: {
    taskAssigned: true,
    taskDue: true,
    projectUpdates: false,
    mentions: true,
  },
  inApp: {
    taskAssigned: true,
    taskDue: true,
    projectUpdates: true,
    mentions: true,
    sounds: true,
  },
};

const defaultKeyboardShortcuts = {
  'global.search': 'cmd+k',
  'task.create': 'cmd+n',
  'project.create': 'cmd+shift+n',
  'navigation.dashboard': 'g+d',
  'navigation.projects': 'g+p',
  'navigation.tasks': 'g+t',
  'navigation.calendar': 'g+c',
  'view.toggle': 'v',
  'theme.toggle': 'cmd+shift+t',
};

const initialState: SettingsState = {
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  weekStartsOn: 1,
  
  theme: 'system',
  compactMode: false,
  showAvatars: true,
  animationsEnabled: true,
  
  defaultView: 'dashboard',
  itemsPerPage: 20,
  autoRefresh: false,
  refreshInterval: 60,
  
  defaultTaskView: 'list',
  showCompletedTasks: false,
  autoCompleteSubtasks: true,
  taskCreationDefaults: {
    priority: 'MEDIUM',
    assignToSelf: false,
    setDueDate: false,
    dueDateOffset: 7,
  },
  
  notifications: defaultNotifications,
  
  keyboardShortcuts: {
    enabled: true,
    shortcuts: defaultKeyboardShortcuts,
  },
  
  privacy: {
    showOnlineStatus: true,
    allowDataCollection: true,
    shareUsageStats: false,
  },
  
  advanced: {
    developerMode: false,
    debugMode: false,
    betaFeatures: false,
  },
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // General settings
        setLanguage: (language) =>
          set((state) => {
            state.language = language;
          }),
          
        setTimezone: (timezone) =>
          set((state) => {
            state.timezone = timezone;
          }),
          
        setDateFormat: (format) =>
          set((state) => {
            state.dateFormat = format;
          }),
          
        setTimeFormat: (format) =>
          set((state) => {
            state.timeFormat = format;
          }),
          
        setWeekStartsOn: (day) =>
          set((state) => {
            state.weekStartsOn = day;
          }),
          
        // UI settings
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
            
            // Apply theme
            const root = document.documentElement;
            if (theme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              root.classList.toggle('dark', systemTheme === 'dark');
            } else {
              root.classList.toggle('dark', theme === 'dark');
            }
          }),
          
        setCompactMode: (enabled) =>
          set((state) => {
            state.compactMode = enabled;
          }),
          
        setShowAvatars: (enabled) =>
          set((state) => {
            state.showAvatars = enabled;
          }),
          
        setAnimationsEnabled: (enabled) =>
          set((state) => {
            state.animationsEnabled = enabled;
          }),
          
        // Dashboard settings
        setDefaultView: (view) =>
          set((state) => {
            state.defaultView = view;
          }),
          
        setItemsPerPage: (count) =>
          set((state) => {
            state.itemsPerPage = Math.max(10, Math.min(100, count));
          }),
          
        setAutoRefresh: (enabled) =>
          set((state) => {
            state.autoRefresh = enabled;
          }),
          
        setRefreshInterval: (seconds) =>
          set((state) => {
            state.refreshInterval = Math.max(10, Math.min(600, seconds));
          }),
          
        // Task settings
        setDefaultTaskView: (view) =>
          set((state) => {
            state.defaultTaskView = view;
          }),
          
        setShowCompletedTasks: (show) =>
          set((state) => {
            state.showCompletedTasks = show;
          }),
          
        setAutoCompleteSubtasks: (enabled) =>
          set((state) => {
            state.autoCompleteSubtasks = enabled;
          }),
          
        setTaskCreationDefaults: (defaults) =>
          set((state) => {
            state.taskCreationDefaults = { ...state.taskCreationDefaults, ...defaults };
          }),
          
        // Notification settings
        setNotificationSetting: (type, setting, enabled) =>
          set((state) => {
            state.notifications[type][setting] = enabled;
          }),
          
        // Keyboard shortcuts
        setKeyboardShortcutsEnabled: (enabled) =>
          set((state) => {
            state.keyboardShortcuts.enabled = enabled;
          }),
          
        setKeyboardShortcut: (action, shortcut) =>
          set((state) => {
            state.keyboardShortcuts.shortcuts[action] = shortcut;
          }),
          
        resetKeyboardShortcuts: () =>
          set((state) => {
            state.keyboardShortcuts.shortcuts = { ...defaultKeyboardShortcuts };
          }),
          
        // Privacy settings
        setPrivacySetting: (setting, enabled) =>
          set((state) => {
            state.privacy[setting] = enabled;
          }),
          
        // Advanced settings
        setAdvancedSetting: (setting, enabled) =>
          set((state) => {
            state.advanced[setting] = enabled;
          }),
          
        // Utility
        resetToDefaults: () =>
          set((state) => {
            Object.assign(state, initialState);
          }),
          
        exportSettings: () => {
          const state = get();
          return JSON.stringify(state, null, 2);
        },
        
        importSettings: (settingsJson) => {
          try {
            const settings = JSON.parse(settingsJson);
            set((state) => {
              Object.assign(state, { ...initialState, ...settings });
            });
            return true;
          } catch {
            return false;
          }
        },
      })),
      {
        name: 'flowtim-settings',
      }
    ),
    { name: 'SettingsStore' }
  )
);

// Selectors
export const selectLanguage = (state: SettingsStore) => state.language;
export const selectTheme = (state: SettingsStore) => state.theme;
export const selectNotifications = (state: SettingsStore) => state.notifications;
export const selectKeyboardShortcuts = (state: SettingsStore) => state.keyboardShortcuts;