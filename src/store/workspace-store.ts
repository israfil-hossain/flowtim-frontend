/**
 * Workspace Store - Zustand
 * Manages workspace state, current workspace, and workspace-related UI
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { WorkspaceType, WorkspaceWithMembersType } from '@/types/api.type';

export interface WorkspaceState {
  // State
  workspaces: WorkspaceType[];
  currentWorkspace: WorkspaceWithMembersType | null;
  currentWorkspaceId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // UI State
  showCreateWorkspaceModal: boolean;
  showWorkspaceSwitcher: boolean;
  showInviteModal: boolean;
  workspaceSidebarCollapsed: boolean;
  
  // Search & Filter
  searchQuery: string;
  filteredWorkspaces: WorkspaceType[];
}

export interface WorkspaceActions {
  // State actions
  setWorkspaces: (workspaces: WorkspaceType[]) => void;
  addWorkspace: (workspace: WorkspaceType) => void;
  updateWorkspace: (workspaceId: string, updates: Partial<WorkspaceType>) => void;
  removeWorkspace: (workspaceId: string) => void;
  
  setCurrentWorkspace: (workspace: WorkspaceWithMembersType | null) => void;
  setCurrentWorkspaceId: (workspaceId: string | null) => void;
  
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // UI actions
  showCreateModal: () => void;
  hideCreateModal: () => void;
  showSwitcher: () => void;
  hideSwitcher: () => void;
  showInvite: () => void;
  hideInvite: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Search & Filter
  setSearchQuery: (query: string) => void;
  filterWorkspaces: (query: string) => void;
  
  // Utility
  reset: () => void;
  getWorkspaceById: (workspaceId: string) => WorkspaceType | null;
  isCurrentWorkspace: (workspaceId: string) => boolean;
}

type WorkspaceStore = WorkspaceState & WorkspaceActions;

const initialState: WorkspaceState = {
  workspaces: [],
  currentWorkspace: null,
  currentWorkspaceId: null,
  isLoading: false,
  error: null,
  showCreateWorkspaceModal: false,
  showWorkspaceSwitcher: false,
  showInviteModal: false,
  workspaceSidebarCollapsed: false,
  searchQuery: '',
  filteredWorkspaces: [],
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // State actions
        setWorkspaces: (workspaces) =>
          set((state) => {
            state.workspaces = workspaces;
            state.filteredWorkspaces = workspaces;
          }),
          
        addWorkspace: (workspace) =>
          set((state) => {
            state.workspaces.unshift(workspace);
            state.filteredWorkspaces = state.workspaces.filter(w =>
              w.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          }),
          
        updateWorkspace: (workspaceId, updates) =>
          set((state) => {
            const index = state.workspaces.findIndex(w => w._id === workspaceId);
            if (index !== -1) {
              state.workspaces[index] = { ...state.workspaces[index], ...updates };
            }
            
            // Update current workspace if it's the same
            if (state.currentWorkspace && state.currentWorkspace._id === workspaceId) {
              state.currentWorkspace = { ...state.currentWorkspace, ...updates };
            }
            
            // Update filtered list
            state.filteredWorkspaces = state.workspaces.filter(w =>
              w.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          }),
          
        removeWorkspace: (workspaceId) =>
          set((state) => {
            state.workspaces = state.workspaces.filter(w => w._id !== workspaceId);
            state.filteredWorkspaces = state.filteredWorkspaces.filter(w => w._id !== workspaceId);
            
            // Clear current workspace if it's the removed one
            if (state.currentWorkspaceId === workspaceId) {
              state.currentWorkspace = null;
              state.currentWorkspaceId = null;
            }
          }),
          
        setCurrentWorkspace: (workspace) =>
          set((state) => {
            state.currentWorkspace = workspace;
            state.currentWorkspaceId = workspace?._id || null;
          }),
          
        setCurrentWorkspaceId: (workspaceId) =>
          set((state) => {
            state.currentWorkspaceId = workspaceId;
            
            // Find and set current workspace if we have it in the list
            if (workspaceId) {
              const workspace = state.workspaces.find(w => w._id === workspaceId);
              if (workspace) {
                // We need to convert to WorkspaceWithMembersType format
                state.currentWorkspace = {
                  ...workspace,
                  members: state.currentWorkspace?.members || []
                };
              }
            } else {
              state.currentWorkspace = null;
            }
          }),
          
        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading;
          }),
          
        setError: (error) =>
          set((state) => {
            state.error = error;
          }),
          
        // UI actions
        showCreateModal: () =>
          set((state) => {
            state.showCreateWorkspaceModal = true;
          }),
          
        hideCreateModal: () =>
          set((state) => {
            state.showCreateWorkspaceModal = false;
          }),
          
        showSwitcher: () =>
          set((state) => {
            state.showWorkspaceSwitcher = true;
          }),
          
        hideSwitcher: () =>
          set((state) => {
            state.showWorkspaceSwitcher = false;
          }),
          
        showInvite: () =>
          set((state) => {
            state.showInviteModal = true;
          }),
          
        hideInvite: () =>
          set((state) => {
            state.showInviteModal = false;
          }),
          
        toggleSidebar: () =>
          set((state) => {
            state.workspaceSidebarCollapsed = !state.workspaceSidebarCollapsed;
          }),
          
        setSidebarCollapsed: (collapsed) =>
          set((state) => {
            state.workspaceSidebarCollapsed = collapsed;
          }),
          
        // Search & Filter
        setSearchQuery: (query) =>
          set((state) => {
            state.searchQuery = query;
            state.filteredWorkspaces = state.workspaces.filter(workspace =>
              workspace.name.toLowerCase().includes(query.toLowerCase()) ||
              workspace.description?.toLowerCase().includes(query.toLowerCase())
            );
          }),
          
        filterWorkspaces: (query) => {
          get().setSearchQuery(query);
        },
        
        // Utility functions
        reset: () =>
          set((state) => {
            Object.assign(state, initialState);
          }),
          
        getWorkspaceById: (workspaceId) => {
          const state = get();
          return state.workspaces.find(w => w._id === workspaceId) || null;
        },
        
        isCurrentWorkspace: (workspaceId) => {
          const state = get();
          return state.currentWorkspaceId === workspaceId;
        },
      })),
      {
        name: 'flowtim-workspace',
        partialize: (state) => ({
          currentWorkspaceId: state.currentWorkspaceId,
          workspaceSidebarCollapsed: state.workspaceSidebarCollapsed,
        }),
      }
    ),
    { name: 'WorkspaceStore' }
  )
);

// Selectors for better performance
export const selectWorkspaces = (state: WorkspaceStore) => state.workspaces;
export const selectCurrentWorkspace = (state: WorkspaceStore) => state.currentWorkspace;
export const selectCurrentWorkspaceId = (state: WorkspaceStore) => state.currentWorkspaceId;
export const selectFilteredWorkspaces = (state: WorkspaceStore) => state.filteredWorkspaces;
export const selectWorkspaceLoading = (state: WorkspaceStore) => state.isLoading;
export const selectWorkspaceError = (state: WorkspaceStore) => state.error;

// UI Selectors
export const selectShowCreateModal = (state: WorkspaceStore) => state.showCreateWorkspaceModal;
export const selectShowSwitcher = (state: WorkspaceStore) => state.showWorkspaceSwitcher;
export const selectShowInviteModal = (state: WorkspaceStore) => state.showInviteModal;
export const selectSidebarCollapsed = (state: WorkspaceStore) => state.workspaceSidebarCollapsed;