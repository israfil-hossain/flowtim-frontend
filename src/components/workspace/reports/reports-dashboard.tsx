/**
 * Reports Dashboard Component
 * Provides various reports and analytics for workspace
 */

import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileBarChart, Calendar, Users, Clock, Target, TrendingUp, TrendingDown } from "lucide-react";
import { format, subWeeks, subMonths } from "date-fns";

interface ReportData {
  period: string;
  tasksCompleted: number;
  totalTime: number; // in seconds
  productivity: number; // percentage
  teamMembers: number;
  projects: number;
}

interface TaskReport {
  taskCode: string;
  title: string;
  project: string;
  assignee: string;
  status: string;
  priority: string;
  timeSpent: number;
  dueDate?: Date;
  completedDate?: Date;
}

interface TeamMemberReport {
  name: string;
  tasksCompleted: number;
  totalTime: number;
  productivity: number;
  avatar?: string;
}

export const ReportsDashboard: FC = () => {
  const [reportPeriod, setReportPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  
  // Mock data - replace with actual API calls
  const mockReportData: ReportData = {
    period: 'This Week',
    tasksCompleted: 23,
    totalTime: 144000, // 40 hours
    productivity: 87,
    teamMembers: 8,
    projects: 5,
  };

  const mockTaskReports: TaskReport[] = [
    {
      taskCode: 'FLW-123',
      title: 'Fix authentication bug',
      project: 'Frontend Fixes',
      assignee: 'John Doe',
      status: 'DONE',
      priority: 'HIGH',
      timeSpent: 9000, // 2.5 hours
      dueDate: new Date(2024, 0, 15),
      completedDate: new Date(2024, 0, 14),
    },
    {
      taskCode: 'FLW-124',
      title: 'Implement dashboard',
      project: 'Dashboard',
      assignee: 'Jane Smith',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      timeSpent: 14400, // 4 hours
      dueDate: new Date(2024, 0, 20),
    },
    {
      taskCode: 'FLW-125',
      title: 'Update documentation',
      project: 'Documentation',
      assignee: 'Bob Johnson',
      status: 'DONE',
      priority: 'LOW',
      timeSpent: 7200, // 2 hours
      dueDate: new Date(2024, 0, 18),
      completedDate: new Date(2024, 0, 17),
    },
  ];

  const mockTeamReports: TeamMemberReport[] = [
    {
      name: 'John Doe',
      tasksCompleted: 8,
      totalTime: 28800, // 8 hours
      productivity: 92,
    },
    {
      name: 'Jane Smith',
      tasksCompleted: 6,
      totalTime: 21600, // 6 hours
      productivity: 88,
    },
    {
      name: 'Bob Johnson',
      tasksCompleted: 9,
      totalTime: 32400, // 9 hours
      productivity: 85,
    },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleExportReport = (type: 'pdf' | 'csv' | 'excel') => {
    console.log(`Exporting ${type} report...`);
    // TODO: Implement actual export functionality
  };

  const getPeriodText = () => {
    const now = new Date();
    switch (reportPeriod) {
      case 'week':
        return `${format(subWeeks(now, 1), 'MMM d')} - ${format(now, 'MMM d, yyyy')}`;
      case 'month':
        return format(subMonths(now, 1), 'MMMM yyyy');
      case 'quarter':
        return `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analyze team performance and project progress
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={reportPeriod} onValueChange={(value: any) => setReportPeriod(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('pdf')}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('csv')}
            >
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('excel')}
            >
              Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Period Display */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Report Period: {getPeriodText()}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.tasksCompleted}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(mockReportData.totalTime)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +8% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.productivity}%</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingDown className="h-3 w-3" />
              -3% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.teamMembers}</div>
            <div className="text-xs text-muted-foreground">Active members</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileBarChart className="h-4 w-4" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.projects}</div>
            <div className="text-xs text-muted-foreground">In progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Avg/Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(Math.round(mockReportData.totalTime / mockReportData.tasksCompleted))}
            </div>
            <div className="text-xs text-muted-foreground">Time per task</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Task Report</TabsTrigger>
          <TabsTrigger value="team">Team Report</TabsTrigger>
          <TabsTrigger value="projects">Project Report</TabsTrigger>
          <TabsTrigger value="time">Time Report</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Performance Report</CardTitle>
              <CardDescription>
                Detailed breakdown of task completion and time tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTaskReports.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {task.taskCode}
                          </Badge>
                          <div className="font-medium">{task.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatTime(task.timeSpent)}
                      </TableCell>
                      <TableCell>
                        {task.dueDate ? format(task.dueDate, 'MMM d') : '-'}
                      </TableCell>
                      <TableCell>
                        {task.completedDate ? format(task.completedDate, 'MMM d') : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Report</CardTitle>
              <CardDescription>
                Individual team member productivity and task completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Total Time</TableHead>
                    <TableHead>Productivity</TableHead>
                    <TableHead>Avg Time/Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeamReports.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.tasksCompleted}</TableCell>
                      <TableCell>{formatTime(member.totalTime)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.productivity}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${member.productivity}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatTime(Math.round(member.totalTime / member.tasksCompleted))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Report</CardTitle>
              <CardDescription>
                Project progress and resource allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Project reports coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle>Time Tracking Report</CardTitle>
              <CardDescription>
                Detailed time analysis and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Time tracking reports coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};