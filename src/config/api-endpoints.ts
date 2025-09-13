/**
 * Centralized API Endpoints Configuration
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    GOOGLE_AUTH: '/auth/google',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // User Management
  USER: {
    CURRENT: '/user/current',
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    AVATAR: '/user/avatar',
    PREFERENCES: '/user/preferences',
    NOTIFICATIONS: '/user/notifications',
    ACTIVITY: '/user/activity',
  },

  // Workspace Management
  WORKSPACE: {
    CREATE: '/workspace/create/new',
    ALL: '/workspace/all',
    BY_ID: (id: string) => `/workspace/${id}`,
    UPDATE: (id: string) => `/workspace/update/${id}`,
    DELETE: (id: string) => `/workspace/delete/${id}`,
    MEMBERS: (id: string) => `/workspace/members/${id}`,
    ANALYTICS: (id: string) => `/workspace/analytics/${id}`,
    INVITE: (id: string) => `/workspace/invite/${id}`,
    CHANGE_MEMBER_ROLE: (id: string) => `/workspace/change/member/role/${id}`,
    SETTINGS: (id: string) => `/workspace/settings/${id}`,
  },

  // Project Management
  PROJECT: {
    CREATE: (workspaceId: string) => `/project/workspace/${workspaceId}/create`,
    ALL: (workspaceId: string) => `/project/workspace/${workspaceId}/all`,
    BY_ID: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}`,
    UPDATE: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}/update`,
    DELETE: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}/delete`,
    ANALYTICS: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}/analytics`,
    MEMBERS: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}/members`,
    TEMPLATES: '/project/templates',
    DUPLICATE: (projectId: string, workspaceId: string) => `/project/${projectId}/workspace/${workspaceId}/duplicate`,
  },

  // Task Management
  TASK: {
    CREATE: (projectId: string, workspaceId: string) => `/task/project/${projectId}/workspace/${workspaceId}/create`,
    ALL: (workspaceId: string) => `/task/workspace/${workspaceId}/all`,
    BY_ID: (taskId: string, workspaceId: string) => `/task/${taskId}/workspace/${workspaceId}`,
    UPDATE: (taskId: string, projectId: string, workspaceId: string) => 
      `/task/${taskId}/project/${projectId}/workspace/${workspaceId}/update`,
    DELETE: (taskId: string, workspaceId: string) => `/task/${taskId}/workspace/${workspaceId}/delete`,
    COMMENTS: (taskId: string) => `/task/${taskId}/comments`,
    ATTACHMENTS: (taskId: string) => `/task/${taskId}/attachments`,
    SUBTASKS: (taskId: string) => `/task/${taskId}/subtasks`,
    TIME_LOG: (taskId: string) => `/task/${taskId}/time-log`,
    BULK_UPDATE: (workspaceId: string) => `/task/workspace/${workspaceId}/bulk-update`,
  },

  // Member Management
  MEMBER: {
    INVITE: '/member/invite',
    JOIN_WORKSPACE: (inviteCode: string) => `/member/workspace/${inviteCode}/join`,
    REMOVE: (memberId: string, workspaceId: string) => `/member/${memberId}/workspace/${workspaceId}/remove`,
    UPDATE_ROLE: (memberId: string, workspaceId: string) => `/member/${memberId}/workspace/${workspaceId}/role`,
  },

  // Time Tracking
  TIME_TRACKING: {
    START: '/time-tracking/start',
    STOP: '/time-tracking/stop',
    ENTRIES: '/time-tracking/entries',
    SUMMARY: '/time-tracking/summary',
    REPORTS: '/time-tracking/reports',
    TIMESHEETS: '/time-tracking/timesheets',
  },

  // Analytics & Reports
  ANALYTICS: {
    DASHBOARD: (workspaceId: string) => `/analytics/dashboard/${workspaceId}`,
    PRODUCTIVITY: (workspaceId: string) => `/analytics/productivity/${workspaceId}`,
    TEAM_PERFORMANCE: (workspaceId: string) => `/analytics/team-performance/${workspaceId}`,
    PROJECT_INSIGHTS: (projectId: string) => `/analytics/project-insights/${projectId}`,
    CUSTOM_REPORTS: '/analytics/custom-reports',
    EXPORT: '/analytics/export',
  },

  // File Management
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (fileId: string) => `/files/download/${fileId}`,
    DELETE: (fileId: string) => `/files/delete/${fileId}`,
    LIST: '/files/list',
    SHARE: (fileId: string) => `/files/share/${fileId}`,
  },

  // Notifications
  NOTIFICATIONS: {
    ALL: '/notifications',
    MARK_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    SETTINGS: '/notifications/settings',
    SUBSCRIBE: '/notifications/subscribe',
    UNSUBSCRIBE: '/notifications/unsubscribe',
  },

  // Search
  SEARCH: {
    GLOBAL: '/search/global',
    TASKS: '/search/tasks',
    PROJECTS: '/search/projects',
    MEMBERS: '/search/members',
    FILES: '/search/files',
  },

  // Integration
  INTEGRATIONS: {
    LIST: '/integrations',
    CONNECT: (provider: string) => `/integrations/connect/${provider}`,
    DISCONNECT: (provider: string) => `/integrations/disconnect/${provider}`,
    SETTINGS: (provider: string) => `/integrations/settings/${provider}`,
  },

  // Admin
  ADMIN: {
    USERS: '/admin/users',
    WORKSPACES: '/admin/workspaces',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    BILLING: '/admin/billing',
  },
} as const;

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API Error Types
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}

// Query Keys for TanStack Query
export const QUERY_KEYS = {
  // Auth
  CURRENT_USER: ['user', 'current'] as const,
  
  // Workspaces
  WORKSPACES: ['workspaces'] as const,
  WORKSPACE: (id: string) => ['workspace', id] as const,
  WORKSPACE_MEMBERS: (id: string) => ['workspace', id, 'members'] as const,
  WORKSPACE_ANALYTICS: (id: string) => ['workspace', id, 'analytics'] as const,
  
  // Projects
  PROJECTS: (workspaceId: string) => ['projects', workspaceId] as const,
  PROJECT: (projectId: string, workspaceId: string) => ['project', projectId, workspaceId] as const,
  PROJECT_ANALYTICS: (projectId: string, workspaceId: string) => ['project', projectId, workspaceId, 'analytics'] as const,
  
  // Tasks
  TASKS: (workspaceId: string) => ['tasks', workspaceId] as const,
  TASK: (taskId: string, workspaceId: string) => ['task', taskId, workspaceId] as const,
  TASK_COMMENTS: (taskId: string) => ['task', taskId, 'comments'] as const,
  
  // Analytics
  DASHBOARD_ANALYTICS: (workspaceId: string) => ['analytics', 'dashboard', workspaceId] as const,
  PRODUCTIVITY_ANALYTICS: (workspaceId: string) => ['analytics', 'productivity', workspaceId] as const,
  
  // Time Tracking
  TIME_ENTRIES: ['time-tracking', 'entries'] as const,
  TIME_SUMMARY: ['time-tracking', 'summary'] as const,
  
  // Search
  SEARCH_RESULTS: (query: string, type: string) => ['search', type, query] as const,
} as const;

// Mutation Keys
export const MUTATION_KEYS = {
  // Auth
  LOGIN: 'auth.login',
  REGISTER: 'auth.register',
  LOGOUT: 'auth.logout',
  
  // Workspaces
  CREATE_WORKSPACE: 'workspace.create',
  UPDATE_WORKSPACE: 'workspace.update',
  DELETE_WORKSPACE: 'workspace.delete',
  
  // Projects
  CREATE_PROJECT: 'project.create',
  UPDATE_PROJECT: 'project.update',
  DELETE_PROJECT: 'project.delete',
  
  // Tasks
  CREATE_TASK: 'task.create',
  UPDATE_TASK: 'task.update',
  DELETE_TASK: 'task.delete',
  BULK_UPDATE_TASKS: 'task.bulkUpdate',
  
  // Time Tracking
  START_TIMER: 'timeTracking.start',
  STOP_TIMER: 'timeTracking.stop',
} as const;