import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPublicTemplatesQueryFn,
  getWorkspaceTemplatesQueryFn,
  createTemplateMutationFn,
  getTemplateDetailsQueryFn,
  createProjectFromTemplateMutationFn,
  getPopularTemplatesQueryFn,
  getTemplateCategoriesQueryFn,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useGetPublicTemplates = ({
  category,
  search,
  page = 1,
  limit = 20,
}: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: ["public-templates", category, search, page, limit],
    queryFn: () => getPublicTemplatesQueryFn({ category, search, page, limit }),
  });
};

export const useGetWorkspaceTemplates = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-templates", workspaceId],
    queryFn: () => getWorkspaceTemplatesQueryFn(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTemplateMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Template created successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["workspace-templates", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create template",
        variant: "destructive",
      });
    },
  });
};

export const useGetTemplateDetails = (templateId: string) => {
  return useQuery({
    queryKey: ["template-details", templateId],
    queryFn: () => getTemplateDetailsQueryFn(templateId),
    enabled: !!templateId,
  });
};

export const useCreateProjectFromTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProjectFromTemplateMutationFn,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Project created from template successfully",
      });
      queryClient.invalidateQueries({ 
        queryKey: ["projects", variables.workspaceId] 
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create project from template",
        variant: "destructive",
      });
    },
  });
};

export const useGetPopularTemplates = (limit = 10) => {
  return useQuery({
    queryKey: ["popular-templates", limit],
    queryFn: () => getPopularTemplatesQueryFn(limit),
  });
};

export const useGetTemplateCategories = () => {
  return useQuery({
    queryKey: ["template-categories"],
    queryFn: getTemplateCategoriesQueryFn,
  });
};