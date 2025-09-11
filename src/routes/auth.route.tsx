import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspacesUserIsMemberQueryFn } from "@/lib/api";

const AuthRoute = () => {
  const location = useLocation();
  const _isAuthRoute = isAuthRoute(location.pathname);
  
  // If we're on an auth route (including landing page), just show the outlet without auth checks
  if (_isAuthRoute) {
    return <Outlet />;
  }

  // Only enable auth check for non-auth routes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: authData, isLoading, error } = useAuth(true);
  const user = authData?.user;

  // Fetch user's workspaces if user is authenticated
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: workspacesData, isLoading: workspacesLoading } = useQuery({
    queryKey: ["userWorkspaces"],
    queryFn: getAllWorkspacesUserIsMemberQueryFn,
    enabled: !!user, // Only fetch if user exists
  });

  // If there's an auth error or user is explicitly null/undefined, redirect to login
  if (error || (!isLoading && !user)) {
    return <Navigate to="/sign-in" replace />;
  }

  // Show loading only for non-auth routes
  if ((isLoading || (user && workspacesLoading)) && !_isAuthRoute) {
    return <DashboardSkeleton />;
  }

  // If user is authenticated, redirect to workspace or home
  if (user) {
    const workspaces = workspacesData?.workspaces;
    if (workspaces && workspaces.length > 0) {
      // Redirect to first workspace
      return <Navigate to={`/workspace/${workspaces[0]._id}`} replace />;
    } else {
      // No workspaces, redirect to landing page
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default AuthRoute;
