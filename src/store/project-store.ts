/**
 * Project Store - Zustand  
 * Manages project state, current project, and project-related UI
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProjectType } from '@/types/api.type';

export interface ProjectState {
  // Project data
  projects: ProjectType[];
  currentProject: ProjectType | null;
  favoriteProjects: string[];
  recentProjects: string[];
  
  // UI State
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedProjectId: string | null;
  
  // Filters & Search
  searchQuery: string;
  filteredProjects: ProjectType[];
  sortBy: 'name' | 'createdAt' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
  
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

export interface ProjectActions {
  // Project data actions
  setProjects: (projects: ProjectType[]) => void;
  addProject: (project: ProjectType) => void;
  updateProject: (projectId: string, updates: Partial<ProjectType>) => void;
  removeProject: (projectId: string) => void;
  setCurrentProject: (project: ProjectType | null) => void;
  
  // Favorites & Recent
  addToFavorites: (projectId: string) => void;
  removeFromFavorites: (projectId: string) => void;
  addToRecent: (projectId: string) => void;
  
  // UI actions
  showCreateProjectModal: () => void;
  hideCreateProjectModal: () => void;
  showEditProjectModal: (projectId: string) => void;
  hideEditProjectModal: () => void;
  showDeleteProjectModal: (projectId: string) => void;
  hideDeleteProjectModal: () => void;
  
  // Search & Filter
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: ProjectState['sortBy']) => void;
  setSortOrder: (order: ProjectState['sortOrder']) => void;
  filterProjects: () => void;
  
  // Loading actions
  setLoading: (loading: boolean) => void;
  setCreating: (creating: boolean) => void;
  setUpdating: (updating: boolean) => void;
  setDeleting: (deleting: boolean) => void;
  setError: (error: string | null) => void;
  
  // Pagination
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalCount: (count: number) => void;
  setHasMore: (hasMore: boolean) => void;
  
  // Utility functions
  getProjectById: (projectId: string) => ProjectType | null;
  getFavoriteProjects: () => ProjectType[];
  getRecentProjects: () => ProjectType[];
  
  // Reset
  reset: () => void;
}

type ProjectStore = ProjectState & ProjectActions;

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  favoriteProjects: [],
  recentProjects: [],
  
  showCreateModal: false,
  showEditModal: false,
  showDeleteModal: false,
  selectedProjectId: null,
  
  searchQuery: '',
  filteredProjects: [],
  sortBy: 'updatedAt',
  sortOrder: 'desc',
  
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

export const useProjectStore = create<ProjectStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      
      // Project data actions
      setProjects: (projects) =>
        set((state) => {
          state.projects = projects;
          get().filterProjects();
        }),
        
      addProject: (project) =>
        set((state) => {
          state.projects.unshift(project);
          state.totalCount += 1;
          get().filterProjects();
        }),
        
      updateProject: (projectId, updates) =>
        set((state) => {
          const index = state.projects.findIndex(p => p._id === projectId);
          if (index !== -1) {
            state.projects[index] = { ...state.projects[index], ...updates };
          }
          
          // Update current project if it's the same
          if (state.currentProject && state.currentProject._id === projectId) {
            state.currentProject = { ...state.currentProject, ...updates };
          }
          
          get().filterProjects();
        }),
        
      removeProject: (projectId) =>
        set((state) => {
          state.projects = state.projects.filter(p => p._id !== projectId);
          state.favoriteProjects = state.favoriteProjects.filter(id => id !== projectId);
          state.recentProjects = state.recentProjects.filter(id => id !== projectId);
          state.totalCount = Math.max(0, state.totalCount - 1);
          
          // Clear current project if it's the removed one
          if (state.currentProject && state.currentProject._id === projectId) {
            state.currentProject = null;
          }
          
          get().filterProjects();
        }),
        
      setCurrentProject: (project) =>
        set((state) => {
          state.currentProject = project;
          
          // Add to recent projects
          if (project) {
            get().addToRecent(project._id);
          }
        }),
        
      // Favorites & Recent
      addToFavorites: (projectId) =>
        set((state) => {
          if (!state.favoriteProjects.includes(projectId)) {
            state.favoriteProjects.unshift(projectId);
          }
        }),
        
      removeFromFavorites: (projectId) =>
        set((state) => {
          state.favoriteProjects = state.favoriteProjects.filter(id => id !== projectId);
        }),
        
      addToRecent: (projectId) =>
        set((state) => {
          // Remove if already exists
          state.recentProjects = state.recentProjects.filter(id => id !== projectId);
          // Add to beginning
          state.recentProjects.unshift(projectId);
          // Keep only last 10
          state.recentProjects = state.recentProjects.slice(0, 10);
        }),
        
      // UI actions
      showCreateProjectModal: () =>
        set((state) => {
          state.showCreateModal = true;
        }),
        
      hideCreateProjectModal: () =>
        set((state) => {
          state.showCreateModal = false;
        }),
        
      showEditProjectModal: (projectId) =>
        set((state) => {
          state.showEditModal = true;
          state.selectedProjectId = projectId;
        }),
        
      hideEditProjectModal: () =>
        set((state) => {
          state.showEditModal = false;
          state.selectedProjectId = null;
        }),
        
      showDeleteProjectModal: (projectId) =>
        set((state) => {
          state.showDeleteModal = true;
          state.selectedProjectId = projectId;
        }),
        
      hideDeleteProjectModal: () =>
        set((state) => {
          state.showDeleteModal = false;
          state.selectedProjectId = null;
        }),
        
      // Search & Filter
      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
          get().filterProjects();
        }),
        
      setSortBy: (sortBy) =>
        set((state) => {
          state.sortBy = sortBy;
          get().filterProjects();
        }),
        
      setSortOrder: (order) =>
        set((state) => {
          state.sortOrder = order;
          get().filterProjects();
        }),
        
      filterProjects: () =>
        set((state) => {
          let filtered = [...state.projects];
          
          // Apply search filter
          if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(project =>
              project.name.toLowerCase().includes(query) ||
              project.description.toLowerCase().includes(query)
            );
          }
          
          // Apply sorting
          filtered.sort((a, b) => {
            let comparison = 0;
            
            switch (state.sortBy) {
              case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
              case 'createdAt':
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                break;
              case 'updatedAt':
                comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                break;
            }
            
            return state.sortOrder === 'desc' ? -comparison : comparison;
          });
          
          state.filteredProjects = filtered;
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
        
      // Pagination
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
      getProjectById: (projectId) => {
        const state = get();
        return state.projects.find(p => p._id === projectId) || null;
      },
      
      getFavoriteProjects: () => {
        const state = get();
        return state.favoriteProjects
          .map(id => state.projects.find(p => p._id === id))
          .filter(Boolean) as ProjectType[];
      },
      
      getRecentProjects: () => {
        const state = get();
        return state.recentProjects
          .map(id => state.projects.find(p => p._id === id))
          .filter(Boolean) as ProjectType[];
      },
      
      // Reset
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    })),
    { name: 'ProjectStore' }
  )
);

// Selectors
export const selectProjects = (state: ProjectStore) => state.projects;
export const selectFilteredProjects = (state: ProjectStore) => state.filteredProjects;
export const selectCurrentProject = (state: ProjectStore) => state.currentProject;
export const selectFavoriteProjects = (state: ProjectStore) => state.favoriteProjects;
export const selectRecentProjects = (state: ProjectStore) => state.recentProjects;
export const selectProjectLoading = (state: ProjectStore) => state.isLoading;
export const selectShowCreateModal = (state: ProjectStore) => state.showCreateModal;