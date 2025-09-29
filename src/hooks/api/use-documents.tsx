import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDocumentsQueryFn,
  createDocumentMutationFn,
  getDocumentByIdQueryFn,
  updateDocumentMutationFn,
  deleteDocumentMutationFn,
} from "@/lib/api";
import toast from "react-hot-toast";

export const useGetDocuments = ({
  workspaceId,
  category,
  tags,
  page = 1,
  limit = 20,
}: {
  workspaceId: string;
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["documents", workspaceId, category, tags, page, limit],
    queryFn: () => getDocumentsQueryFn({ workspaceId, category, tags, page, limit }),
    enabled: !!workspaceId,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDocumentMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Document created successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create document");
    },
  });
};

export const useGetDocumentById = ({
  workspaceId,
  documentId,
}: {
  workspaceId: string;
  documentId: string;
}) => {
  return useQuery({
    queryKey: ["document", workspaceId, documentId],
    queryFn: () => getDocumentByIdQueryFn({ workspaceId, documentId }),
    enabled: !!workspaceId && !!documentId,
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateDocumentMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Document updated successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["document", variables.workspaceId, variables.documentId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update document");
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDocumentMutationFn,
    onSuccess: (_, variables) => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete document");
    },
  });
};