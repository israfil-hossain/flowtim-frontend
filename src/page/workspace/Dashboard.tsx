import { Plus, Calendar, BarChart3, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser, useWorkspaceAnalytics } from "@/lib/api-service";
import { useWorkspaceStore, useProjectStore, useTaskStore, useUIStore } from "@/store";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import DashboardQuickActions from "@/components/workspace/dashboard-quick-actions";
import ProductivityInsights from "@/components/workspace/productivity-insights";
import TeamActivity from "@/components/workspace/team-activity";
const WorkspaceDashboard = () => {
  // Store hooks
  const { currentWorkspace } = useWorkspaceStore();
  const { showCreateModal } = useProjectStore();
  const { openModal } = useUIStore();
  
  // API hooks
  const { data: currentUser } = useCurrentUser();
  const { data: analytics, isLoading: analyticsLoading } = useWorkspaceAnalytics(
    currentWorkspace?._id || '',
    { enabled: !!currentWorkspace?._id }
  );

  const handleCreateProject = () => {
    openModal('createProject');
  };

  const getDashboardGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ Good morning';
    if (hour < 17) return '🌤️ Good afternoon';
    return '🌙 Good evening';
  };

  return (
    <div className="flex flex-1 flex-col space-y-6 p-6">
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {getDashboardGreeting()}, {currentUser?.user.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-muted-foreground">
            {currentWorkspace?.name ? 
              `Welcome to ${currentWorkspace.name} workspace` : 
              'Here\'s your workspace overview'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button onClick={handleCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <DashboardQuickActions />

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsLoading ? '...' : analytics?.analytics?.totalTasks || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsLoading ? '...' : analytics?.analytics?.totalTasks || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +12 from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsLoading ? '...' : analytics?.analytics?.completedTasks || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 since last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {analyticsLoading ? '...' : analytics?.analytics?.overdueTasks || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-4 space-y-4">
          {/* Enhanced Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Workspace Analytics</CardTitle>
              <CardDescription>
                Overview of your workspace performance and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkspaceAnalytics />
            </CardContent>
          </Card>

          {/* Recent Activity Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="members">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="mt-4">
                  <RecentProjects />
                </TabsContent>
                <TabsContent value="tasks" className="mt-4">
                  <RecentTasks />
                </TabsContent>
                <TabsContent value="members" className="mt-4">
                  <RecentMembers />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* Productivity Insights */}
          <ProductivityInsights />
          
          {/* Team Activity */}
          <TeamActivity />
          
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tasks completed</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time logged</span>
                <span className="font-medium">32h 45m</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Projects active</span>
                <span className="font-medium">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
