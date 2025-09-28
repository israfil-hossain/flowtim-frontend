import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
} from "@/constant";
import {
  formatStatusToEnum,
  getAvatarColor,
  getAvatarFallbackText,
} from "@/lib/helper";
import { priorities, statuses } from "./data";
import { TaskType } from "@/types/api.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const getColumns = (
  projectId?: string,
  onTaskExpand?: (taskId: string) => void,
  expandedTasks?: Set<string>,
  onTaskClick?: (task: TaskType) => void,
  onStatusChange?: (taskId: string, status: string) => void
): ColumnDef<TaskType>[] => {
  const columns: ColumnDef<TaskType>[] = [
    {
      id: "_id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "expand",
      header: () => null,
      cell: ({ row }) => {
        const task = row.original;
        const isExpanded = expandedTasks?.has(task._id) || false;
        
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onTaskExpand?.(task._id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        );
      },
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div className="flex flex-wrap space-x-2">
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => onTaskClick?.(task)}
            >
              <Badge variant="outline" className="capitalize shrink-0 h-[25px] hover:bg-muted cursor-pointer">
                {task.taskCode}
              </Badge>
            </Button>
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent text-left justify-start"
              onClick={() => onTaskClick?.(task)}
            >
              <span className="block lg:max-w-[220px] max-w-[200px] font-medium hover:text-primary cursor-pointer">
                {task.title}
              </span>
            </Button>
          </div>
        );
      },
    },
    ...(projectId
      ? [] // If projectId exists, exclude the "Project" column
      : [
          {
            accessorKey: "project",
            header: ({ column }: { column: Column<TaskType, unknown> }) => (
              <DataTableColumnHeader column={column} title="Project" />
            ),
            cell: ({ row }: { row: Row<TaskType> }) => {
              const project = row.original.project;

              if (!project) {
                return null;
              }

              return (
                <div className="flex items-center gap-1">
                  <span className="rounded-full border">{project.emoji}</span>
                  <span className="block capitalize truncate w-[100px] text-ellipsis">
                    {project.name}
                  </span>
                </div>
              );
            },
          },
        ]),
    {
      accessorKey: "assignedTo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned To" />
      ),
      cell: ({ row }) => {
        const assignee = row.original.assignedTo || null;
        const name = assignee?.name || "";

        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          name && (
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={assignee?.profilePicture || ""} alt={name} />
                <AvatarFallback className={avatarColor}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="block text-ellipsis w-[100px] truncate">
                {assignee?.name}
              </span>
            </div>
          )
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => {
        return (
          <span className="lg:max-w-[100px] text-sm">
            {row.original.dueDate ? format(row.original.dueDate, "PPP") : null}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const task = row.original;
        const currentStatus = statuses.find(
          (status) => status.value === task.status
        );

        return (
          <div className="lg:w-[120px]">
            <Select
              value={task.status}
              onValueChange={(value) => onStatusChange?.(task._id, value)}
            >
              <SelectTrigger className="h-8 w-full border-none p-0 bg-transparent hover:bg-muted focus:ring-0 focus:ring-offset-0">
                <SelectValue>
                  {currentStatus && (
                    <div className="flex items-center gap-1">
                      {currentStatus.icon && (
                        <currentStatus.icon className="h-3 w-3" />
                      )}
                      <span className="text-xs">{currentStatus.label}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => {
                  const StatusIcon = status.icon;
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        {StatusIcon && <StatusIcon className="h-3 w-3" />}
                        <span>{status.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = priorities.find(
          (priority) => priority.value === row.getValue("priority")
        );

        if (!priority) {
          return null;
        }

        const statusKey = formatStatusToEnum(
          priority.value
        ) as TaskPriorityEnumType;
        const Icon = priority.icon;

        if (!Icon) {
          return null;
        }

        return (
          <div className="flex items-center">
            <Badge
              variant={TaskPriorityEnum[statusKey]}
              className="flex lg:w-[110px] p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0"
            >
              <Icon className="h-4 w-4 rounded-full text-inherit" />
              <span>{priority.label}</span>
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <DataTableRowActions row={row} />
          </>
        );
      },
    },
  ];

  return columns;
};
