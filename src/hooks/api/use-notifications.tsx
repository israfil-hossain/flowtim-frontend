import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationsQueryFn,
  markNotificationAsReadMutationFn,
  markAllNotificationsAsReadMutationFn,
  getNotificationPreferencesQueryFn,
  updateNotificationPreferencesMutationFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useGetNotifications = ({
  userId,
  page = 1,
  limit = 20,
  isRead,
}: {
  userId: string;
  page?: number;
  limit?: number;
  isRead?: boolean;
}) => {
  return useQuery({
    queryKey: ["notifications", userId, page, limit, isRead],
    queryFn: () => getNotificationsQueryFn({ userId, page, limit, isRead }),
    enabled: !!userId,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markNotificationAsReadMutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", variables.userId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to mark notification as read",
        variant: "destructive",
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAllNotificationsAsReadMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", variables] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to mark all notifications as read",
        variant: "destructive",
      });
    },
  });
};

export const useGetNotificationPreferences = (userId: string) => {
  return useQuery({
    queryKey: ["notification-preferences", userId],
    queryFn: () => getNotificationPreferencesQueryFn(userId),
    enabled: !!userId,
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateNotificationPreferencesMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Notification preferences updated successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["notification-preferences", variables.userId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update notification preferences",
        variant: "destructive",
      });
    },
  });
};