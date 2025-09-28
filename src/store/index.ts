/**
 * Centralized Zustand Store Management
 * Worklenz-inspired architecture with modular store design
 */

export { useAuthStore } from './auth-store';
export { useWorkspaceStore } from './workspace-store';
export { useProjectStore } from './project-store';
export { useTaskStore } from './task-store';
export { useUIStore } from './ui-store';
export { useSettingsStore } from './settings-store';
export { useNotificationStore } from './notification-store';

// Store types for better TypeScript support
export type {
  AuthState,
  AuthActions,
} from './auth-store';

export type {
  WorkspaceState,
  WorkspaceActions,
} from './workspace-store';

export type {
  ProjectState,
  ProjectActions,
} from './project-store';

export type {
  TaskState,
  TaskActions,
} from './task-store';

export type {
  UIState,
  UIActions,
} from './ui-store';