import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/ui/bar-chart";
import PieChart from "@/components/ui/pie-chart";
import { TrendingUp, Target, BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface AnalyticsChartsProps {
  analytics?: {
    totalTasks?: number;
    completedTasks?: number;
    overdueTasks?: number;
    inProgressTasks?: number;
    totalProjects?: number;
  };
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analytics }) => {
  // Sample data for demonstration - replace with real data
  const projectProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed',
        data: [4, 7, 12, 8, 15, 18],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Active',
        data: [8, 12, 15, 18, 12, 9],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const taskDistributionData = {
    labels: ['Completed', 'In Progress', 'To Do', 'Overdue'],
    datasets: [
      {
        data: [
          analytics?.completedTasks || 45,
          analytics?.inProgressTasks || 23,
          (analytics?.totalTasks || 85) - (analytics?.completedTasks || 45) - (analytics?.inProgressTasks || 23) - (analytics?.overdueTasks || 5),
          analytics?.overdueTasks || 5
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const teamProductivityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tasks',
        data: [32, 28, 45, 38],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
      {
        label: 'Hours',
        data: [156, 134, 198, 167],
        backgroundColor: 'rgba(244, 114, 182, 0.8)',
        borderColor: 'rgba(244, 114, 182, 1)',
        borderWidth: 1,
      },
    ],
  };

  const projectCategoryData = {
    labels: ['Development', 'Design', 'Marketing', 'Research', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(244, 114, 182, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="space-y-4">
      {/* Charts Grid - Professional Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        
        {/* Task Distribution Chart */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Task Distribution</CardTitle>
                <p className="text-lg font-semibold mt-1">Current Status</p>
              </div>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <PieChart 
              data={taskDistributionData} 
              size={300}
              className="mx-auto"
            />
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Completed</span>
                </div>
                <span className="font-medium">{analytics?.completedTasks || 45}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">In Progress</span>
                </div>
                <span className="font-medium">{analytics?.inProgressTasks || 23}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-muted-foreground">Overdue</span>
                </div>
                <span className="font-medium">{analytics?.overdueTasks || 5}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Progress Chart */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Project Progress</CardTitle>
                <p className="text-lg font-semibold mt-1">Monthly Overview</p>
              </div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <BarChart 
              data={projectProgressData} 
              height={300}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                    labels: {
                      usePointStyle: true,
                      padding: 15,
                      font: { size: 10 },
                    },
                  },
                },
                scales: {
                  x: { 
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                  },
                  y: { 
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { font: { size: 10 } }
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Team Productivity Chart */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Team Productivity</CardTitle>
                <p className="text-lg font-semibold mt-1">Weekly Metrics</p>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <BarChart 
              data={teamProductivityData} 
              height={300}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                    labels: {
                      usePointStyle: true,
                      padding: 15,
                      font: { size: 10 },
                    },
                  },
                },
                scales: {
                  x: { 
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                  },
                  y: { 
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { font: { size: 10 } }
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Project Categories Chart */}
        <Card className="p-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Project Categories</CardTitle>
                <p className="text-lg font-semibold mt-1">Distribution</p>
              </div>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <PieChart 
              data={projectCategoryData} 
              size={300}
              className="mx-auto"
            />
            <div className="mt-3 space-y-1">
              {projectCategoryData.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: projectCategoryData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                  <span className="font-medium">{projectCategoryData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AnalyticsCharts;