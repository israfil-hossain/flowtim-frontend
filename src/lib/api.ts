import API from "./axios-client";
import {
  AllMembersInWorkspaceResponseType,
  AllProjectPayloadType,
  AllProjectResponseType,
  AllTaskPayloadType,
  AllTaskResponseType,
  AnalyticsResponseType,
  ChangeWorkspaceMemberRoleType,
  CreateProjectPayloadType,
  CreateTaskPayloadType,
  EditTaskPayloadType,
  CreateWorkspaceResponseType,
  EditProjectPayloadType,
  ProjectByIdPayloadType,
  ProjectResponseType,
} from "../types/api.type";
import {
  AllWorkspaceResponseType,
  CreateWorkspaceType,
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  registerType,
  WorkspaceByIdResponseType,
  EditWorkspaceType,
} from "@/types/api.type";

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const result = await response.json();

  // Only store access token in sessionStorage as fallback
  // Primary authentication relies on httpOnly cookies
  if (result.tokens?.accessToken) {
    sessionStorage.setItem('flowtim_access_token', result.tokens.accessToken);
  }

  return result;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post("/auth/register", data);

export const logoutMutationFn = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout request failed:', error);
  }

  // Clear session storage tokens
  sessionStorage.removeItem('flowtim_access_token');
  sessionStorage.removeItem('flowtim_refresh_token');
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };

export const updateUserProfileMutationFn = async (data: {
  name?: string;
  email?: string;
  bio?: string;
}) => {
  const response = await API.put(`/user/profile`, data);
  return response.data;
};

export const uploadUserAvatarMutationFn = async (formData: FormData) => {
  const response = await API.post(`/user/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

//********* WORKSPACE ****************
//************* */

export const createWorkspaceMutationFn = async (
  data: CreateWorkspaceType
): Promise<CreateWorkspaceResponseType> => {
  const response = await API.post(`/workspace/create/new`, data);
  return response.data;
};

export const editWorkspaceMutationFn = async ({
  workspaceId,
  data,
}: EditWorkspaceType) => {
  const response = await API.put(`/workspace/update/${workspaceId}`, data);
  return response.data;
};

export const getAllWorkspacesUserIsMemberQueryFn =
  async (): Promise<AllWorkspaceResponseType> => {
    const response = await API.get(`/workspace/all`);
    return response.data;
  };

export const getWorkspaceByIdQueryFn = async (
  workspaceId: string
): Promise<WorkspaceByIdResponseType> => {
  const response = await API.get(`/workspace/${workspaceId}`);
  return response.data;
};

export const getMembersInWorkspaceQueryFn = async (
  workspaceId: string
): Promise<AllMembersInWorkspaceResponseType> => {
  const response = await API.get(`/workspace/members/${workspaceId}`);
  return response.data;
};

export const getWorkspaceAnalyticsQueryFn = async (
  workspaceId: string
): Promise<AnalyticsResponseType> => {
  const response = await API.get(`/workspace/analytics/${workspaceId}`);
  return response.data;
};

export const changeWorkspaceMemberRoleMutationFn = async ({
  workspaceId,
  data,
}: ChangeWorkspaceMemberRoleType) => {
  const response = await API.put(
    `/workspace/change/member/role/${workspaceId}`,
    data
  );
  return response.data;
};

export const deleteWorkspaceMutationFn = async (
  workspaceId: string
): Promise<{
  message: string;
  currentWorkspace: string;
}> => {
  const response = await API.delete(`/workspace/delete/${workspaceId}`);
  return response.data;
};

//*******MEMBER ****************

export const invitedUserJoinWorkspaceMutationFn = async (
  iniviteCode: string
): Promise<{
  message: string;
  workspaceId: string;
}> => {
  const response = await API.post(`/member/workspace/${iniviteCode}/join`);
  return response.data;
};

//********* */
//********* PROJECTS
export const createProjectMutationFn = async ({
  workspaceId,
  data,
}: CreateProjectPayloadType): Promise<ProjectResponseType> => {
  const response = await API.post(
    `/project/workspace/${workspaceId}/create`,
    data
  );
  return response.data;
};

export const editProjectMutationFn = async ({
  projectId,
  workspaceId,
  data,
}: EditProjectPayloadType): Promise<ProjectResponseType> => {
  const response = await API.put(
    `/project/${projectId}/workspace/${workspaceId}/update`,
    data
  );
  return response.data;
};

export const getProjectsInWorkspaceQueryFn = async ({
  workspaceId,
  pageSize = 10,
  pageNumber = 1,
}: AllProjectPayloadType): Promise<AllProjectResponseType> => {
  const response = await API.get(
    `/project/workspace/${workspaceId}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return response.data;
};

export const getProjectByIdQueryFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType): Promise<ProjectResponseType> => {
  const response = await API.get(
    `/project/${projectId}/workspace/${workspaceId}`
  );
  return response.data;
};

export const getProjectAnalyticsQueryFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType): Promise<AnalyticsResponseType> => {
  const response = await API.get(
    `/project/${projectId}/workspace/${workspaceId}/analytics`
  );
  return response.data;
};

export const deleteProjectMutationFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType): Promise<{
  message: string;
}> => {
  const response = await API.delete(
    `/project/${projectId}/workspace/${workspaceId}/delete`
  );
  return response.data;
};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async ({
  workspaceId,
  projectId,
  data,
}: CreateTaskPayloadType) => {
  const response = await API.post(
    `/task/project/${projectId}/workspace/${workspaceId}/create`,
    data
  );
  return response.data;
};


export const editTaskMutationFn = async ({
  taskId,
  projectId,
  workspaceId,
  data,
}: EditTaskPayloadType): Promise<{message: string;}> => {
  const response = await API.put(
    `/task/${taskId}/project/${projectId}/workspace/${workspaceId}/update/`,
    data
  );
  return response.data;
};

export const getAllTasksQueryFn = async ({
  workspaceId,
  keyword,
  projectId,
  assignedTo,
  priority,
  status,
  dueDate,
  pageNumber,
  pageSize,
}: AllTaskPayloadType): Promise<AllTaskResponseType> => {
  const baseUrl = `/task/workspace/${workspaceId}/all`;

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append("keyword", keyword);
  if (projectId) queryParams.append("projectId", projectId);
  if (assignedTo) queryParams.append("assignedTo", assignedTo);
  if (priority) queryParams.append("priority", priority);
  if (status) queryParams.append("status", status);
  if (dueDate) queryParams.append("dueDate", dueDate);
  if (pageNumber) queryParams.append("pageNumber", pageNumber?.toString());
  if (pageSize) queryParams.append("pageSize", pageSize?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await API.get(url);
  return response.data;
};

export const deleteTaskMutationFn = async ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}): Promise<{
  message: string;
}> => {
  const response = await API.delete(
    `task/${taskId}/workspace/${workspaceId}/delete`
  );
  return response.data;
};

//********* FILE MANAGEMENT ****************

export const uploadFileMutationFn = async ({
  workspaceId,
  formData,
}: {
  workspaceId: string;
  formData: FormData;
}) => {
  const response = await API.post(
    `/files/workspaces/${workspaceId}/files/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getFilesQueryFn = async ({
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
  const params = new URLSearchParams();
  if (projectId) params.append('projectId', projectId);
  if (folderId) params.append('folderId', folderId);
  if (category) params.append('category', category);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await API.get(
    `/files/workspaces/${workspaceId}/files?${params}`
  );
  return response.data;
};

export const deleteFileMutationFn = async ({
  workspaceId,
  fileId,
}: {
  workspaceId: string;
  fileId: string;
}) => {
  const response = await API.delete(
    `/files/workspaces/${workspaceId}/files/${fileId}`
  );
  return response.data;
};

export const downloadFileQueryFn = async (fileId: string) => {
  const response = await API.get(`/files/files/${fileId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

export const createFolderMutationFn = async ({
  workspaceId,
  name,
  parentId,
}: {
  workspaceId: string;
  name: string;
  parentId?: string;
}) => {
  const response = await API.post(
    `/files/workspaces/${workspaceId}/folders`,
    { name, parentId }
  );
  return response.data;
};

export const getFoldersQueryFn = async ({
  workspaceId,
  parentId,
}: {
  workspaceId: string;
  parentId?: string;
}) => {
  const params = new URLSearchParams();
  if (parentId) params.append('parentId', parentId);

  const response = await API.get(
    `/files/workspaces/${workspaceId}/folders?${params}`
  );
  return response.data;
};

//********* SUBTASK MANAGEMENT ****************

export const getSubtasksQueryFn = async ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}) => {
  const response = await API.get(
    `/subtasks/workspaces/${workspaceId}/tasks/${taskId}/subtasks`
  );
  return response.data;
};

export const createSubtaskMutationFn = async ({
  workspaceId,
  taskId,
  data,
}: {
  workspaceId: string;
  taskId: string;
  data: {
    title: string;
    description?: string;
    priority?: string;
    assignedTo?: string;
    dueDate?: string;
  };
}) => {
  const response = await API.post(
    `/subtasks/workspaces/${workspaceId}/tasks/${taskId}/subtasks`,
    data
  );
  return response.data;
};

export const updateSubtaskMutationFn = async ({
  workspaceId,
  subtaskId,
  data,
}: {
  workspaceId: string;
  subtaskId: string;
  data: any;
}) => {
  const response = await API.put(
    `/subtasks/workspaces/${workspaceId}/subtasks/${subtaskId}`,
    data
  );
  return response.data;
};

export const deleteSubtaskMutationFn = async ({
  workspaceId,
  subtaskId,
}: {
  workspaceId: string;
  subtaskId: string;
}) => {
  const response = await API.delete(
    `/subtasks/workspaces/${workspaceId}/subtasks/${subtaskId}`
  );
  return response.data;
};

export const getTaskProgressQueryFn = async ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}) => {
  const response = await API.get(
    `/subtasks/workspaces/${workspaceId}/tasks/${taskId}/progress`
  );
  return response.data;
};

//********* NOTIFICATIONS ****************

export const getNotificationsQueryFn = async ({
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
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (isRead !== undefined) params.append('isRead', isRead.toString());

  const response = await API.get(
    `/notifications/users/${userId}/notifications?${params}`
  );
  return response.data;
};

export const markNotificationAsReadMutationFn = async ({
  userId,
  notificationId,
}: {
  userId: string;
  notificationId: string;
}) => {
  const response = await API.put(
    `/notifications/users/${userId}/notifications/${notificationId}/read`
  );
  return response.data;
};

export const markAllNotificationsAsReadMutationFn = async (userId: string) => {
  const response = await API.put(
    `/notifications/users/${userId}/notifications/mark-all-read`
  );
  return response.data;
};

export const getNotificationPreferencesQueryFn = async (userId: string) => {
  const response = await API.get(
    `/notifications/users/${userId}/notification-preferences`
  );
  return response.data;
};

export const updateNotificationPreferencesMutationFn = async ({
  userId,
  preferences,
}: {
  userId: string;
  preferences: any[];
}) => {
  const response = await API.put(
    `/notifications/users/${userId}/notification-preferences`,
    { preferences }
  );
  return response.data;
};

//********* ANALYTICS ****************

export const getDashboardAnalyticsQueryFn = async ({
  workspaceId,
  startDate,
  endDate,
}: {
  workspaceId: string;
  startDate?: string;
  endDate?: string;
}) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  const response = await API.get(
    `/analytics/dashboard/${workspaceId}?${params}`
  );
  return response.data;
};

export const getProductivityMetricsQueryFn = async ({
  workspaceId,
  startDate,
  endDate,
}: {
  workspaceId: string;
  startDate?: string;
  endDate?: string;
}) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  const response = await API.get(
    `/analytics/productivity/${workspaceId}?${params}`
  );
  return response.data;
};

export const getTeamPerformanceQueryFn = async (workspaceId: string) => {
  const response = await API.get(
    `/analytics/team-performance/${workspaceId}`
  );
  return response.data;
};

export const getProjectInsightsQueryFn = async (projectId: string) => {
  const response = await API.get(
    `/analytics/project-insights/${projectId}`
  );
  return response.data;
};

//********* TEMPLATES ****************

export const getPublicTemplatesQueryFn = async ({
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
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await API.get(`/templates/templates?${params}`);
  return response.data;
};

export const getWorkspaceTemplatesQueryFn = async (workspaceId: string) => {
  const response = await API.get(
    `/templates/workspaces/${workspaceId}/templates`
  );
  return response.data;
};

export const createTemplateMutationFn = async ({
  workspaceId,
  data,
}: {
  workspaceId: string;
  data: {
    name: string;
    description: string;
    category: string;
    isPublic?: boolean;
    tags?: string[];
    estimatedDuration: number;
    tasks?: any[];
  };
}) => {
  const response = await API.post(
    `/templates/workspaces/${workspaceId}/templates`,
    data
  );
  return response.data;
};

export const getTemplateDetailsQueryFn = async (templateId: string) => {
  const response = await API.get(`/templates/templates/${templateId}`);
  return response.data;
};

export const createProjectFromTemplateMutationFn = async ({
  workspaceId,
  templateId,
  data,
}: {
  workspaceId: string;
  templateId: string;
  data: {
    projectName: string;
    projectDescription?: string;
    startDate?: string;
    customizations?: any;
  };
}) => {
  const response = await API.post(
    `/templates/workspaces/${workspaceId}/projects/from-template/${templateId}`,
    data
  );
  return response.data;
};

export const getPopularTemplatesQueryFn = async (limit = 10) => {
  const response = await API.get(
    `/templates/templates/popular?limit=${limit}`
  );
  return response.data;
};

export const getTemplateCategoriesQueryFn = async () => {
  const response = await API.get('/templates/templates/categories');
  return response.data;
};

//********* DOCUMENTS ****************

export const getDocumentsQueryFn = async ({
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
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (tags) tags.forEach(tag => params.append('tags', tag));
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await API.get(
    `/document/workspace/${workspaceId}/documents?${params}`
  );
  return response.data;
};

export const createDocumentMutationFn = async ({
  workspaceId,
  data,
}: {
  workspaceId: string;
  data: {
    title: string;
    content: string;
    category?: string;
    tags?: string[];
    projectId?: string;
  };
}) => {
  const response = await API.post(
    `/document/workspace/${workspaceId}/documents`,
    data
  );
  return response.data;
};

export const getDocumentByIdQueryFn = async ({
  workspaceId,
  documentId,
}: {
  workspaceId: string;
  documentId: string;
}) => {
  const response = await API.get(
    `/document/workspace/${workspaceId}/documents/${documentId}`
  );
  return response.data;
};

export const updateDocumentMutationFn = async ({
  workspaceId,
  documentId,
  data,
}: {
  workspaceId: string;
  documentId: string;
  data: any;
}) => {
  const response = await API.put(
    `/document/workspace/${workspaceId}/documents/${documentId}`,
    data
  );
  return response.data;
};

export const deleteDocumentMutationFn = async ({
  workspaceId,
  documentId,
}: {
  workspaceId: string;
  documentId: string;
}) => {
  const response = await API.delete(
    `/document/workspace/${workspaceId}/documents/${documentId}`
  );
  return response.data;
};

//********* CHAT ****************

export const getChannelsQueryFn = async (workspaceId: string) => {
  const response = await API.get(
    `/chat/workspaces/${workspaceId}/channels`
  );
  return response.data;
};

export const createChannelMutationFn = async ({
  workspaceId,
  data,
}: {
  workspaceId: string;
  data: {
    name: string;
    description?: string;
    type: 'public' | 'private';
  };
}) => {
  const response = await API.post(
    `/chat/workspaces/${workspaceId}/channels`,
    data
  );
  return response.data;
};

export const getMessagesQueryFn = async ({
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
  const response = await API.get(
    `/chat/workspaces/${workspaceId}/channels/${channelId}/messages?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const sendMessageMutationFn = async ({
  workspaceId,
  channelId,
  data,
}: {
  workspaceId: string;
  channelId: string;
  data: {
    content: string;
    replyToId?: string;
    mentions?: string[];
  };
}) => {
  const response = await API.post(
    `/chat/workspaces/${workspaceId}/channels/${channelId}/messages`,
    data
  );
  return response.data;
};
