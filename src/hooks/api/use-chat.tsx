import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChannelsQueryFn,
  createChannelMutationFn,
  getMessagesQueryFn,
  sendMessageMutationFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

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
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Channel created successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["channels", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create channel",
        variant: "destructive",
      });
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["messages", variables.workspaceId, variables.channelId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });
};