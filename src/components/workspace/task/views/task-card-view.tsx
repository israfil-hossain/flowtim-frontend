import { FC, useState } from "react";
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
import { DataTablePagination } from "../table/table-pagination";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
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

interface TaskCardViewProps {
  tasks: TaskType[];
  isLoading: boolean;
  pagination: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface TaskCardProps {
  task: TaskType;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const workspaceId = useWorkspaceId();
  const deleteTaskMutation = useDeleteTask();
  
  const status = statuses.find(s => s.value === task.status);
  const priority = priorities.find(p => p.value === task.priority);
  
  const assignee = task.assignedTo;
  const name = assignee?.name || "";
  const initials = getAvatarFallbackText(name);
  const avatarColor = getAvatarColor(name);

  const statusKey = formatStatusToEnum(task.status) as TaskStatusEnumType;
  const priorityKey = formatStatusToEnum(task.priority) as TaskPriorityEnumType;
  
  const StatusIcon = status?.icon;
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
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="w-fit">
            {task.taskCode}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-6 p-0">
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
        <h3 className="font-medium text-sm line-clamp-2">
          {task.title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center gap-2">
          {StatusIcon && (
            <Badge
              variant={TaskStatusEnum[statusKey]}
              className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0 text-xs"
            >
              <StatusIcon className="h-3 w-3 rounded-full text-inherit" />
              <span>{status?.label}</span>
            </Badge>
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
        </div>

        {task.project && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Project:</span>
            <div className="flex items-center gap-1">
              <span>{task.project.emoji}</span>
              <span className="text-sm">{task.project.name}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          {assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={assignee.profilePicture || ""} alt={name} />
                <AvatarFallback className={avatarColor}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm truncate max-w-[100px]">{name}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="text-xs text-muted-foreground">
              Due: {format(new Date(task.dueDate), "MMM dd")}
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
  <Card className="w-full">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8" />
      </div>
      <Skeleton className="h-4 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    </CardContent>
  </Card>
);

export const TaskCardView: FC<TaskCardViewProps> = ({
  tasks,
  isLoading,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  const { totalCount, pageNumber, pageSize } = pagination;

  // Create a dummy table for pagination component
  const table = useReactTable({
    data: tasks,
    columns: [],
    manualPagination: true,
    state: {
      pagination: { pageIndex: pageNumber - 1, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
  });


  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard 
            key={task._id} 
            task={task}
          />
        ))}
      </div>
      
      <DataTablePagination
        table={table}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};