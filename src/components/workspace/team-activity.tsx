/**
 * Team Activity Component
 * Shows recent team activities and updates
 */

import { 
  User, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  FileText,
  Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: 'task_completed' | 'task_created' | 'project_created' | 'comment' | 'member_joined';
  user: {
    name: string;
    avatar?: string;
    email: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  metadata?: any;
}

const TeamActivity = () => {
  // Mock activity data - in real app this would come from API
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'task_completed',
      user: { name: 'Alice Johnson', email: 'alice@example.com' },
      action: 'completed task',
      target: 'Fix login bug',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: '2',
      type: 'task_created',
      user: { name: 'Bob Smith', email: 'bob@example.com' },
      action: 'created task',
      target: 'Update documentation',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '3',
      type: 'comment',
      user: { name: 'Carol Davis', email: 'carol@example.com' },
      action: 'commented on',
      target: 'Design System Updates',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: '4',
      type: 'project_created',
      user: { name: 'David Wilson', email: 'david@example.com' },
      action: 'created project',
      target: 'Mobile App Redesign',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '5',
      type: 'member_joined',
      user: { name: 'Emma Brown', email: 'emma@example.com' },
      action: 'joined workspace',
      target: '',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'task_created':
        return <Plus className="h-4 w-4 text-blue-500" />;
      case 'project_created':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      case 'member_joined':
        return <User className="h-4 w-4 text-indigo-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'task_completed':
        return 'border-green-200 bg-green-50';
      case 'task_created':
        return 'border-blue-200 bg-blue-50';
      case 'project_created':
        return 'border-purple-200 bg-purple-50';
      case 'comment':
        return 'border-yellow-200 bg-yellow-50';
      case 'member_joined':
        return 'border-indigo-200 bg-indigo-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Team Activity
        </CardTitle>
        <CardDescription>
          Recent updates from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {/* User Avatar */}
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {getUserInitials(activity.user.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className={`rounded-lg border p-3 ${getActivityColor(activity.type)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {getActivityIcon(activity.type)}
                      <span className="font-medium text-sm">{activity.user.name}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.action} {activity.target && (
                        <span className="font-medium text-foreground">
                          "{activity.target}"
                        </span>
                      )}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </span>
                      
                      {/* Activity Badge */}
                      <Badge variant="secondary" className="text-xs">
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-semibold text-green-600">12</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">8</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">3</div>
              <div className="text-xs text-muted-foreground">New Projects</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamActivity;