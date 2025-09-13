/**
 * Advanced Analytics Dashboard
 * Comprehensive analytics and insights for project performance
 */

import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  Users, 
  AlertTriangle,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw,
  Zap,
  Award,
  Activity
} from "lucide-react";
import { format, subDays, subWeeks, subMonths } from "date-fns";

interface AnalyticsData {
  productivity: {
    tasksCompleted: number;
    tasksCompletedChange: number;
    averageCompletionTime: number;
    completionTimeChange: number;
    efficiency: number;
    efficiencyChange: number;
  };
  team: {
    activeMembers: number;
    totalMembers: number;
    topPerformers: {
      id: string;
      name: string;
      avatar?: string;
      tasksCompleted: number;
      efficiency: number;
    }[];
    workloadDistribution: {
      memberId: string;
      memberName: string;
      activeTasks: number;
      overdue: number;
      completed: number;
    }[];
  };
  projects: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    overdueProjects: number;
    projectHealth: {
      projectId: string;
      projectName: string;
      status: 'healthy' | 'at-risk' | 'critical';
      completion: number;
      daysRemaining: number;
    }[];
  };
  timeTracking: {
    totalHours: number;
    billableHours: number;
    averageDaily: number;
    weeklyTrend: {
      date: string;
      hours: number;
    }[];
    categoryBreakdown: {
      category: string;
      hours: number;
      percentage: number;
    }[];
  };
  burndown: {
    planned: { date: string; tasks: number }[];
    actual: { date: string; tasks: number }[];
    projected: { date: string; tasks: number }[];
  };
}

export const AdvancedAnalytics: FC = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedProject, setSelectedProject] = useState("all");
  
  // Mock data - in real app, this would come from API
  const [analyticsData] = useState<AnalyticsData>({
    productivity: {
      tasksCompleted: 156,
      tasksCompletedChange: 12.5,
      averageCompletionTime: 3.2,
      completionTimeChange: -8.3,
      efficiency: 87.5,
      efficiencyChange: 5.2
    },
    team: {
      activeMembers: 8,
      totalMembers: 12,
      topPerformers: [
        { id: '1', name: 'Sarah Wilson', tasksCompleted: 24, efficiency: 94.2 },
        { id: '2', name: 'Mike Johnson', tasksCompleted: 22, efficiency: 91.8 },
        { id: '3', name: 'Emily Davis', tasksCompleted: 20, efficiency: 89.5 }
      ],
      workloadDistribution: [
        { memberId: '1', memberName: 'Sarah Wilson', activeTasks: 5, overdue: 0, completed: 24 },
        { memberId: '2', memberName: 'Mike Johnson', activeTasks: 7, overdue: 1, completed: 22 },
        { memberId: '3', memberName: 'Emily Davis', activeTasks: 4, overdue: 0, completed: 20 },
        { memberId: '4', memberName: 'John Smith', activeTasks: 6, overdue: 2, completed: 18 }
      ]
    },
    projects: {
      totalProjects: 8,
      activeProjects: 5,
      completedProjects: 2,
      overdueProjects: 1,
      projectHealth: [
        { projectId: '1', projectName: 'Mobile App', status: 'healthy', completion: 75, daysRemaining: 14 },
        { projectId: '2', projectName: 'Web Platform', status: 'at-risk', completion: 45, daysRemaining: 7 },
        { projectId: '3', projectName: 'API Redesign', status: 'critical', completion: 30, daysRemaining: 2 },
        { projectId: '4', projectName: 'Brand Identity', status: 'healthy', completion: 90, daysRemaining: 21 }
      ]
    },
    timeTracking: {
      totalHours: 342,
      billableHours: 287,
      averageDaily: 7.2,
      weeklyTrend: [
        { date: '2024-01-01', hours: 45 },
        { date: '2024-01-08', hours: 52 },
        { date: '2024-01-15', hours: 48 },
        { date: '2024-01-22', hours: 56 },
        { date: '2024-01-29', hours: 49 }
      ],
      categoryBreakdown: [
        { category: 'Development', hours: 156, percentage: 45.6 },
        { category: 'Design', hours: 89, percentage: 26.0 },
        { category: 'Meetings', hours: 67, percentage: 19.6 },
        { category: 'Planning', hours: 30, percentage: 8.8 }
      ]
    },
    burndown: {
      planned: [
        { date: '2024-01-01', tasks: 100 },
        { date: '2024-01-08', tasks: 85 },
        { date: '2024-01-15', tasks: 70 },
        { date: '2024-01-22', tasks: 55 },
        { date: '2024-01-29', tasks: 40 },
        { date: '2024-02-05', tasks: 25 },
        { date: '2024-02-12', tasks: 10 },
        { date: '2024-02-19', tasks: 0 }
      ],
      actual: [
        { date: '2024-01-01', tasks: 100 },
        { date: '2024-01-08', tasks: 88 },
        { date: '2024-01-15', tasks: 74 },
        { date: '2024-01-22', tasks: 62 },
        { date: '2024-01-29', tasks: 48 }
      ],
      projected: [
        { date: '2024-01-29', tasks: 48 },
        { date: '2024-02-05', tasks: 35 },
        { date: '2024-02-12', tasks: 22 },
        { date: '2024-02-19', tasks: 8 }
      ]
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-700 border-green-200';
      case 'at-risk': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics & Insights</h2>
          <p className="text-muted-foreground">
            Comprehensive performance analytics and team insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="web">Web Platform</SelectItem>
              <SelectItem value="api">API Redesign</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">{analyticsData.productivity.tasksCompleted}</p>
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.productivity.tasksCompletedChange)}`}>
                  {getChangeIcon(analyticsData.productivity.tasksCompletedChange)}
                  {Math.abs(analyticsData.productivity.tasksCompletedChange)}% vs last period
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Completion Time</p>
                <p className="text-2xl font-bold">{analyticsData.productivity.averageCompletionTime}d</p>
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.productivity.completionTimeChange)}`}>
                  {getChangeIcon(analyticsData.productivity.completionTimeChange)}
                  {Math.abs(analyticsData.productivity.completionTimeChange)}% vs last period
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Efficiency</p>
                <p className="text-2xl font-bold">{analyticsData.productivity.efficiency}%</p>
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.productivity.efficiencyChange)}`}>
                  {getChangeIcon(analyticsData.productivity.efficiencyChange)}
                  {Math.abs(analyticsData.productivity.efficiencyChange)}% vs last period
                </div>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{analyticsData.team.activeMembers}/{analyticsData.team.totalMembers}</p>
                <div className="text-sm text-muted-foreground">
                  {Math.round((analyticsData.team.activeMembers / analyticsData.team.totalMembers) * 100)}% active
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="projects">Project Health</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Burndown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Sprint Burndown
                </CardTitle>
                <CardDescription>
                  Track progress against planned timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Burndown Chart Visualization</p>
                    <p className="text-sm">Shows planned vs actual progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Time Distribution
                </CardTitle>
                <CardDescription>
                  How time is spent across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.timeTracking.categoryBreakdown.map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{category.hours}h</p>
                        <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Project Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Project Health Status
              </CardTitle>
              <CardDescription>
                Current status of all active projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsData.projects.projectHealth.map((project) => (
                  <Card key={project.projectId} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{project.projectName}</h4>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.completion}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {project.daysRemaining} days remaining
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productivity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trends</CardTitle>
                <CardDescription>
                  Daily task completion over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Task Completion Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Velocity Tracking</CardTitle>
                <CardDescription>
                  Story points completed per sprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-2" />
                    <p>Velocity Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Team members with highest productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.team.topPerformers.map((performer, index) => (
                    <div key={performer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {performer.tasksCompleted} tasks completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{performer.efficiency}%</p>
                        <p className="text-sm text-muted-foreground">efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Workload Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
                <CardDescription>
                  Current task distribution across team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.team.workloadDistribution.map((member) => (
                    <div key={member.memberId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{member.memberName}</span>
                        <span className="text-sm text-muted-foreground">
                          {member.activeTasks + member.completed} total
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="font-medium text-blue-600">{member.activeTasks}</p>
                          <p className="text-xs text-blue-600">Active</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="font-medium text-green-600">{member.completed}</p>
                          <p className="text-xs text-green-600">Done</p>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <p className="font-medium text-red-600">{member.overdue}</p>
                          <p className="text-xs text-red-600">Overdue</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{analyticsData.projects.totalProjects}</div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{analyticsData.projects.activeProjects}</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">{analyticsData.projects.completedProjects}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600">{analyticsData.projects.overdueProjects}</div>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                Project progress and milestone tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2" />
                  <p>Project Timeline Visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold">{analyticsData.timeTracking.totalHours}h</div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{analyticsData.timeTracking.billableHours}h</div>
                <p className="text-sm text-muted-foreground">Billable Hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold">{analyticsData.timeTracking.averageDaily}h</div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Time Trend</CardTitle>
              <CardDescription>
                Hours tracked over the past weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-2" />
                  <p>Time Tracking Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};