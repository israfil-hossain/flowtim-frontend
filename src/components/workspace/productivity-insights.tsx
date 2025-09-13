/**
 * Productivity Insights Component  
 * Shows productivity metrics and insights in dashboard sidebar
 */

import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useWorkspaceAnalytics } from "@/lib/api-service";
import { useWorkspaceStore } from "@/store";

interface ProductivityMetric {
  label: string;
  value: number;
  target: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

const ProductivityInsights = () => {
  const { currentWorkspaceId } = useWorkspaceStore();
  const { data: analytics, isLoading } = useWorkspaceAnalytics(
    currentWorkspaceId || '',
    { enabled: !!currentWorkspaceId }
  );

  // Mock productivity data - in real app this would come from API
  const productivityMetrics: ProductivityMetric[] = [
    {
      label: 'Task Completion',
      value: 75,
      target: 100,
      change: 12,
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      label: 'Team Velocity',
      value: 68,
      target: 80,
      change: -5,
      trend: 'down',
      color: 'bg-blue-500'
    },
    {
      label: 'Time Efficiency',
      value: 85,
      target: 90,
      change: 8,
      trend: 'up',
      color: 'bg-purple-500'
    }
  ];

  const getProductivityScore = () => {
    const avgCompletion = productivityMetrics.reduce((acc, metric) => 
      acc + (metric.value / metric.target), 0
    ) / productivityMetrics.length * 100;
    return Math.round(avgCompletion);
  };

  const getProductivityLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (score >= 75) return { label: 'Good', color: 'bg-blue-500' };
    if (score >= 60) return { label: 'Average', color: 'bg-yellow-500' };
    return { label: 'Needs Work', color: 'bg-red-500' };
  };

  const productivityScore = getProductivityScore();
  const productivityLevel = getProductivityLevel(productivityScore);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Productivity Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Productivity Insights
        </CardTitle>
        <CardDescription>
          Your team's performance this week
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold">{productivityScore}%</span>
            <Badge 
              className={`${productivityLevel.color} text-white`}
            >
              {productivityLevel.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Overall productivity score
          </p>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          {productivityMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{metric.label}</span>
                <div className="flex items-center gap-1">
                  <span>{metric.value}%</span>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  ) : null}
                  <span className={`text-xs ${
                    metric.change > 0 ? 'text-green-600' : 
                    metric.change < 0 ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2" 
              />
            </div>
          ))}
        </div>

        {/* Quick Insights */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-sm">Quick Insight</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {productivityScore >= 80 ? 
              "Great work! Your team is performing exceptionally well this week." :
              productivityScore >= 60 ?
              "Good progress! Focus on completing overdue tasks to improve efficiency." :
              "Consider reviewing task distribution and deadlines to boost productivity."
            }
          </p>
        </div>

        {/* Action Items */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recommended Actions</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {analytics?.analytics?.overdueTasks && analytics.analytics.overdueTasks > 0 && (
              <li>• Review {analytics.analytics.overdueTasks} overdue tasks</li>
            )}
            <li>• Schedule team check-in meeting</li>
            <li>• Update project timelines</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityInsights;