import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import { useAuthContext } from "@/context/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
