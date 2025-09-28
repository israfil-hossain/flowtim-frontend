/**
 * Subtask List Component
 * Manage subtasks within a task
 */

import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  ChevronDown, 
  ChevronRight,
  CheckCircle2,
  Edit,
  Trash2,
  Flag
} from "lucide-react";
import { format } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Subtask {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  createdAt: Date;
  completedAt?: Date;
  parentTaskId: string;
  order: number;
  estimatedHours?: number;
  actualHours?: number;
}

interface SubtaskListProps {
  taskId: string;
  taskTitle: string;
  className?: string;
}

export const SubtaskList: FC<SubtaskListProps> = ({ taskId, taskTitle, className }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    {
      id: '1',
      title: 'Design wireframes',
      description: 'Create initial wireframes for the dashboard',
      status: 'DONE',
      priority: 'HIGH',
      assignedTo: {
        id: 'user1',
        name: 'John Doe',
        avatar: undefined
      },
      dueDate: new Date(2024, 0, 20),
      createdAt: new Date(2024, 0, 10),
      completedAt: new Date(2024, 0, 18),
      parentTaskId: taskId,
      order: 1,
      estimatedHours: 8,
      actualHours: 6
    },
    {
      id: '2',
      title: 'Implement API endpoints',
      description: 'Create REST API endpoints for user management',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      assignedTo: {
        id: 'user2',
        name: 'Jane Smith',
        avatar: undefined
      },
      dueDate: new Date(2024, 0, 25),
      createdAt: new Date(2024, 0, 12),
      parentTaskId: taskId,
      order: 2,
      estimatedHours: 12,
      actualHours: 8
    },
    {
      id: '3',
      title: 'Write unit tests',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date(2024, 0, 30),
      createdAt: new Date(2024, 0, 15),
      parentTaskId: taskId,
      order: 3,
      estimatedHours: 6
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as const,
    assignedTo: '',
    dueDate: '',
    estimatedHours: ''
  });

  const completedSubtasks = subtasks.filter(s => s.status === 'DONE').length;
  const totalSubtasks = subtasks.length;
  const completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE': return 'text-green-600 bg-green-100 border-green-200';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'TODO': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleSubtaskToggle = (subtaskId: string) => {
    setSubtasks(prev => prev.map(subtask => {
      if (subtask.id === subtaskId) {
        const newStatus = subtask.status === 'DONE' ? 'TODO' : 'DONE';
        return {
          ...subtask,
          status: newStatus,
          completedAt: newStatus === 'DONE' ? new Date() : undefined
        };
      }
      return subtask;
    }));
  };

  const handleCreateSubtask = () => {
    if (!newSubtask.title.trim()) return;

    const subtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtask.title,
      description: newSubtask.description || undefined,
      status: 'TODO',
      priority: newSubtask.priority,
      assignedTo: newSubtask.assignedTo ? {
        id: newSubtask.assignedTo,
        name: 'User Name', // TODO: Get from users list
      } : undefined,
      dueDate: newSubtask.dueDate ? new Date(newSubtask.dueDate) : undefined,
      createdAt: new Date(),
      parentTaskId: taskId,
      order: subtasks.length + 1,
      estimatedHours: newSubtask.estimatedHours ? parseInt(newSubtask.estimatedHours) : undefined
    };

    setSubtasks(prev => [...prev, subtask]);
    setNewSubtask({
      title: '',
      description: '',
      priority: 'MEDIUM',
      assignedTo: '',
      dueDate: '',
      estimatedHours: ''
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    setSubtasks(prev => prev.filter(s => s.id !== subtaskId));
  };

  const handleEditSubtask = (subtaskId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit subtask:', subtaskId);
  };

  return (
    <Card className={className}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <CheckCircle2 className="h-4 w-4" />
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress value={completionPercentage} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(completionPercentage)}%
                </span>
                
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle>Create Subtask</DialogTitle>
                      <DialogDescription>
                        Add a subtask to "{taskTitle}"
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          placeholder="Subtask title..."
                          value={newSubtask.title}
                          onChange={(e) => setNewSubtask(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Subtask description..."
                          value={newSubtask.description}
                          onChange={(e) => setNewSubtask(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <Select value={newSubtask.priority} onValueChange={(value: any) => setNewSubtask(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LOW">Low</SelectItem>
                              <SelectItem value="MEDIUM">Medium</SelectItem>
                              <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Estimated Hours</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={newSubtask.estimatedHours}
                            onChange={(e) => setNewSubtask(prev => ({ ...prev, estimatedHours: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <Input
                          type="date"
                          value={newSubtask.dueDate}
                          onChange={(e) => setNewSubtask(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateSubtask} disabled={!newSubtask.title.trim()}>
                        Create Subtask
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-3">
            {subtasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                <p>No subtasks yet</p>
                <p className="text-sm">Break down this task into smaller steps</p>
              </div>
            ) : (
              subtasks.map((subtask) => {
                const assignee = subtask.assignedTo;
                const assigneeName = assignee?.name || '';
                const assigneeInitials = assigneeName ? getAvatarFallbackText(assigneeName) : '';
                const assigneeColor = assigneeName ? getAvatarColor(assigneeName) : '';

                return (
                  <div key={subtask.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors group">
                    <Checkbox
                      checked={subtask.status === 'DONE'}
                      onCheckedChange={() => handleSubtaskToggle(subtask.id)}
                      className="mt-0.5"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${subtask.status === 'DONE' ? 'line-through text-muted-foreground' : ''}`}>
                            {subtask.title}
                          </h4>
                          {subtask.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {subtask.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleEditSubtask(subtask.id)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditSubtask(subtask.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteSubtask(subtask.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(subtask.status)}`}>
                            {subtask.status.replace('_', ' ')}
                          </Badge>
                          
                          <Badge className={`text-xs ${getPriorityColor(subtask.priority)}`}>
                            <Flag className="h-3 w-3 mr-1" />
                            {subtask.priority}
                          </Badge>
                        </div>
                        
                        {assignee && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={assignee.avatar} alt={assigneeName} />
                              <AvatarFallback className={`${assigneeColor} text-[8px]`}>
                                {assigneeInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{assigneeName}</span>
                          </div>
                        )}
                        
                        {subtask.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{format(subtask.dueDate, 'MMM d')}</span>
                          </div>
                        )}
                        
                        {subtask.estimatedHours && (
                          <div className="text-xs text-muted-foreground">
                            {subtask.actualHours ? 
                              `${subtask.actualHours}/${subtask.estimatedHours}h` : 
                              `${subtask.estimatedHours}h est.`
                            }
                          </div>
                        )}
                      </div>
                      
                      {subtask.completedAt && (
                        <div className="text-xs text-green-600 mt-1">
                          Completed {format(subtask.completedAt, 'MMM d, HH:mm')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};