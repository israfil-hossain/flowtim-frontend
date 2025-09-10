import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth(true); // Enable auth check
  const user = authData?.user;

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
