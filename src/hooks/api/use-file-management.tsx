import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadFileMutationFn,
  getFilesQueryFn,
  deleteFileMutationFn,
  createFolderMutationFn,
  getFoldersQueryFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadFileMutationFn,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to upload file",
        variant: "destructive",
      });
    },
  });
};

export const useGetFiles = ({
  workspaceId,
  projectId,
  folderId,
  category,
  page = 1,
  limit = 20,
}: {
  workspaceId: string;
  projectId?: string;
  folderId?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["files", workspaceId, projectId, folderId, category, page, limit],
    queryFn: () => getFilesQueryFn({ workspaceId, projectId, folderId, category, page, limit }),
    enabled: !!workspaceId,
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteFileMutationFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete file",
        variant: "destructive",
      });
    },
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createFolderMutationFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Folder created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create folder",
        variant: "destructive",
      });
    },
  });
};

export const useGetFolders = ({
  workspaceId,
  parentId,
}: {
  workspaceId: string;
  parentId?: string;
}) => {
  return useQuery({
    queryKey: ["folders", workspaceId, parentId],
    queryFn: () => getFoldersQueryFn({ workspaceId, parentId }),
    enabled: !!workspaceId,
  });
};