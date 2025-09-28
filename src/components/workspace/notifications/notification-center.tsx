/**
 * Notification Center
 * Real-time notifications for tasks, mentions, and system updates
 */

import { FC, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Search, 
 
  MoreHorizontal,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  User,
  MessageSquare,
  FileText,
  AlertTriangle,
  Clock,
  Users
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Notification {
  id: string;
  type: 'task_assigned' | 'task_due' | 'mention' | 'comment' | 'project_update' | 'system' | 'reminder';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  relatedTask?: {
    id: string;
    title: string;
  };
  relatedProject?: {
    id: string;
    name: string;
  };
}

export const NotificationCenter: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Implement user authentication"',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      priority: 'high',
      actor: {
        id: 'user1',
        name: 'John Manager',
        avatar: undefined
      },
      relatedTask: {
        id: 'task1',
        title: 'Implement user authentication'
      },
      relatedProject: {
        id: 'proj1',
        name: 'Auth System'
      }
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: '@you Please review the latest design updates when you get a chance',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: 'medium',
      actor: {
        id: 'user2',
        name: 'Sarah Designer',
      },
      relatedTask: {
        id: 'task2',
        title: 'UI Design Review'
      }
    },
    {
      id: '3',
      type: 'task_due',
      title: 'Task Due Soon',
      message: '"Database schema design" is due tomorrow',
      isRead: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      priority: 'high',
      relatedTask: {
        id: 'task3',
        title: 'Database schema design'
      }
    },
    {
      id: '4',
      type: 'comment',
      title: 'New Comment',
      message: 'Mike commented on your task "API Documentation"',
      isRead: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      priority: 'low',
      actor: {
        id: 'user3',
        name: 'Mike Developer',
      },
      relatedTask: {
        id: 'task4',
        title: 'API Documentation'
      }
    },
    {
      id: '5',
      type: 'project_update',
      title: 'Project Status Update',
      message: 'Mobile App project has moved to "In Review" phase',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      priority: 'medium',
      relatedProject: {
        id: 'proj2',
        name: 'Mobile App'
      }
    },
    {
      id: '6',
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to the task management system',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      priority: 'low'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssigned: true,
    taskDue: true,
    mentions: true,
    comments: true,
    projectUpdates: false,
    systemUpdates: false
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_assigned': return <User className="h-4 w-4" />;
      case 'task_due': return <Clock className="h-4 w-4" />;
      case 'mention': return <MessageSquare className="h-4 w-4" />;
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      case 'project_update': return <Users className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      case 'reminder': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (_type: Notification['type'], priority: Notification['priority']) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (priority === 'medium') return 'border-l-yellow-500 bg-yellow-50';
    return 'border-l-blue-500 bg-blue-50';
  };

  const getPriorityBadgeColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'unread' && !notification.isRead) ||
                      (selectedTab === 'mentions' && notification.type === 'mention') ||
                      (selectedTab === 'tasks' && ['task_assigned', 'task_due'].includes(notification.type));
    
    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Stay updated with your tasks and project activities
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
          
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
                <DialogDescription>
                  Manage how you receive notifications
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                
                <div className="border-t pt-4">
                  <p className="font-medium mb-3">Notification Types</p>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'taskAssigned', label: 'Task Assignments', desc: 'When you are assigned to tasks' },
                      { key: 'taskDue', label: 'Task Due Dates', desc: 'Reminders for upcoming deadlines' },
                      { key: 'mentions', label: 'Mentions', desc: 'When someone mentions you' },
                      { key: 'comments', label: 'Comments', desc: 'Comments on your tasks' },
                      { key: 'projectUpdates', label: 'Project Updates', desc: 'Project status changes' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'System announcements' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Switch 
                          checked={settings[key as keyof typeof settings] as boolean}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsSettingsOpen(false)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>No notifications found</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => {
                    const actor = notification.actor;
                    const actorName = actor?.name || '';
                    const actorInitials = actorName ? getAvatarFallbackText(actorName) : '';
                    const actorColor = actorName ? getAvatarColor(actorName) : '';
                    
                    return (
                      <Card 
                        key={notification.id} 
                        className={`border-l-4 transition-colors hover:bg-muted/50 ${
                          !notification.isRead ? getNotificationColor(notification.type, notification.priority) : 'border-l-gray-300'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              !notification.isRead ? 'bg-white' : 'bg-muted'
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-medium text-sm ${
                                      !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    <Badge className={`text-xs ${getPriorityBadgeColor(notification.priority)}`}>
                                      {notification.priority}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {notification.message}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    {actor && (
                                      <div className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                          <AvatarImage src={actor.avatar} alt={actorName} />
                                          <AvatarFallback className={`${actorColor} text-[8px]`}>
                                            {actorInitials}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{actorName}</span>
                                      </div>
                                    )}
                                    
                                    <span>{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
                                    
                                    {notification.relatedProject && (
                                      <span className="text-blue-600">
                                        {notification.relatedProject.name}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  {!notification.isRead && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-6 w-6 p-0"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {!notification.isRead && (
                                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                          <Check className="mr-2 h-4 w-4" />
                                          Mark as read
                                        </DropdownMenuItem>
                                      )}
                                      {notification.actionUrl && (
                                        <DropdownMenuItem>
                                          <FileText className="mr-2 h-4 w-4" />
                                          View details
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem 
                                        onClick={() => deleteNotification(notification.id)}
                                        className="text-red-600 focus:text-red-600"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};