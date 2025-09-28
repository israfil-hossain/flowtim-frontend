import { useState } from "react";
import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";
import { TaskKanbanView } from "@/components/workspace/task/views/task-kanban-view";
import { Button } from "@/components/ui/button";
import { Table, Layout } from "lucide-react";

export default function Tasks() {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8"
            >
              <Table className="h-4 w-4" />
              Table
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8"
            >
              <Layout className="h-4 w-4" />
              Kanban
            </Button>
          </div>
          <CreateTaskDialog />
        </div>
      </div>
      
      <div className="flex-1">
        {viewMode === 'table' ? (
          <TaskTable />
        ) : (
          <TaskKanbanView />
        )}
      </div>
    </div>
  );
}
