import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDocumentsQueryFn,
  createDocumentMutationFn,
  getDocumentByIdQueryFn,
  updateDocumentMutationFn,
  deleteDocumentMutationFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

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
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Document created successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create document",
        variant: "destructive",
      });
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
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Document updated successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["document", variables.workspaceId, variables.documentId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update document",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDocumentMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["documents", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete document",
        variant: "destructive",
      });
    },
  });
};