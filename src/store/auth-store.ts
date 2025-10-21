/**
 * Authentication Store - Zustand
 * Handles user authentication state and actions
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { UserType } from '@/types/api.type';

export interface AuthState {
  // State
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // UI State
  showLoginModal: boolean;
  rememberMe: boolean;
}

export interface AuthActions {
  // User actions
  setUser: (user: UserType | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // UI actions
  showLogin: () => void;
  hideLogin: () => void;
  setRememberMe: (remember: boolean) => void;
  
  // Auth actions
  login: (user: UserType, token?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserType>) => void;
  
  // Utility actions
  reset: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showLoginModal: false,
  rememberMe: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        
        // State setters
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),
          
        setToken: (token) =>
          set((state) => {
            state.token = token;
            // Don't store tokens in localStorage for security
            // Rely on httpOnly cookies and sessionStorage as fallback
          }),
          
        setAuthenticated: (isAuthenticated) =>
          set((state) => {
            state.isAuthenticated = isAuthenticated;
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
        showLogin: () =>
          set((state) => {
            state.showLoginModal = true;
          }),
          
        hideLogin: () =>
          set((state) => {
            state.showLoginModal = false;
          }),
          
        setRememberMe: (remember) =>
          set((state) => {
            state.rememberMe = remember;
          }),
          
        // Auth actions
        login: (user, token) =>
          set((state) => {
            state.user = user;
            state.token = token || null;
            state.isAuthenticated = true;
            state.error = null;
            state.showLoginModal = false;
            
            // Don't store sensitive data in localStorage for security
            // Use sessionStorage only for non-sensitive data if needed
            if (state.rememberMe && user) {
              sessionStorage.setItem('user_preferences', JSON.stringify({
                theme: 'light',
                language: 'en'
              }));
            }
          }),
          
        logout: () =>
          set((state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.showLoginModal = false;
            
            // Clear all stored data securely
            sessionStorage.removeItem('flowtim_access_token');
            sessionStorage.removeItem('flowtim_refresh_token');
            sessionStorage.removeItem('user_preferences');
          }),
          
        updateUser: (updates) =>
          set((state) => {
            if (state.user) {
              state.user = { ...state.user, ...updates };
              
              // Only store non-sensitive preferences
              if (state.rememberMe) {
                sessionStorage.setItem('user_preferences', JSON.stringify({
                  theme: 'light',
                  language: 'en'
                }));
              }
            }
          }),
          
        // Utility
        reset: () =>
          set((state) => {
            Object.assign(state, initialState);
          }),
      })),
      {
        name: 'flowtim-auth',
        partialize: (state) => ({
          user: state.rememberMe ? state.user : null,
          token: state.rememberMe ? state.token : null,
          isAuthenticated: state.rememberMe ? state.isAuthenticated : false,
          rememberMe: state.rememberMe,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// Selectors for better performance
export const selectAuthUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectAuthLoading = (state: AuthStore) => state.isLoading;
export const selectAuthError = (state: AuthStore) => state.error;
export const selectCurrentWorkspace = (state: AuthStore) => state.user?.currentWorkspace;