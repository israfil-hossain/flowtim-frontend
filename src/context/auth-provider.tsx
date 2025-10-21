/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useAuth from "@/hooks/api/use-auth";
import { UserType, WorkspaceType } from "@/types/api.type";
import useGetWorkspaceQuery from "@/hooks/api/use-get-workspace";
import { useNavigate } from "react-router-dom";
import usePermissions from "@/hooks/use-permissions";
import { PermissionType } from "@/constant";
import { authService } from "@/services/auth.service";
import { SecurityUtils } from "@/config/security.config";

// Define the context shape
type AuthContextType = {
  user?: UserType;
  workspace?: WorkspaceType;
  hasPermission: (permission: PermissionType) => boolean;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  workspaceLoading: boolean;
  refetchAuth: () => void;
  refetchWorkspace: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();
  const [isSessionValidated, setIsSessionValidated] = useState(false);

  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth(isSessionValidated); // Only enable after session validation
  const user = authData?.user;

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
    refetch: refetchWorkspace,
  } = useGetWorkspaceQuery(workspaceId);

  const workspace = workspaceData?.workspace;

  // Validate session on mount with security checks
  useEffect(() => {
    const validateSession = async () => {
      try {
        // Perform security validation first
        if (!SecurityUtils.validateSession()) {
          throw new Error('Security validation failed');
        }

        // Check if we have any indicators of an existing session
        const hasSession = authService.hasValidSession();
        
        if (hasSession) {
          // Try to validate with backend, but don't fail hard
          try {
            await authService.validateSession();
          } catch (error) {
            console.warn('Backend session validation failed, but continuing:', error);
            // Clear tokens if backend says session is invalid
            authService.clearTokens();
          }
        }
        
        setIsSessionValidated(true);
      } catch (error) {
        console.error('Session validation failed:', error);
        authService.clearTokens();
        
        // Clear any potentially compromised data
        SecurityUtils.secureStore.clear();
        
        setIsSessionValidated(true); // Still allow the app to render
      }
    };

    validateSession();
  }, []);

  useEffect(() => {
    if (workspaceError) {
      if (workspaceError?.errorCode === "ACCESS_UNAUTHORIZED") {
        navigate("/");
      }
    }
  }, [navigate, workspaceError]);

  // Only calculate permissions when both user and workspace are available
  const permissions = usePermissions(user, workspace);

  const hasPermission = (permission: PermissionType): boolean => {
    // Return false if permissions haven't loaded yet
    if (!permissions || permissions.length === 0) {
      return false;
    }
    return permissions.includes(permission);
  };

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    // Refetch user data after successful login
    refetchAuth();
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear all stored data securely
    SecurityUtils.secureStore.clear();
    
    // Redirect to sign-in page
    window.location.href = '/sign-in';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        hasPermission,
        error: authError || workspaceError,
        isLoading: isLoading || !isSessionValidated,
        isFetching,
        workspaceLoading,
        refetchAuth,
        refetchWorkspace,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
