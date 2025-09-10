import { getCurrentUserQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = (enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if it's an auth error (401)
      if (error?.response?.status === 401) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    enabled: enabled, // Allow enabling/disabling from parent
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnReconnect: false, // Prevent refetch on reconnect
  });
  return query;
};

export default useAuth;
