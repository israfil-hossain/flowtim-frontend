import GoogleOAuthFailure from "@/page/auth/GoogleOAuthFailure";
import GoogleOAuthSuccess from "@/page/auth/GoogleOAuthSuccess";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import WorkspaceDashboard from "@/page/workspace/Dashboard";
import Members from "@/page/workspace/Members";
import ProjectDetails from "@/page/workspace/ProjectDetails";
import Settings from "@/page/workspace/Settings";
import Tasks from "@/page/workspace/Tasks";
import TimeTracking from "@/page/workspace/TimeTracking";
import Reports from "@/page/workspace/Reports";
import Documents from "@/page/workspace/Documents";
import Files from "@/page/workspace/Files";
import Chat from "@/page/workspace/Chat";
import Notifications from "@/page/workspace/Notifications";
import ProjectTemplatesPage from "@/page/workspace/ProjectTemplates";
import Analytics from "@/page/workspace/Analytics";
import Profile from "@/page/workspace/Profile";
import Appearance from "@/page/workspace/Appearance";
import AdminDashboard from "@/page/admin/Dashboard";
import AdminUsers from "@/page/admin/Users";
import AdminWorkspaces from "@/page/admin/Workspaces";
import AdminAnalytics from "@/page/admin/Analytics";
import AdminSettings from "@/page/admin/Settings";
import AdminBilling from "@/page/admin/Billing";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES, ADMIN_ROUTES } from "./routePaths";
import InviteUser from "@/page/invite/InviteUser";
import Landing from "@/page/Landing";

export const baseRoutePaths = [
  { path: BASE_ROUTE.LANDING, element: <Landing /> },
  { path: BASE_ROUTE.INVITE, element: <InviteUser /> },
];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK_SUCCESS, element: <GoogleOAuthSuccess /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK_FAILURE, element: <GoogleOAuthFailure /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.TASKS, element: <Tasks /> },
  { path: PROTECTED_ROUTES.MEMBERS, element: <Members /> },
  { path: PROTECTED_ROUTES.SETTINGS, element: <Settings /> },
  { path: PROTECTED_ROUTES.PROJECT_DETAILS, element: <ProjectDetails /> },
  { path: PROTECTED_ROUTES.TIME_TRACKING, element: <TimeTracking /> },
  { path: PROTECTED_ROUTES.REPORTS, element: <Reports /> },
  { path: PROTECTED_ROUTES.DOCUMENTS, element: <Documents /> },
  { path: PROTECTED_ROUTES.FILES, element: <Files /> },
  { path: PROTECTED_ROUTES.CHAT, element: <Chat /> },
  { path: PROTECTED_ROUTES.NOTIFICATIONS, element: <Notifications /> },
  { path: PROTECTED_ROUTES.PROJECT_TEMPLATES, element: <ProjectTemplatesPage /> },
  { path: PROTECTED_ROUTES.ANALYTICS, element: <Analytics /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
  { path: PROTECTED_ROUTES.APPEARANCE, element: <Appearance /> },
];

export const adminRoutePaths = [
  { path: ADMIN_ROUTES.DASHBOARD, element: <AdminDashboard /> },
  { path: ADMIN_ROUTES.USERS, element: <AdminUsers /> },
  { path: ADMIN_ROUTES.WORKSPACES, element: <AdminWorkspaces /> },
  { path: ADMIN_ROUTES.ANALYTICS, element: <AdminAnalytics /> },
  { path: ADMIN_ROUTES.SETTINGS, element: <AdminSettings /> },
  { path: ADMIN_ROUTES.BILLING, element: <AdminBilling /> },
];
