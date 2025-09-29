import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationsQueryFn,
  markNotificationAsReadMutationFn,
  markAllNotificationsAsReadMutationFn,
  getNotificationPreferencesQueryFn,
  updateNotificationPreferencesMutationFn,
} from "@/lib/api";
import toast from "react-hot-toast";

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", variables.userId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to mark notification as read");
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAllNotificationsAsReadMutationFn,
    onSuccess: (_, variables) => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ 
        queryKey: ["notifications", variables] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to mark all notifications as read");
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
    onSuccess: (_, variables) => {
      toast.success("Notification preferences updated successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["notification-preferences", variables.userId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update notification preferences");
    },
  });
};