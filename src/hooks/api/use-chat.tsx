import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChannelsQueryFn,
  createChannelMutationFn,
  getMessagesQueryFn,
  sendMessageMutationFn,
} from "@/lib/api";
import toast from "react-hot-toast";

export const useGetChannels = (workspaceId: string) => {
  return useQuery({
    queryKey: ["channels", workspaceId],
    queryFn: () => getChannelsQueryFn(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createChannelMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Channel created successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["channels", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create channel");
    },
  });
};

export const useGetMessages = ({
  workspaceId,
  channelId,
  page = 1,
  limit = 50,
}: {
  workspaceId: string;
  channelId: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["messages", workspaceId, channelId, page, limit],
    queryFn: () => getMessagesQueryFn({ workspaceId, channelId, page, limit }),
    enabled: !!workspaceId && !!channelId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: sendMessageMutationFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["messages", variables.workspaceId, variables.channelId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send message");
    },
  });
};