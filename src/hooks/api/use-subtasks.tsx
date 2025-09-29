import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubtasksQueryFn,
  createSubtaskMutationFn,
  updateSubtaskMutationFn,
  deleteSubtaskMutationFn,
  getTaskProgressQueryFn,
} from "@/lib/api";
import toast from "react-hot-toast";

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
    onSuccess: (_, variables) => {
      toast.success("Subtask created successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId, variables.taskId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["task-progress", variables.workspaceId, variables.taskId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create subtask");
    },
  });
};

export const useUpdateSubtask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateSubtaskMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Subtask updated successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update subtask");
    },
  });
};

export const useDeleteSubtask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSubtaskMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Subtask deleted successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["subtasks", variables.workspaceId] 
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete subtask");
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