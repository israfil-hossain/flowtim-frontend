/**
 * Task Store - Zustand
 * Manages task state, filters, and task-related UI
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TaskType } from '@/types/api.type';
import { TaskPriorityEnumType, TaskStatusEnumType } from '@/constant';

export interface TaskFilters {
  projectId: string | null;
  assignedTo: string | null;
  priority: TaskPriorityEnumType | null;
  status: TaskStatusEnumType | null;
  dueDate: string | null;
  keyword: string;
  showCompleted: boolean;
  showOverdue: boolean;
  assignedToMe: boolean;
}

export interface TaskState {
  // Task data
  tasks: TaskType[];
  selectedTasks: string[];
  currentTask: TaskType | null;
  
  // Filters & Search
  filters: TaskFilters;
  searchQuery: string;
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title' | 'status';
  sortOrder: 'asc' | 'desc';
  
  // UI State
  viewMode: 'list' | 'kanban' | 'calendar';
  showTaskDetails: boolean;
  showFilters: boolean;
  bulkActionsMode: boolean;
  
  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}

export interface TaskActions {
  // Task data actions
  setTasks: (tasks: TaskType[]) => void;
  addTask: (task: TaskType) => void;
  updateTask: (taskId: string, updates: Partial<TaskType>) => void;
  removeTask: (taskId: string) => void;
  setCurrentTask: (task: TaskType | null) => void;
  
  // Selection actions
  selectTask: (taskId: string) => void;
  deselectTask: (taskId: string) => void;
  selectAllTasks: () => void;
  clearSelection: () => void;
  
  // Filter actions
  setFilter: <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: TaskState['sortBy']) => void;
  setSortOrder: (order: TaskState['sortOrder']) => void;
  
  // UI actions
  setViewMode: (mode: TaskState['viewMode']) => void;
  showTaskDetailsPanel: () => void;
  hideTaskDetailsPanel: () => void;
  toggleFilters: () => void;
  enableBulkActions: () => void;
  disableBulkActions: () => void;
  
  // Loading actions
  setLoading: (loading: boolean) => void;
  setCreating: (creating: boolean) => void;
  setUpdating: (updating: boolean) => void;
  setDeleting: (deleting: boolean) => void;
  setError: (error: string | null) => void;
  
  // Pagination actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalCount: (count: number) => void;
  setHasMore: (hasMore: boolean) => void;
  
  // Utility actions
  getTaskById: (taskId: string) => TaskType | null;
  getTasksByProject: (projectId: string) => TaskType[];
  getTasksByStatus: (status: TaskStatusEnumType) => TaskType[];
  getOverdueTasks: () => TaskType[];
  getMyTasks: (userId: string) => TaskType[];
  
  // Bulk actions
  bulkUpdateStatus: (taskIds: string[], status: TaskStatusEnumType) => void;
  bulkUpdatePriority: (taskIds: string[], priority: TaskPriorityEnumType) => void;
  bulkAssignTasks: (taskIds: string[], assigneeId: string) => void;
  bulkDeleteTasks: (taskIds: string[]) => void;
  
  // Reset
  reset: () => void;
}

type TaskStore = TaskState & TaskActions;

const initialFilters: TaskFilters = {
  projectId: null,
  assignedTo: null,
  priority: null,
  status: null,
  dueDate: null,
  keyword: '',
  showCompleted: true,
  showOverdue: true,
  assignedToMe: false,
};

const initialState: TaskState = {
  tasks: [],
  selectedTasks: [],
  currentTask: null,
  
  filters: initialFilters,
  searchQuery: '',
  sortBy: 'dueDate',
  sortOrder: 'asc',
  
  viewMode: 'list',
  showTaskDetails: false,
  showFilters: false,
  bulkActionsMode: false,
  
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  
  currentPage: 1,
  pageSize: 20,
  totalCount: 0,
  hasMore: false,
};

export const useTaskStore = create<TaskStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      
      // Task data actions
      setTasks: (tasks) =>
        set((state) => {
          state.tasks = tasks;
        }),
        
      addTask: (task) =>
        set((state) => {
          state.tasks.unshift(task);
          state.totalCount += 1;
        }),
        
      updateTask: (taskId, updates) =>
        set((state) => {
          const index = state.tasks.findIndex(t => t._id === taskId);
          if (index !== -1) {
            state.tasks[index] = { ...state.tasks[index], ...updates };
          }
          
          // Update current task if it's the same
          if (state.currentTask && state.currentTask._id === taskId) {
            state.currentTask = { ...state.currentTask, ...updates };
          }
        }),
        
      removeTask: (taskId) =>
        set((state) => {
          state.tasks = state.tasks.filter(t => t._id !== taskId);
          state.selectedTasks = state.selectedTasks.filter(id => id !== taskId);
          state.totalCount = Math.max(0, state.totalCount - 1);
          
          // Clear current task if it's the removed one
          if (state.currentTask && state.currentTask._id === taskId) {
            state.currentTask = null;
          }
        }),
        
      setCurrentTask: (task) =>
        set((state) => {
          state.currentTask = task;
        }),
        
      // Selection actions
      selectTask: (taskId) =>
        set((state) => {
          if (!state.selectedTasks.includes(taskId)) {
            state.selectedTasks.push(taskId);
          }
        }),
        
      deselectTask: (taskId) =>
        set((state) => {
          state.selectedTasks = state.selectedTasks.filter(id => id !== taskId);
        }),
        
      selectAllTasks: () =>
        set((state) => {
          state.selectedTasks = state.tasks.map(t => t._id);
        }),
        
      clearSelection: () =>
        set((state) => {
          state.selectedTasks = [];
        }),
        
      // Filter actions
      setFilter: (key, value) =>
        set((state) => {
          state.filters[key] = value;
          state.currentPage = 1; // Reset to first page when filtering
        }),
        
      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialFilters };
          state.currentPage = 1;
        }),
        
      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
          state.filters.keyword = query;
          state.currentPage = 1;
        }),
        
      setSortBy: (sortBy) =>
        set((state) => {
          state.sortBy = sortBy;
        }),
        
      setSortOrder: (order) =>
        set((state) => {
          state.sortOrder = order;
        }),
        
      // UI actions
      setViewMode: (mode) =>
        set((state) => {
          state.viewMode = mode;
        }),
        
      showTaskDetailsPanel: () =>
        set((state) => {
          state.showTaskDetails = true;
        }),
        
      hideTaskDetailsPanel: () =>
        set((state) => {
          state.showTaskDetails = false;
        }),
        
      toggleFilters: () =>
        set((state) => {
          state.showFilters = !state.showFilters;
        }),
        
      enableBulkActions: () =>
        set((state) => {
          state.bulkActionsMode = true;
        }),
        
      disableBulkActions: () =>
        set((state) => {
          state.bulkActionsMode = false;
          state.selectedTasks = [];
        }),
        
      // Loading actions
      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),
        
      setCreating: (creating) =>
        set((state) => {
          state.isCreating = creating;
        }),
        
      setUpdating: (updating) =>
        set((state) => {
          state.isUpdating = updating;
        }),
        
      setDeleting: (deleting) =>
        set((state) => {
          state.isDeleting = deleting;
        }),
        
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
        
      // Pagination actions
      setPage: (page) =>
        set((state) => {
          state.currentPage = page;
        }),
        
      setPageSize: (size) =>
        set((state) => {
          state.pageSize = size;
          state.currentPage = 1;
        }),
        
      setTotalCount: (count) =>
        set((state) => {
          state.totalCount = count;
        }),
        
      setHasMore: (hasMore) =>
        set((state) => {
          state.hasMore = hasMore;
        }),
        
      // Utility functions
      getTaskById: (taskId) => {
        const state = get();
        return state.tasks.find(t => t._id === taskId) || null;
      },
      
      getTasksByProject: (projectId) => {
        const state = get();
        return state.tasks.filter(t => t.project?._id === projectId);
      },
      
      getTasksByStatus: (status) => {
        const state = get();
        return state.tasks.filter(t => t.status === status);
      },
      
      getOverdueTasks: () => {
        const state = get();
        const now = new Date();
        return state.tasks.filter(t => 
          new Date(t.dueDate) < now && t.status !== 'COMPLETED'
        );
      },
      
      getMyTasks: (userId) => {
        const state = get();
        return state.tasks.filter(t => t.assignedTo?._id === userId);
      },
      
      // Bulk actions
      bulkUpdateStatus: (taskIds, status) =>
        set((state) => {
          state.tasks = state.tasks.map(task => 
            taskIds.includes(task._id) ? { ...task, status } : task
          );
        }),
        
      bulkUpdatePriority: (taskIds, priority) =>
        set((state) => {
          state.tasks = state.tasks.map(task => 
            taskIds.includes(task._id) ? { ...task, priority } : task
          );
        }),
        
      bulkAssignTasks: (taskIds, assigneeId) =>
        set((state) => {
          // This would need the assignee object, simplified for now
          state.tasks = state.tasks.map(task => 
            taskIds.includes(task._id) ? { ...task, assignedTo: { _id: assigneeId, name: '', profilePicture: null } } : task
          );
        }),
        
      bulkDeleteTasks: (taskIds) =>
        set((state) => {
          state.tasks = state.tasks.filter(t => !taskIds.includes(t._id));
          state.selectedTasks = [];
          state.totalCount = Math.max(0, state.totalCount - taskIds.length);
        }),
        
      // Reset
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    })),
    { name: 'TaskStore' }
  )
);

// Selectors
export const selectTasks = (state: TaskStore) => state.tasks;
export const selectCurrentTask = (state: TaskStore) => state.currentTask;
export const selectSelectedTasks = (state: TaskStore) => state.selectedTasks;
export const selectFilters = (state: TaskStore) => state.filters;
export const selectViewMode = (state: TaskStore) => state.viewMode;
export const selectTaskLoading = (state: TaskStore) => state.isLoading;