/**
 * Time Tracker Component
 * Provides start/stop timer functionality with task selection
 */

import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Square, Clock, Timer, Calendar } from "lucide-react";
import { TaskType } from "@/types/api.type";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAllTasksQueryFn } from "@/lib/api";
import useWorkspaceId from "@/hooks/use-workspace-id";

interface TimeEntry {
  id: string;
  taskId: string;
  task?: TaskType;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  description?: string;
  userId: string;
  workspaceId: string;
  createdAt: Date;
}

interface TimeTrackerProps {
  className?: string;
}

interface ActiveSession {
  taskId: string;
  task: TaskType;
  startTime: Date;
  description?: string;
}

export const TimeTracker: FC<TimeTrackerProps> = ({ className }) => {
  const workspaceId = useWorkspaceId();
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [description, setDescription] = useState("");
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);

  // Fetch tasks for selection
  const { data: tasksData } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({
      workspaceId,
      pageNumber: 1,
      pageSize: 50,
    }),
    enabled: !!workspaceId,
  });

  const tasks = tasksData?.tasks || [];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeSession) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - activeSession.startTime.getTime()) / 1000);
        setElapsed(diff);
      }, 1000);
    } else {
      setElapsed(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession]);

  // Load active session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('activeTimeSession');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setActiveSession({
          ...session,
          startTime: new Date(session.startTime),
        });
      } catch (error) {
        console.error('Failed to load saved session:', error);
        localStorage.removeItem('activeTimeSession');
      }
    }
  }, []);

  // Save active session to localStorage
  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('activeTimeSession', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('activeTimeSession');
    }
  }, [activeSession]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    if (!selectedTask) return;

    const session: ActiveSession = {
      taskId: selectedTask._id,
      task: selectedTask,
      startTime: new Date(),
      description,
    };

    setActiveSession(session);
    setIsStartDialogOpen(false);
    setDescription("");
  };

  const handlePauseTimer = () => {
    // TODO: Implement pause functionality
    console.log('Pause timer - TODO: Implement pause functionality');
  };

  const handleStopTimer = () => {
    if (!activeSession) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - activeSession.startTime.getTime()) / 1000);

    // TODO: Save time entry to backend
    const timeEntry: Omit<TimeEntry, 'id' | 'userId' | 'createdAt'> = {
      taskId: activeSession.taskId,
      task: activeSession.task,
      startTime: activeSession.startTime,
      endTime,
      duration,
      description: activeSession.description,
      workspaceId,
    };

    console.log('Saving time entry:', timeEntry);
    
    // TODO: Call API to save time entry
    // await saveTimeEntry(timeEntry);

    setActiveSession(null);
    setElapsed(0);
  };

  const handleQuickStart = (task: TaskType) => {
    const session: ActiveSession = {
      taskId: task._id,
      task,
      startTime: new Date(),
    };

    setActiveSession(session);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-4 w-4" />
          Time Tracker
        </CardTitle>
        <CardDescription>
          Track time spent on tasks
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Active Session Display */}
        {activeSession && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">Tracking Time</span>
              </div>
              <div className="text-2xl font-mono font-bold text-blue-700">
                {formatTime(elapsed)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600">Task:</span>
                <Badge variant="outline" className="text-xs">
                  {activeSession.task.taskCode}
                </Badge>
                <span className="text-sm font-medium text-blue-700">
                  {activeSession.task.title}
                </span>
              </div>
              
              {activeSession.task.project && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600">Project:</span>
                  <span className="text-sm text-blue-700">
                    {activeSession.task.project.emoji} {activeSession.task.project.name}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600">Started:</span>
                <span className="text-sm text-blue-700">
                  {format(activeSession.startTime, 'HH:mm:ss')}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handlePauseTimer}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={handleStopTimer}
              >
                <Square className="h-3 w-3 mr-1" />
                Stop
              </Button>
            </div>
          </div>
        )}

        {/* Start Timer Controls */}
        {!activeSession && (
          <div className="space-y-4">
            <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Timer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Time Tracking</DialogTitle>
                  <DialogDescription>
                    Select a task and add an optional description
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Task</label>
                    <Select onValueChange={(value) => {
                      const task = tasks.find(t => t._id === value);
                      setSelectedTask(task || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task..." />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map((task) => (
                          <SelectItem key={task._id} value={task._id}>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {task.taskCode}
                              </Badge>
                              <span>{task.title}</span>
                              {task.project && (
                                <span className="text-xs text-muted-foreground">
                                  • {task.project.emoji} {task.project.name}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Textarea
                      placeholder="What are you working on?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    onClick={handleStartTimer}
                    disabled={!selectedTask}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Tracking
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Quick Start from Recent Tasks */}
            {tasks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Quick Start</h4>
                <div className="space-y-2">
                  {tasks.slice(0, 3).map((task) => {
                    const assignee = task.assignedTo;
                    const name = assignee?.name || "";
                    const initials = getAvatarFallbackText(name);
                    const avatarColor = getAvatarColor(name);

                    return (
                      <div
                        key={task._id}
                        className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleQuickStart(task)}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <Badge variant="outline" className="text-xs">
                            {task.taskCode}
                          </Badge>
                          <span className="text-sm font-medium truncate">{task.title}</span>
                          {task.project && (
                            <span className="text-xs text-muted-foreground">
                              {task.project.emoji}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {assignee && (
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={assignee.profilePicture || ""} alt={name} />
                              <AvatarFallback className={`${avatarColor} text-xs`}>
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Today's Summary */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            Today's Summary
          </h4>
          <div className="text-2xl font-mono font-bold text-center py-4 bg-gray-50 rounded">
            {/* TODO: Calculate from today's time entries */}
            00:00:00
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1">
            Total time tracked today
          </p>
        </div>
      </CardContent>
    </Card>
  );
};