import { FC, useState } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, List, LayoutGrid, Kanban, Calendar } from "lucide-react";
import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { priorities, statuses } from "./table/data";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { TaskCardView } from "./views/task-card-view";
import { TaskCanvasView } from "./views/task-canvas-view";
import { TaskCalendarView } from "./views/task-calendar-view";
import { SubtaskList } from "./subtasks/subtask-list";
import { TaskDetailSidebar } from "./task-detail-sidebar";

type Filters = ReturnType<typeof useTaskTableFilter>[0];
type SetFilters = ReturnType<typeof useTaskTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  projectId?: string;
  filters: Filters;
  setFilters: SetFilters;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

type ViewMode = "list" | "card" | "canvas" | "calendar";

const TaskTable = () => {
  const param = useParams();
  const projectId = param.projectId as string;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useTaskTableFilter();
  const workspaceId = useWorkspaceId();
  
  const handleTaskExpand = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (taskId: string, status: string) => {
    // TODO: Implement task status update
    console.log('Update task status:', taskId, status);
  };
  
  const columns = getColumns(projectId, handleTaskExpand, expandedTasks, handleTaskClick, handleStatusChange);

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-tasks",
      workspaceId,
      pageSize,
      pageNumber,
      filters,
      projectId,
    ],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
        keyword: filters.keyword,
        priority: filters.priority,
        status: filters.status,
        projectId: projectId || filters.projectId,
        assignedTo: filters.assigneeId,
        pageNumber,
        pageSize,
      }),
    staleTime: 0,
  });

  const tasks: TaskType[] = data?.tasks || [];
  const totalCount = data?.pagination.totalCount || 0;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const renderExpandedRow = (task: TaskType) => {
    return (
      <div className="p-4 bg-muted/20">
        <SubtaskList
          taskId={task._id}
          taskTitle={task.title}
          className="border-none shadow-none"
        />
      </div>
    );
  };

  const renderView = () => {
    switch (viewMode) {
      case "card":
        return (
          <TaskCardView
            tasks={tasks}
            isLoading={isLoading}
            pagination={{ totalCount, pageNumber, pageSize }}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        );
      case "canvas":
        return (
          <TaskCanvasView
            tasks={tasks}
            isLoading={isLoading}
          />
        );
      case "calendar":
        return (
          <TaskCalendarView
            tasks={tasks}
            isLoading={isLoading}
            onTaskClick={(task) => {
              // TODO: Open task details modal
              console.log('Task clicked:', task.title);
            }}
            onDateClick={(date) => {
              // TODO: Create task for this date
              console.log('Date clicked:', date);
            }}
          />
        );
      default:
        return (
          <DataTable
            isLoading={isLoading}
            data={tasks}
            columns={columns}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pagination={{
              totalCount,
              pageNumber,
              pageSize,
            }}
            expandedTasks={expandedTasks}
            renderExpandedRow={renderExpandedRow}
          />
        );
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full relative">
        {/* Filters are always shown first */}
        <div className="mb-4">
          <DataTableFilterToolbar
            isLoading={isLoading}
            projectId={projectId}
            filters={filters}
            setFilters={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
        
        {/* View component rendered below filters */}
        {renderView()}
        
        {/* Task Detail Sidebar */}
        <TaskDetailSidebar
          task={selectedTask}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          onUpdate={(taskId, updates) => {
            // TODO: Implement task update
            console.log('Update task:', taskId, updates);
          }}
          onDelete={(taskId) => {
            // TODO: Implement task deletion
            console.log('Delete task:', taskId);
          }}
        />
      </div>
    </TooltipProvider>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  isLoading,
  projectId,
  filters,
  setFilters,
  viewMode = "list",
  onViewModeChange,
}) => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetProjectsInWorkspaceQuery({
    workspaceId,
  });

  const { data: memberData } = useGetWorkspaceMembers(workspaceId);

  const projects = data?.projects || [];
  const members = memberData?.members || [];

  //Workspace Projects
  const projectOptions = projects?.map((project) => {
    return {
      label: (
        <div className="flex items-center gap-1">
          <span>{project.emoji}</span>
          <span>{project.name}</span>
        </div>
      ),
      value: project._id,
    };
  });

  // Workspace Memebers
  const assigneesOptions = members?.map((member) => {
    const name = member.userId?.name || "Unknown";
    const initials = getAvatarFallbackText(name);
    const avatarColor = getAvatarColor(name);

    return {
      label: (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      ),
      value: member.userId._id,
    };
  });

  const handleFilterChange = (key: keyof Filters, values: string[]) => {
    setFilters({
      ...filters,
      [key]: values.length > 0 ? values.join(",") : null,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2  lg:space-y-0">
      <div className="flex items-center space-x-2">
         {/* View Toggle */}
        {onViewModeChange && (
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: string) => {
              if (value) onViewModeChange(value as ViewMode);
            }}
            className="h-9"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="list" aria-label="List View" size="sm">
                  <List className="h-3 w-3" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>List View</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="card" aria-label="Card View" size="sm">
                  <LayoutGrid className="h-3 w-3" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Card View</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="canvas" aria-label="Canvas View" size="sm">
                  <Kanban className="h-3 w-3" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Canvas View</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="calendar" aria-label="Calendar View" size="sm">
                  <Calendar className="h-3 w-3" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Calendar View</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        )}

        <Input
          placeholder="Filter tasks..."
          value={filters.keyword || ""}
          onChange={(e) =>
            setFilters({
              keyword: e.target.value,
            })
          }
          className="h-8 w-full lg:w-[250px]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Status filter */}
        <DataTableFacetedFilter
          title="Status"
          multiSelect={true}
          options={statuses}
          disabled={isLoading}
          selectedValues={filters.status?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("status", values)}
        />

        {/* Priority filter */}
        <DataTableFacetedFilter
          title="Priority"
          multiSelect={true}
          options={priorities}
          disabled={isLoading}
          selectedValues={filters.priority?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("priority", values)}
        />

        {/* Assigned To filter */}
        <DataTableFacetedFilter
          title="Assigned To"
          multiSelect={true}
          options={assigneesOptions}
          disabled={isLoading}
          selectedValues={filters.assigneeId?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("assigneeId", values)}
        />

        {!projectId && (
          <DataTableFacetedFilter
            title="Projects"
            multiSelect={false}
            options={projectOptions}
            disabled={isLoading}
            selectedValues={filters.projectId?.split(",") || []}
            onFilterChange={(values) => handleFilterChange("projectId", values)}
          />
        )}

        {Object.values(filters).some(
          (value) => value !== null && value !== ""
        ) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                variant="ghost"
                className="h-8 px-2 lg:px-3"
                onClick={() =>
                  setFilters({
                    keyword: null,
                    status: null,
                    priority: null,
                    projectId: null,
                    assigneeId: null,
                  })
                }
              >
                Reset
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all filters</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default TaskTable;
