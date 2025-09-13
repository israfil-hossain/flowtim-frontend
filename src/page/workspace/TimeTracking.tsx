/**
 * Time Tracking Page
 * Comprehensive time tracking dashboard with reports and analytics
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TimeTracker } from "@/components/workspace/time-tracking/time-tracker";
import { Clock, Download, Filter, Calendar as CalendarIcon, BarChart3, TrendingUp } from "lucide-react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";

interface TimeEntry {
  id: string;
  task: {
    _id: string;
    title: string;
    taskCode: string;
    project?: {
      name: string;
      emoji: string;
    };
  };
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  description?: string;
  user: {
    name: string;
    profilePicture?: string;
  };
}

const TimeTrackingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week');

  // Mock data - replace with actual API calls
  const mockTimeEntries: TimeEntry[] = [
    {
      id: '1',
      task: {
        _id: '1',
        title: 'Fix authentication bug',
        taskCode: 'FLW-123',
        project: { name: 'Frontend Fixes', emoji: '🐛' }
      },
      startTime: new Date(2024, 0, 15, 9, 0),
      endTime: new Date(2024, 0, 15, 11, 30),
      duration: 9000, // 2.5 hours
      description: 'Debugging OAuth flow issues',
      user: { name: 'John Doe', profilePicture: undefined }
    },
    {
      id: '2',
      task: {
        _id: '2',
        title: 'Implement dashboard',
        taskCode: 'FLW-124',
        project: { name: 'Dashboard', emoji: '📊' }
      },
      startTime: new Date(2024, 0, 15, 13, 0),
      endTime: new Date(2024, 0, 15, 17, 0),
      duration: 14400, // 4 hours
      description: 'Building analytics cards',
      user: { name: 'John Doe', profilePicture: undefined }
    }
  ];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTotalTime = (entries: TimeEntry[]) => {
    return entries.reduce((total, entry) => total + entry.duration, 0);
  };

  const getTimeRangeText = () => {
    const now = new Date();
    switch (timeRange) {
      case 'today':
        return format(now, 'MMMM d, yyyy');
      case 'week':
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(now, 'MMMM yyyy');
      default:
        return '';
    }
  };

  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Time Tracking</h2>
          <p className="text-muted-foreground">
            Track time, view reports, and analyze productivity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tracker" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracker">Time Tracker</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Time Tracker Widget */}
            <div className="lg:col-span-1">
              <TimeTracker />
            </div>

            {/* Recent Time Entries */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent Time Entries
                  </CardTitle>
                  <CardDescription>
                    Your latest time tracking activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTimeEntries.map((entry) => {
                      const name = entry.user.name;
                      const initials = getAvatarFallbackText(name);
                      const avatarColor = getAvatarColor(name);

                      return (
                        <div key={entry.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={entry.user.profilePicture} alt={name} />
                              <AvatarFallback className={`${avatarColor} text-xs`}>
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {entry.task.taskCode}
                                </Badge>
                                <span className="text-sm font-medium">
                                  {entry.task.title}
                                </span>
                                {entry.task.project && (
                                  <span className="text-xs text-muted-foreground">
                                    {entry.task.project.emoji} {entry.task.project.name}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {format(entry.startTime, 'MMM d, HH:mm')} - {format(entry.endTime, 'HH:mm')}
                              </p>
                              {entry.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {entry.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm font-medium">
                            {formatDuration(entry.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {getTimeRangeText()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Total Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDuration(getTotalTime(mockTimeEntries))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tasks Worked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(mockTimeEntries.map(e => e.task._id)).size}
                </div>
                <p className="text-xs text-muted-foreground">
                  Different tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Avg per Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDuration(Math.round(getTotalTime(mockTimeEntries) / mockTimeEntries.length))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  85%
                </div>
                <p className="text-xs text-muted-foreground">
                  vs last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Time Entries Table */}
          <Card>
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
              <CardDescription>
                Detailed breakdown of time spent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTimeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {entry.task.taskCode}
                          </Badge>
                          <span className="font-medium">{entry.task.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {entry.task.project && (
                          <div className="flex items-center gap-1">
                            <span>{entry.task.project.emoji}</span>
                            <span>{entry.task.project.name}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatDuration(entry.duration)}
                      </TableCell>
                      <TableCell>
                        {format(entry.startTime, 'MMM d, HH:mm')}
                      </TableCell>
                      <TableCell>
                        {format(entry.endTime, 'HH:mm')}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {entry.description || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
                  </CardTitle>
                  <CardDescription>
                    Time entries for selected date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {/* Timeline view would go here */}
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Calendar view implementation coming soon...
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Select a date to view time entries
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Weekly Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart component coming soon...
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Productivity Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Trend analysis coming soon...
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeTrackingPage;