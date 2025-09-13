/**
 * Enhanced API Service Layer with TanStack Query Integration
 * Worklenz-inspired architecture with modern React patterns
 */

import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  UseQueryOptions, 
  UseMutationOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import API from './axios-client';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api-endpoints';
import { 
  WorkspaceType, 
  ProjectType, 
  TaskType,
  CurrentUserResponseType,
  AllWorkspaceResponseType,
  AllProjectResponseType,
  AllTaskResponseType,
  AnalyticsResponseType,
  CreateWorkspaceType,
  CreateProjectPayloadType,
  CreateTaskPayloadType,
  EditTaskPayloadType,
  EditProjectPayloadType
} from '@/types/api.type';

// =================
// QUERY HOOKS
// =================

// Authentication Queries
export const useCurrentUser = (
  options?: Omit<UseQueryOptions<CurrentUserResponseType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: async (): Promise<CurrentUserResponseType> => {
      const response = await API.get(API_ENDPOINTS.USER.CURRENT);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Workspace Queries
export const useWorkspaces = (
  options?: Omit<UseQueryOptions<AllWorkspaceResponseType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSPACES,
    queryFn: async (): Promise<AllWorkspaceResponseType> => {
      const response = await API.get(API_ENDPOINTS.WORKSPACE.ALL);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useWorkspace = (
  workspaceId: string,
  options?: Omit<UseQueryOptions<WorkspaceType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSPACE(workspaceId),
    queryFn: async (): Promise<WorkspaceType> => {
      const response = await API.get(API_ENDPOINTS.WORKSPACE.BY_ID(workspaceId));
      return response.data.workspace;
    },
    enabled: !!workspaceId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useWorkspaceAnalytics = (
  workspaceId: string,
  options?: Omit<UseQueryOptions<AnalyticsResponseType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSPACE_ANALYTICS(workspaceId),
    queryFn: async (): Promise<AnalyticsResponseType> => {
      const response = await API.get(API_ENDPOINTS.WORKSPACE.ANALYTICS(workspaceId));
      return response.data;
    },
    enabled: !!workspaceId,
    staleTime: 1 * 60 * 1000, // 1 minute for analytics
    ...options,
  });
};

// Project Queries
export const useProjects = (
  workspaceId: string,
  params?: { pageSize?: number; pageNumber?: number; keyword?: string },
  options?: Omit<UseQueryOptions<AllProjectResponseType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS(workspaceId),
    queryFn: async (): Promise<AllProjectResponseType> => {
      const queryParams = new URLSearchParams();
      if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
      if (params?.keyword) queryParams.append('keyword', params.keyword);
      
      const url = `${API_ENDPOINTS.PROJECT.ALL(workspaceId)}${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await API.get(url);
      return response.data;
    },
    enabled: !!workspaceId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useInfiniteProjects = (
  workspaceId: string,
  pageSize: number = 10,
  keyword?: string,
  options?: Omit<UseInfiniteQueryOptions<AllProjectResponseType>, 'queryKey' | 'queryFn' | 'getNextPageParam'>
) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.PROJECTS(workspaceId), keyword],
    queryFn: async ({ pageParam = 1 }): Promise<AllProjectResponseType> => {
      const queryParams = new URLSearchParams();
      queryParams.append('pageSize', pageSize.toString());
      queryParams.append('pageNumber', (pageParam as number).toString());
      if (keyword) queryParams.append('keyword', keyword);
      
      const url = `${API_ENDPOINTS.PROJECT.ALL(workspaceId)}?${queryParams}`;
      const response = await API.get(url);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage.pagination;
      return pageNumber < totalPages ? pageNumber + 1 : undefined;
    },
    enabled: !!workspaceId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useProject = (
  projectId: string,
  workspaceId: string,
  options?: Omit<UseQueryOptions<ProjectType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT(projectId, workspaceId),
    queryFn: async (): Promise<ProjectType> => {
      const response = await API.get(API_ENDPOINTS.PROJECT.BY_ID(projectId, workspaceId));
      return response.data.project;
    },
    enabled: !!(projectId && workspaceId),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Task Queries
export const useTasks = (
  workspaceId: string,
  filters?: {
    projectId?: string;
    keyword?: string;
    assignedTo?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
    pageNumber?: number;
    pageSize?: number;
  },
  options?: Omit<UseQueryOptions<AllTaskResponseType>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TASKS(workspaceId), filters],
    queryFn: async (): Promise<AllTaskResponseType> => {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      const url = `${API_ENDPOINTS.TASK.ALL(workspaceId)}${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await API.get(url);
      return response.data;
    },
    enabled: !!workspaceId,
    staleTime: 30 * 1000, // 30 seconds for tasks (more dynamic)
    ...options,
  });
};

export const useInfiniteTasks = (
  workspaceId: string,
  filters?: {
    projectId?: string;
    keyword?: string;
    assignedTo?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
    pageSize?: number;
  },
  options?: Omit<UseInfiniteQueryOptions<AllTaskResponseType>, 'queryKey' | 'queryFn' | 'getNextPageParam'>
) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.TASKS(workspaceId), filters],
    queryFn: async ({ pageParam = 1 }): Promise<AllTaskResponseType> => {
      const queryParams = new URLSearchParams();
      
      queryParams.append('pageNumber', (pageParam as number).toString());
      queryParams.append('pageSize', (filters?.pageSize || 20).toString());
      
      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && key !== 'pageSize') {
          queryParams.append(key, value.toString());
        }
      });
      
      const url = `${API_ENDPOINTS.TASK.ALL(workspaceId)}?${queryParams}`;
      const response = await API.get(url);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage.pagination;
      return pageNumber < totalPages ? pageNumber + 1 : undefined;
    },
    enabled: !!workspaceId,
    staleTime: 30 * 1000,
    ...options,
  });
};

// =================
// MUTATION HOOKS
// =================

// Authentication Mutations
export const useLogin = (
  options?: UseMutationOptions<any, Error, { email: string; password: string }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await API.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Store auth token if provided
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CURRENT_USER });
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<any, Error, { name: string; email: string; password: string }>
) => {
  return useMutation({
    mutationFn: async (userData: { name: string; email: string; password: string }) => {
      const response = await API.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    },
    ...options,
  });
};

export const useLogout = (
  options?: UseMutationOptions<any, Error, void>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await API.post(API_ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    },
    onSuccess: () => {
      // Clear stored data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      // Clear all cached data
      queryClient.clear();
    },
    ...options,
  });
};

// Workspace Mutations
export const useCreateWorkspace = (
  options?: UseMutationOptions<any, Error, CreateWorkspaceType>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workspaceData: CreateWorkspaceType) => {
      const response = await API.post(API_ENDPOINTS.WORKSPACE.CREATE, workspaceData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES });
    },
    ...options,
  });
};

export const useUpdateWorkspace = (
  options?: UseMutationOptions<any, Error, { workspaceId: string; data: Partial<CreateWorkspaceType> }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ workspaceId, data }: { workspaceId: string; data: Partial<CreateWorkspaceType> }) => {
      const response = await API.put(API_ENDPOINTS.WORKSPACE.UPDATE(workspaceId), data);
      return response.data;
    },
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACE(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES });
    },
    ...options,
  });
};

export const useDeleteWorkspace = (
  options?: UseMutationOptions<any, Error, string>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workspaceId: string) => {
      const response = await API.delete(API_ENDPOINTS.WORKSPACE.DELETE(workspaceId));
      return response.data;
    },
    onSuccess: (_, workspaceId) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.WORKSPACE(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES });
    },
    ...options,
  });
};

// Project Mutations
export const useCreateProject = (
  options?: UseMutationOptions<any, Error, CreateProjectPayloadType>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ workspaceId, data }: CreateProjectPayloadType) => {
      const response = await API.post(API_ENDPOINTS.PROJECT.CREATE(workspaceId), data);
      return response.data;
    },
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACE_ANALYTICS(workspaceId) });
    },
    ...options,
  });
};

export const useUpdateProject = (
  options?: UseMutationOptions<any, Error, EditProjectPayloadType>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ projectId, workspaceId, data }: EditProjectPayloadType) => {
      const response = await API.put(API_ENDPOINTS.PROJECT.UPDATE(projectId, workspaceId), data);
      return response.data;
    },
    onSuccess: (_, { projectId, workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT(projectId, workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS(workspaceId) });
    },
    ...options,
  });
};

export const useDeleteProject = (
  options?: UseMutationOptions<any, Error, { projectId: string; workspaceId: string }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ projectId, workspaceId }: { projectId: string; workspaceId: string }) => {
      const response = await API.delete(API_ENDPOINTS.PROJECT.DELETE(projectId, workspaceId));
      return response.data;
    },
    onSuccess: (_, { projectId, workspaceId }) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.PROJECT(projectId, workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS(workspaceId) });
    },
    ...options,
  });
};

// Task Mutations
export const useCreateTask = (
  options?: UseMutationOptions<any, Error, CreateTaskPayloadType>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ workspaceId, projectId, data }: CreateTaskPayloadType) => {
      const response = await API.post(API_ENDPOINTS.TASK.CREATE(projectId, workspaceId), data);
      return response.data;
    },
    onSuccess: (_, { workspaceId, projectId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT(projectId, workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACE_ANALYTICS(workspaceId) });
    },
    ...options,
  });
};

export const useUpdateTask = (
  options?: UseMutationOptions<any, Error, EditTaskPayloadType>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ taskId, projectId, workspaceId, data }: EditTaskPayloadType) => {
      const response = await API.put(
        API_ENDPOINTS.TASK.UPDATE(taskId, projectId, workspaceId), 
        data
      );
      return response.data;
    },
    onSuccess: (_, { taskId, workspaceId, projectId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASK(taskId, workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT(projectId, workspaceId) });
    },
    ...options,
  });
};

export const useDeleteTask = (
  options?: UseMutationOptions<any, Error, { taskId: string; workspaceId: string }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ taskId, workspaceId }: { taskId: string; workspaceId: string }) => {
      const response = await API.delete(API_ENDPOINTS.TASK.DELETE(taskId, workspaceId));
      return response.data;
    },
    onSuccess: (_, { taskId, workspaceId }) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.TASK(taskId, workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS(workspaceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACE_ANALYTICS(workspaceId) });
    },
    ...options,
  });
};

// =================
// UTILITY FUNCTIONS
// =================

export const prefetchWorkspace = (queryClient: any, workspaceId: string) => {
  return queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.WORKSPACE(workspaceId),
    queryFn: async () => {
      const response = await API.get(API_ENDPOINTS.WORKSPACE.BY_ID(workspaceId));
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchProjects = (queryClient: any, workspaceId: string) => {
  return queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.PROJECTS(workspaceId),
    queryFn: async () => {
      const response = await API.get(API_ENDPOINTS.PROJECT.ALL(workspaceId));
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Optimistic updates helper
export const optimisticTaskUpdate = (
  queryClient: any,
  workspaceId: string,
  taskId: string,
  updates: Partial<TaskType>
) => {
  queryClient.setQueryData(
    QUERY_KEYS.TASKS(workspaceId),
    (oldData: AllTaskResponseType | undefined) => {
      if (!oldData) return oldData;
      
      return {
        ...oldData,
        tasks: oldData.tasks.map(task => 
          task._id === taskId ? { ...task, ...updates } : task
        )
      };
    }
  );
};