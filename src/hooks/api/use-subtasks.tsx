import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubtasksQueryFn,
  createSubtaskMutationFn,
  updateSubtaskMutationFn,
  deleteSubtaskMutationFn,
  getTaskProgressQueryFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useGetSubtasks = ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}) => {
  return useQuery({
    queryKey: ["subtasks", workspaceId, taskId],
    queryFn: () => getSubtasksQueryFn({ workspaceId, taskId }),
    enabled: !!workspaceId && !!taskId,
  });
};

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSubtaskMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Subtask created successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId, variables.taskId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["task-progress", variables.workspaceId, variables.taskId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create subtask",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateSubtask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateSubtaskMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Subtask updated successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update subtask",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteSubtask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSubtaskMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Subtask deleted successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete subtask",
        variant: "destructive",
      });
    },
  });
};

export const useGetTaskProgress = ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}) => {
  return useQuery({
    queryKey: ["task-progress", workspaceId, taskId],
    queryFn: () => getTaskProgressQueryFn({ workspaceId, taskId }),
    enabled: !!workspaceId && !!taskId,
  });
};