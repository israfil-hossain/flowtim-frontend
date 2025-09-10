import { FC, useMemo, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { priorities, statuses } from "../table/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditTaskDialog from "../edit-task-dialog";
import { useDeleteTask } from "@/hooks/api/use-task-operations";
import useWorkspaceId from "@/hooks/use-workspace-id";

interface TaskCanvasViewProps {
  tasks: TaskType[];
  isLoading: boolean;
}

interface TaskCardProps {
  task: TaskType;
}

interface StatusColumnProps {
  title: string;
  tasks: TaskType[];
  statusColor: string;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const workspaceId = useWorkspaceId();
  const deleteTaskMutation = useDeleteTask();
  
  const priority = priorities.find(p => p.value === task.priority);
  
  const assignee = task.assignedTo;
  const name = assignee?.name || "";
  const initials = getAvatarFallbackText(name);
  const avatarColor = getAvatarColor(name);

  const priorityKey = formatStatusToEnum(task.priority) as TaskPriorityEnumType;
  const PriorityIcon = priority?.icon;

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    deleteTaskMutation.mutate({
      workspaceId,
      taskId: task._id,
    });
    setIsDeleteOpen(false);
  };

  return (
    <Card className="w-full mb-3 hover:shadow-md transition-all cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="w-fit text-xs">
            {task.taskCode}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h3 className="font-medium text-sm line-clamp-2 pr-2">
          {task.title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-2">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        {PriorityIcon && (
          <Badge
            variant={TaskPriorityEnum[priorityKey]}
            className="flex w-auto p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0 text-xs"
          >
            <PriorityIcon className="h-3 w-3 rounded-full text-inherit" />
            <span>{priority?.label}</span>
          </Badge>
        )}

        {task.project && (
          <div className="flex items-center gap-1">
            <span className="text-xs">{task.project.emoji}</span>
            <span className="text-xs text-muted-foreground truncate">
              {task.project.name}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          {assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={assignee.profilePicture || ""} alt={name} />
                <AvatarFallback className={`${avatarColor} text-xs`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          
          {task.dueDate && (
            <div className="text-xs text-muted-foreground">
              {format(new Date(task.dueDate), "MMM dd")}
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <EditTaskDialog
        task={task}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteTaskMutation.isPending}
            >
              {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

const TaskCardSkeleton = () => (
  <Card className="w-full mb-3">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-6" />
      </div>
      <Skeleton className="h-4 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-5 w-20" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
    </CardContent>
  </Card>
);

const StatusColumn: FC<StatusColumnProps> = ({ 
  title, 
  tasks, 
  statusColor
}) => {
  return (
    <div className="flex-1 min-w-[280px] bg-slate-50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <h3 className="font-medium text-sm text-slate-700">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-0">
        {tasks.map((task) => (
          <TaskCard 
            key={task._id} 
            task={task}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No tasks in this status
          </div>
        )}
      </div>
    </div>
  );
};

export const TaskCanvasView: FC<TaskCanvasViewProps> = ({
  tasks,
  isLoading,
}) => {
  const tasksByStatus = useMemo(() => {
    const grouped = tasks.reduce((acc, task) => {
      const status = task.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {} as Record<string, TaskType[]>);
    
    return grouped;
  }, [tasks]);


  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <div key={status.value} className="flex-1 min-w-[280px] bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-6" />
            </div>
            <div className="space-y-0">
              {Array.from({ length: 3 }).map((_, index) => (
                <TaskCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
      {statuses.map((status) => {
        const statusKey = formatStatusToEnum(status.value) as TaskStatusEnumType;
        const statusVariant = TaskStatusEnum[statusKey];
        
        // Map status variants to colors for the dot indicator
        const statusColorMap: Record<string, string> = {
          'todo': 'bg-slate-400',
          'inProgress': 'bg-yellow-400',
          'done': 'bg-green-400',
          'cancelled': 'bg-red-400',
          'default': 'bg-slate-400',
        };
        
        const statusColor = statusColorMap[statusVariant] || statusColorMap.default;
        
        return (
          <StatusColumn
            key={status.value}
            title={status.label}
            tasks={tasksByStatus[status.value] || []}
            statusColor={statusColor}
          />
        );
      })}
    </div>
  );
};