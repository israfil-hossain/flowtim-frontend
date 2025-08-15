import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initGA,
  trackPageView,
  trackEvent,
  trackAuth,
  trackWorkspace,
  trackProject,
  trackTask,
  trackEngagement,
  trackError,
  trackConversion,
  GA_MEASUREMENT_ID,
} from '@/lib/analytics';

// Hook to initialize Google Analytics
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    if (GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (GA_MEASUREMENT_ID) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return {
    trackEvent,
    trackAuth,
    trackWorkspace,
    trackProject,
    trackTask,
    trackEngagement,
    trackError,
    trackConversion,
  };
};

// Hook for tracking specific user actions
export const useTrackUserActions = () => {
  const analytics = useAnalytics();

  const trackSignIn = (method: string = 'email') => {
    analytics.trackAuth('login', method);
  };

  const trackSignUp = (method: string = 'email') => {
    analytics.trackAuth('signup', method);
  };

  const trackSignOut = () => {
    analytics.trackAuth('logout');
  };

  const trackWorkspaceCreated = (workspaceId: string) => {
    analytics.trackWorkspace('create', workspaceId);
    analytics.trackConversion('workspace_created');
  };

  const trackWorkspaceJoined = (workspaceId: string) => {
    analytics.trackWorkspace('join', workspaceId);
  };

  const trackInviteSent = (workspaceId: string) => {
    analytics.trackWorkspace('invite', workspaceId);
  };

  const trackProjectCreated = (projectId: string) => {
    analytics.trackProject('create', projectId);
  };

  const trackTaskCreated = (taskId: string) => {
    analytics.trackTask('create', taskId);
  };

  const trackTaskCompleted = (taskId: string) => {
    analytics.trackTask('complete', taskId);
  };

  const trackFeatureUsed = (feature: string) => {
    analytics.trackEngagement('feature_used', feature);
  };

  const trackSearchPerformed = (query: string) => {
    analytics.trackEngagement('search', query);
  };

  const trackFilterApplied = (filterType: string) => {
    analytics.trackEngagement('filter_applied', filterType);
  };

  return {
    trackSignIn,
    trackSignUp,
    trackSignOut,
    trackWorkspaceCreated,
    trackWorkspaceJoined,
    trackInviteSent,
    trackProjectCreated,
    trackTaskCreated,
    trackTaskCompleted,
    trackFeatureUsed,
    trackSearchPerformed,
    trackFilterApplied,
  };
};
