import { getCurrentUserQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = (enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: false,
    enabled: enabled, // Allow enabling/disabling from parent
  });
  return query;
};

export default useAuth;
