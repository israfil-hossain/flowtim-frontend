import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Loader, LogOut, Plus, FileText, MessageSquare, User, Settings, Palette, Users, Calendar, Clock, Target } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LogoutDialog from "./asidebar/logout-dialog";
import { useAuthContext } from "@/context/auth-provider";
import { useUIStore, useTaskStore } from "@/store";
import NotificationDropdown from "./workspace/notifications/notification-dropdown";

const Header = () => {
  const { isLoading, user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { openModal } = useUIStore();
  const { setViewMode } = useTaskStore();

  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/appearance")) return "Appearance";
    if (pathname.includes("/profile")) return "Profile";
    if (pathname.includes("/tasks")) return "Tasks";
    if (pathname.includes("/members")) return "Members";
    return null; // Default label
  };

  const pageHeading = getPageLabel(pathname);
  return (
    <>
      <header className="flex sticky top-0 z-50 bg-white dark:bg-background h-12 shrink-0 items-center border-b">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block text-[15px]">
                {pageHeading ? (
                  <BreadcrumbLink asChild>
                    <Link to={`/workspace/${workspaceId}`}>Dashboard</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="line-clamp-1 ">
                    Dashboard
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {pageHeading && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="text-[15px]">
                    <BreadcrumbPage className="line-clamp-1">
                      {pageHeading}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Right side - Quick Actions, Notifications, Chat, and User Menu */}
        <div className="flex items-center gap-2 px-3">
          {/* Quick Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Quick Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => openModal('createProject')} className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span>New Project</span>
                  <span className="text-xs text-muted-foreground">Start a new project</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openModal('createTask')} className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <div className="flex flex-col">
                  <span>Add Task</span>
                  <span className="text-xs text-muted-foreground">Create a new task</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspaceId}/members`)} className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div className="flex flex-col">
                  <span>Invite Team</span>
                  <span className="text-xs text-muted-foreground">Invite team members</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setViewMode('calendar');
                navigate(`/workspace/${workspaceId}/tasks`);
              }} className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                <div className="flex flex-col">
                  <span>Calendar</span>
                  <span className="text-xs text-muted-foreground">Open calendar view</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspaceId}/time-tracking`)} className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <div className="flex flex-col">
                  <span>Time Track</span>
                  <span className="text-xs text-muted-foreground">Start time tracking</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/workspace/${workspaceId}/reports`)} className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-500" />
                <div className="flex flex-col">
                  <span>Reports</span>
                  <span className="text-xs text-muted-foreground">View reports</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Chat Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            asChild
          >
            <Link to={`/workspace/${workspaceId}/chat`}>
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Quick Chat</span>
            </Link>
          </Button>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* User Menu */}
          {isLoading ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profilePicture || ""} />
                    <AvatarFallback className="text-xs">
                      {user?.name?.split(" ")?.[0]?.charAt(0)}
                      {user?.name?.split(" ")?.[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.name && <p className="font-medium">{user.name}</p>}
                    {user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/workspace/${workspaceId}/profile`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/workspace/${workspaceId}/appearance`} className="flex items-center">
                    <Palette className="mr-2 h-4 w-4" />
                    Appearance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/workspace/${workspaceId}/settings`} className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLogoutOpen(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      
      <LogoutDialog isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
    </>
  );
};

export default Header;
