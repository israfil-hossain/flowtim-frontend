import { useQuery } from "@tanstack/react-query";
import {
  getDashboardAnalyticsQueryFn,
  getProductivityMetricsQueryFn,
  getTeamPerformanceQueryFn,
  getProjectInsightsQueryFn,
} from "@/lib/api";

export const useGetDashboardAnalytics = ({
  workspaceId,
  startDate,
  endDate,
}: {
  workspaceId: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: ["dashboard-analytics", workspaceId, startDate, endDate],
    queryFn: () => getDashboardAnalyticsQueryFn({ workspaceId, startDate, endDate }),
    enabled: !!workspaceId,
  });
};

export const useGetProductivityMetrics = ({
  workspaceId,
  startDate,
  endDate,
}: {
  workspaceId: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: ["productivity-metrics", workspaceId, startDate, endDate],
    queryFn: () => getProductivityMetricsQueryFn({ workspaceId, startDate, endDate }),
    enabled: !!workspaceId,
  });
};

export const useGetTeamPerformance = (workspaceId: string) => {
  return useQuery({
    queryKey: ["team-performance", workspaceId],
    queryFn: () => getTeamPerformanceQueryFn(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useGetProjectInsights = (projectId: string) => {
  return useQuery({
    queryKey: ["project-insights", projectId],
    queryFn: () => getProjectInsightsQueryFn(projectId),
    enabled: !!projectId,
  });
};