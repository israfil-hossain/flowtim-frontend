import { FC, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  Edit2, 
  Save,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { TaskType } from "@/types/api.type";
import { 
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
} from "@/constant";
import { 
  formatStatusToEnum,
  getAvatarColor,
  getAvatarFallbackText 
} from "@/lib/helper";
import { priorities, statuses } from "./table/data";
import { SubtaskList } from "./subtasks/subtask-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskDetailSidebarProps {
  task: TaskType | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (taskId: string, updates: Partial<TaskType>) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskDetailSidebar: FC<TaskDetailSidebarProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task?.description || "");

  if (!task) return null;

  const priority = priorities.find(p => p.value === task.priority);
  const status = statuses.find(s => s.value === task.status);
  
  const assignee = task.assignedTo;
  const name = assignee?.name || "";
  const initials = getAvatarFallbackText(name);
  const avatarColor = getAvatarColor(name);

  const priorityKey = formatStatusToEnum(task.priority) as TaskPriorityEnumType;
  const statusKey = formatStatusToEnum(task.status) as TaskStatusEnumType;
  const PriorityIcon = priority?.icon;
  const StatusIcon = status?.icon;

  // Mock subtask data - in real implementation, this would come from API
  const mockSubtasks = [
    { id: '1', title: 'Design wireframes', status: 'DONE' },
    { id: '2', title: 'Implement API endpoints', status: 'IN_PROGRESS' },
    { id: '3', title: 'Write unit tests', status: 'TODO' },
  ];
  
  const completedSubtasks = mockSubtasks.filter(s => s.status === 'DONE').length;
  const totalSubtasks = mockSubtasks.length;
  const completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const handleSaveDescription = () => {
    if (onUpdate) {
      onUpdate(task._id, { description });
    }
    setIsEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setDescription(task.description || "");
    setIsEditingDescription(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {task.taskCode}
              </Badge>
              <h2 className="font-semibold text-lg truncate">
                Task Details
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete?.(task._id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Task Title */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {task.title}
                </h3>
                
                {/* Status and Priority */}
                <div className="flex items-center gap-2 mb-4">
                  {StatusIcon && (
                    <Badge
                      variant={TaskStatusEnum[statusKey]}
                      className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                    >
                      <StatusIcon className="h-3 w-3 rounded-full text-inherit" />
                      <span className="text-xs">{status?.label}</span>
                    </Badge>
                  )}
                  
                  {PriorityIcon && (
                    <Badge
                      variant={TaskPriorityEnum[priorityKey]}
                      className="flex w-auto p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0"
                    >
                      <PriorityIcon className="h-3 w-3 rounded-full text-inherit" />
                      <span className="text-xs">{priority?.label}</span>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Description</CardTitle>
                    {!isEditingDescription ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingDescription(true)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveDescription}
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditingDescription ? (
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a description..."
                      className="min-h-20 resize-none"
                      autoFocus
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {task.description || "No description"}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Task Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Task Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Project */}
                  {task.project && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Project</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{task.project.emoji}</span>
                        <span className="text-sm font-medium">{task.project.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Assignee */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Assigned to</span>
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={assignee.profilePicture || ""} alt={name} />
                          <AvatarFallback className={`${avatarColor} text-xs`}>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                  
                  {/* Due Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Due date</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {task.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Progress ({completedSubtasks}/{totalSubtasks})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={completionPercentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{Math.round(completionPercentage)}% completed</span>
                      <span>{totalSubtasks - completedSubtasks} remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subtasks */}
              <div>
                <SubtaskList
                  taskId={task._id}
                  taskTitle={task.title}
                  className="border-0 shadow-none"
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};