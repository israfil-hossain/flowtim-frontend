export const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = [...Object.values(AUTH_ROUTES), "/"];
  return authRoutes.includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  GOOGLE_OAUTH_CALLBACK_SUCCESS: "/auth/google/callback/success",
  GOOGLE_OAUTH_CALLBACK_FAILURE: "/auth/google/callback/failure",
};

export const PROTECTED_ROUTES = {
  WORKSPACE: "/workspace/:workspaceId",
  TASKS: "/workspace/:workspaceId/tasks",
  MEMBERS: "/workspace/:workspaceId/members",
  SETTINGS: "/workspace/:workspaceId/settings",
  PROJECT_DETAILS: "/workspace/:workspaceId/project/:projectId",
  TIME_TRACKING: "/workspace/:workspaceId/time-tracking",
  REPORTS: "/workspace/:workspaceId/reports",
  DOCUMENTS: "/workspace/:workspaceId/documents",
  FILES: "/workspace/:workspaceId/files",
  CHAT: "/workspace/:workspaceId/chat",
  NOTIFICATIONS: "/workspace/:workspaceId/notifications",
  PROJECT_TEMPLATES: "/workspace/:workspaceId/project-templates",
  ANALYTICS: "/workspace/:workspaceId/analytics",
  PROFILE: "/workspace/:workspaceId/profile",
  APPEARANCE: "/workspace/:workspaceId/appearance",
};

export const BASE_ROUTE = {
  LANDING: "/",
  INVITE: "/invite/:token",
};

export const ADMIN_ROUTES = {
  DASHBOARD: "/admin",
  USERS: "/admin/users",
  WORKSPACES: "/admin/workspaces",
  ANALYTICS: "/admin/analytics",
  SETTINGS: "/admin/settings",
  BILLING: "/admin/billing",
};
