import {
  Plus,
  Calendar,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser, useWorkspaceAnalytics } from "@/lib/api-service";
import { useWorkspaceStore, useProjectStore, useUIStore } from "@/store";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import AnalyticsCharts from "@/components/dashboard/analytics-charts";
import MiniChart from "@/components/dashboard/mini-chart";
import Logo from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const WorkspaceDashboard = () => {
  // Store hooks
  const { currentWorkspace } = useWorkspaceStore();
  // const {} = useProjectStore();
  const { openModal } = useUIStore();
  
  // Local state for smooth transitions
  const [activeTab, setActiveTab] = useState("projects");

  // API hooks
  const { data: currentUser } = useCurrentUser();
  const { data: analytics, isLoading: analyticsLoading } =
    useWorkspaceAnalytics(currentWorkspace?._id || "", {
      enabled: !!currentWorkspace?._id,
    });

  const handleCreateProject = () => {
    openModal("createProject");
  };

  const getDashboardGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️ Good morning";
    if (hour < 17) return "🌤️ Good afternoon";
    return "🌙 Good evening";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="flex flex-1 flex-col space-y-4 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Logo */}
      <motion.div 
        className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0"
        variants={cardVariants}
      >
        <div className="flex items-center space-x-4">
          <Logo url={`/workspace/${currentWorkspace?._id || ''}`} />
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              {getDashboardGreeting()},{" "}
              {currentUser?.user.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentWorkspace?.name
                ? `${currentWorkspace.name} workspace overview`
                : "Workspace dashboard"}
            </p>
          </div>
        </div>

        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="outline" size="sm" className="text-xs transition-all hover:scale-105">
            <Calendar className="h-3 w-3 mr-1" />
            Calendar
          </Button>
          <Button onClick={handleCreateProject} size="sm" className="text-xs transition-all hover:scale-105">
            <Plus className="h-3 w-3 mr-1" />
            New Project
          </Button>
        </motion.div>
      </motion.div>

      {/* Compact Analytics Cards */}
      <motion.div 
        className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <BarChart3 className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-lg font-semibold">
              {analyticsLoading
                ? "..."
                : analytics?.analytics?.totalTasks || 24}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> this month
            </p>
          </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Active Tasks
              </CardTitle>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-semibold">
                {analyticsLoading
                  ? "..."
                  : analytics?.analytics?.totalTasks || 68}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+12</span> today
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-semibold text-green-600">
                {analyticsLoading
                  ? "..."
                  : analytics?.analytics?.completedTasks || 45}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5</span> this week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Overdue
              </CardTitle>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-semibold text-red-600">
                {analyticsLoading
                  ? "..."
                  : analytics?.analytics?.overdueTasks || 5}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Priority Cards - Weekly Productivity and Task Completion */}
      <motion.div 
        className="grid gap-3 md:grid-cols-4"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <MiniChart
            title="Weekly Productivity"
            value="87%"
            change="+12%"
            changeType="positive"
            data={[65, 72, 68, 75, 82, 79, 87]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            color="rgba(34, 197, 94, 1)"
          />
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <MiniChart
            title="Task Completion"
            value="92%"
            change="+5%"
            changeType="positive"
            data={[88, 85, 90, 89, 93, 91, 92]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            color="rgba(59, 130, 246, 1)"
          />
        </motion.div>

        <motion.div variants={cardVariants}>
          <MiniChart
            title="Response Time"
            value="2.3h"
            change="-0.5h"
            changeType="positive"
            data={[3.2, 2.8, 2.9, 2.5, 2.1, 2.4, 2.3]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            color="rgba(168, 85, 247, 1)"
          />
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={cardVariants}>
          <Card className="p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tasks completed</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Time logged</span>
              <span className="font-medium">32h 45m</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Projects active</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Team members</span>
              <span className="font-medium">12</span>
            </div>
          </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Analytics Charts Section */}
      <motion.div variants={cardVariants}>
        <AnalyticsCharts analytics={analytics?.analytics} />
      </motion.div>

      {/* Main Content Layout */}
      <motion.div className="space-y-4" variants={containerVariants}>
        {/* Recent Activity Full Width */}
        <motion.div variants={cardVariants}>
          <Card className="p-4 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 h-8">
                  <TabsTrigger 
                    value="projects" 
                    className="text-xs transition-all duration-200 hover:bg-primary/10"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tasks" 
                    className="text-xs transition-all duration-200 hover:bg-primary/10"
                  >
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="members" 
                    className="text-xs transition-all duration-200 hover:bg-primary/10"
                  >
                    Team
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-3"
                  >
                    {activeTab === "projects" && <RecentProjects />}
                    {activeTab === "tasks" && <RecentTasks />}
                    {activeTab === "members" && <RecentMembers />}
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WorkspaceDashboard;
