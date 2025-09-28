/**
 * Dashboard Quick Actions Component
 * Worklenz-inspired quick action buttons for common tasks
 */

import { 
  Plus, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUIStore, useTaskStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
  description: string;
  shortcut?: string;
}

const DashboardQuickActions = () => {
  const navigate = useNavigate();
  const { openModal } = useUIStore();
  const { setViewMode } = useTaskStore();

  const quickActions: QuickAction[] = [
    {
      id: 'create-project',
      label: 'New Project',
      icon: Plus,
      action: () => openModal('createProject'),
      color: 'bg-primary hover:bg-primary/90 text-primary-foreground',
      description: 'Start a new project',
      shortcut: 'Cmd+N'
    },
    {
      id: 'create-task',
      label: 'Add Task',
      icon: Target,
      action: () => openModal('createTask'),
      color: 'bg-green-500 hover:bg-green-600 text-white',
      description: 'Create a new task',
      shortcut: 'Cmd+T'
    },
    {
      id: 'invite-member',
      label: 'Invite Team',
      icon: Users,
      action: () => navigate('members'),
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      description: 'Invite team members',
    },
    {
      id: 'view-calendar',
      label: 'Calendar',
      icon: Calendar,
      action: () => {
        setViewMode('calendar');
        navigate('tasks');
      },
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      description: 'Open calendar view',
    },
    {
      id: 'time-tracking',
      label: 'Time Track',
      icon: Clock,
      action: () => navigate('time-tracking'),
      color: 'bg-orange-500 hover:bg-orange-600 text-white',
      description: 'Start time tracking',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      action: () => navigate('reports'),
      color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      description: 'View reports',
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <Button variant="ghost" size="sm" onClick={() => openModal('shortcuts')}>
            <Zap className="h-4 w-4 mr-2" />
            Shortcuts
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <div key={action.id} className="group relative">
                <Button
                  onClick={action.action}
                  className={cn(
                    "h-20 w-full flex-col space-y-2 relative overflow-hidden transition-all duration-200 hover:scale-105",
                    action.color
                  )}
                  variant="default"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{action.label}</span>
                  
                  {/* Shortcut indicator */}
                  {action.shortcut && (
                    <span className="absolute top-1 right-1 text-[10px] opacity-70">
                      {action.shortcut.replace('Cmd', '⌘')}
                    </span>
                  )}
                </Button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {action.description}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;