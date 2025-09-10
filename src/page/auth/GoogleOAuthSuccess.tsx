import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserQueryFn, getAllWorkspacesUserIsMemberQueryFn } from '@/lib/api';
import { Loader } from 'lucide-react';

const GoogleOAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After successful OAuth, fetch user data and navigate to workspace
    const handleSuccessfulAuth = async () => {
      try {
        // Fetch user data now that authentication is complete
        const userResponse = await getCurrentUserQueryFn();
        
        if (!userResponse?.user) {
          throw new Error('Authentication failed - no user data');
        }
        
        // Now fetch user's workspaces
        const workspacesResponse = await getAllWorkspacesUserIsMemberQueryFn(); 
        console.log("workspace Response: ", workspacesResponse)
        
        if (workspacesResponse?.workspaces?.length > 0) {
          // Navigate to the first workspace
          const firstWorkspace = workspacesResponse.workspaces[0];
          navigate(`/workspace/${firstWorkspace._id}`);
        } else {
          // No workspaces, navigate to landing page
          navigate('/');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/auth/google/callback/failure');
      }
    };

    handleSuccessfulAuth();
  }, [navigate]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin" />
        <p>Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleOAuthSuccess;