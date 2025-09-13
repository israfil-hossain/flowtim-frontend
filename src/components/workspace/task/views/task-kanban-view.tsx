/**
 * Kanban Board View
 * Advanced drag-and-drop task board with swimlanes
 */

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Flag,
  Clock,
  MessageSquare,
  Paperclip
} from "lucide-react";
import { format } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  subtaskCount?: number;
  commentCount?: number;
  attachmentCount?: number;
  projectName?: string;
  projectColor?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  tasks: Task[];
}

export const TaskKanbanView: FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      status: 'BACKLOG',
      color: 'bg-gray-100',
      tasks: [
        {
          id: '1',
          title: 'Research competitor analysis',
          description: 'Analyze top 5 competitors in the market',
          status: 'BACKLOG',
          priority: 'MEDIUM',
          assignedTo: {
            id: 'user1',
            name: 'John Doe',
          },
          dueDate: new Date(2024, 2, 15),
          estimatedHours: 8,
          subtaskCount: 3,
          commentCount: 2,
          projectName: 'Market Research',
          projectColor: 'bg-blue-500'
        }
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      status: 'TODO',
      color: 'bg-blue-100',
      tasks: [
        {
          id: '2',
          title: 'Design user interface mockups',
          status: 'TODO',
          priority: 'HIGH',
          assignedTo: {
            id: 'user2',
            name: 'Jane Smith',
          },
          dueDate: new Date(2024, 2, 18),
          estimatedHours: 12,
          subtaskCount: 5,
          commentCount: 1,
          attachmentCount: 2,
          projectName: 'UI Design',
          projectColor: 'bg-green-500'
        },
        {
          id: '3',
          title: 'Set up development environment',
          status: 'TODO',
          priority: 'MEDIUM',
          assignedTo: {
            id: 'user3',
            name: 'Mike Johnson',
          },
          dueDate: new Date(2024, 2, 20),
          estimatedHours: 4,
          subtaskCount: 2,
          projectName: 'Development',
          projectColor: 'bg-purple-500'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      status: 'IN_PROGRESS',
      color: 'bg-yellow-100',
      tasks: [
        {
          id: '4',
          title: 'Implement authentication system',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          assignedTo: {
            id: 'user4',
            name: 'Sarah Wilson',
          },
          dueDate: new Date(2024, 2, 22),
          estimatedHours: 16,
          actualHours: 8,
          subtaskCount: 4,
          commentCount: 5,
          projectName: 'Backend',
          projectColor: 'bg-red-500'
        }
      ]
    },
    {
      id: 'in-review',
      title: 'In Review',
      status: 'IN_REVIEW',
      color: 'bg-orange-100',
      tasks: [
        {
          id: '5',
          title: 'Create API documentation',
          status: 'IN_REVIEW',
          priority: 'LOW',
          assignedTo: {
            id: 'user5',
            name: 'David Brown',
          },
          dueDate: new Date(2024, 2, 25),
          estimatedHours: 6,
          actualHours: 6,
          subtaskCount: 1,
          commentCount: 3,
          attachmentCount: 1,
          projectName: 'Documentation',
          projectColor: 'bg-indigo-500'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      status: 'DONE',
      color: 'bg-green-100',
      tasks: [
        {
          id: '6',
          title: 'Database schema design',
          status: 'DONE',
          priority: 'HIGH',
          assignedTo: {
            id: 'user1',
            name: 'John Doe',
          },
          dueDate: new Date(2024, 2, 10),
          estimatedHours: 8,
          actualHours: 7,
          subtaskCount: 3,
          commentCount: 2,
          projectName: 'Database',
          projectColor: 'bg-teal-500'
        }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Task['status']) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(column => {
        if (column.status === draggedTask.status) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== draggedTask.id)
          };
        }
        
        if (column.status === targetStatus) {
          return {
            ...column,
            tasks: [...column.tasks, { ...draggedTask, status: targetStatus }]
          };
        }
        
        return column;
      });
      
      return newColumns;
    });

    setDraggedTask(null);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <Card className={`h-full ${column.color} border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {column.title}
                    <Badge variant="secondary" className="ml-2">
                      {column.tasks.length}
                    </Badge>
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {column.tasks.map((task) => {
                    const assignee = task.assignedTo;
                    const assigneeName = assignee?.name || '';
                    const assigneeInitials = assigneeName ? getAvatarFallbackText(assigneeName) : '';
                    const assigneeColor = assigneeName ? getAvatarColor(assigneeName) : '';
                    
                    return (
                      <Card
                        key={task.id}
                        className="bg-white hover:shadow-md transition-shadow cursor-move border border-gray-200"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                      >
                        <CardContent className="p-4">
                          {task.projectName && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${task.projectColor}`}></div>
                              <span className="text-xs text-muted-foreground font-medium">
                                {task.projectName}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm leading-tight pr-2">
                              {task.title}
                            </h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          {task.description && (
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(task.priority)}`}>
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority}
                            </Badge>
                            
                            {task.dueDate && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{format(task.dueDate, 'MMM d')}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {assignee && (
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={assignee.avatar} alt={assigneeName} />
                                    <AvatarFallback className={`${assigneeColor} text-[10px]`}>
                                      {assigneeInitials}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                              )}
                              
                              {task.estimatedHours && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {task.actualHours ? 
                                      `${task.actualHours}/${task.estimatedHours}h` : 
                                      `${task.estimatedHours}h`
                                    }
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {task.subtaskCount && task.subtaskCount > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <div className="w-3 h-3 border rounded-sm flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-current rounded-xs"></div>
                                  </div>
                                  <span>{task.subtaskCount}</span>
                                </div>
                              )}
                              
                              {task.commentCount && task.commentCount > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{task.commentCount}</span>
                                </div>
                              )}
                              
                              {task.attachmentCount && task.attachmentCount > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Paperclip className="h-3 w-3" />
                                  <span>{task.attachmentCount}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};