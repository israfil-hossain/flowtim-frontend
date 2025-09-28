/**
 * Notification Dropdown Component
 * Compact notification dropdown for header with infinite scrolling
 */

import { FC, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Check,
  CheckCheck,
  Trash2,
  Settings,
  User,
  MessageSquare,
  Clock,
  Users,
  AlertTriangle,
  Loader2,
  ExternalLink
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useGetNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/api/use-notifications";
import { useAuthContext } from "@/context/auth-provider";
import { Link } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";

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

export const NotificationDropdown: FC = () => {
  const { user } = useAuthContext();
  const workspaceId = useWorkspaceId();
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Fallback data for development
  const fallbackNotifications: Notification[] = [
    {
      id: '1',
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Implement user authentication"',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high',
      actor: {
        id: 'user1',
        name: 'John Manager',
      },
      relatedTask: {
        id: 'task1',
        title: 'Implement user authentication'
      }
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: '@you Please review the latest design updates',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium',
      actor: {
        id: 'user2',
        name: 'Sarah Designer',
      },
    },
    {
      id: '3',
      type: 'task_due',
      title: 'Task Due Soon',
      message: '"Database schema design" is due tomorrow',
      isRead: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'high',
    },
    {
      id: '4',
      type: 'comment',
      title: 'New Comment',
      message: 'Mike commented on your task',
      isRead: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'low',
      actor: {
        id: 'user3',
        name: 'Mike Developer',
      },
    }
  ];

  // Use API hook (with fallback for development)
  const { data: notificationData, isLoading, error } = useGetNotifications({
    userId: user?.id || '',
    page,
    limit: 10,
  });

  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  // Use fallback data if API is not available
  const notifications = notificationData?.notifications || fallbackNotifications;
  const totalNotifications = notificationData?.total || fallbackNotifications.length;

  useEffect(() => {
    if (notifications && page === 1) {
      setAllNotifications(notifications);
    } else if (notifications && page > 1) {
      setAllNotifications(prev => [...prev, ...notifications]);
    }
    
    setHasMore((page * 10) < totalNotifications);
    setIsLoadingMore(false);
  }, [notifications, page, totalNotifications]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  }, [isLoadingMore, hasMore]);

  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_assigned': return <User className="h-3 w-3" />;
      case 'task_due': return <Clock className="h-3 w-3" />;
      case 'mention': return <MessageSquare className="h-3 w-3" />;
      case 'comment': return <MessageSquare className="h-3 w-3" />;
      case 'project_update': return <Users className="h-3 w-3" />;
      case 'system': return <Settings className="h-3 w-3" />;
      case 'reminder': return <AlertTriangle className="h-3 w-3" />;
      default: return <Bell className="h-3 w-3" />;
    }
  };

  const getNotificationIconColor = (type: Notification['type'], priority: Notification['priority']) => {
    if (priority === 'high') return 'text-red-500';
    if (priority === 'medium') return 'text-yellow-500';
    
    switch (type) {
      case 'task_assigned': return 'text-blue-500';
      case 'task_due': return 'text-orange-500';
      case 'mention': return 'text-purple-500';
      case 'comment': return 'text-green-500';
      case 'project_update': return 'text-indigo-500';
      case 'system': return 'text-gray-500';
      default: return 'text-blue-500';
    }
  };

  const unreadCount = allNotifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    if (user?.id) {
      markAsReadMutation.mutate({
        notificationId,
        userId: user.id
      });
      
      // Optimistic update
      setAllNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
    }
  };

  const markAllAsRead = () => {
    if (user?.id) {
      markAllAsReadMutation.mutate(user.id);
      
      // Optimistic update
      setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 relative"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center min-w-4"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <DropdownMenuLabel className="p-0 font-medium">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </DropdownMenuLabel>
          
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={markAllAsRead}
                disabled={markAllAsReadMutation.isPending}
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                All read
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
              <Link to={`/workspace/${workspaceId}/notifications`}>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
        
        <ScrollArea ref={scrollAreaRef} className="h-96">
          <div className="p-2">
            {isLoading && page === 1 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : allNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">No notifications</p>
                <p className="text-xs">You're all caught up!</p>
              </div>
            ) : (
              <>
                {allNotifications.map((notification, index) => {
                  const actor = notification.actor;
                  const actorName = actor?.name || '';
                  const actorInitials = actorName ? getAvatarFallbackText(actorName) : '';
                  const actorColor = actorName ? getAvatarColor(actorName) : '';
                  
                  return (
                    <div key={notification.id}>
                      <div className={`flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50/50' : ''
                      }`}>
                        <div className={`p-1.5 rounded-md bg-muted ${
                          getNotificationIconColor(notification.type, notification.priority)
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-0.5">
                                <p className={`text-xs font-medium truncate ${
                                  !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {actor && (
                                  <div className="flex items-center gap-1">
                                    <Avatar className="h-3 w-3">
                                      <AvatarImage src={actor.avatar} alt={actorName} />
                                      <AvatarFallback className={`${actorColor} text-[8px]`}>
                                        {actorInitials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="truncate max-w-16">{actorName}</span>
                                  </div>
                                )}
                                
                                <span className="flex-shrink-0">
                                  {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                                </span>
                              </div>
                            </div>
                            
                            {!notification.isRead && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-5 w-5 p-0 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                disabled={markAsReadMutation.isPending}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < allNotifications.length - 1 && (
                        <div className="h-px bg-border mx-2" />
                      )}
                    </div>
                  );
                })}
                
                {isLoadingMore && (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="ml-2 text-xs text-muted-foreground">Loading more...</span>
                  </div>
                )}
                
                {!hasMore && allNotifications.length > 0 && (
                  <div className="text-center py-2">
                    <p className="text-xs text-muted-foreground">No more notifications</p>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
        
        {allNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs" asChild>
                <Link to={`/workspace/${workspaceId}/notifications`}>
                  View all notifications
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;