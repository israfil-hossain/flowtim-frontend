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
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { EllipsisIcon, Loader, LogOut, Plus, FileText, FolderPlus, Bell, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LogoutDialog from "./asidebar/logout-dialog";
import { useAuthContext } from "@/context/auth-provider";

const Header = () => {
  const { isLoading, user } = useAuthContext();
  const location = useLocation();
  const workspaceId = useWorkspaceId();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
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
          {/* Quick Action Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Quick Action</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to={`/workspace/${workspaceId}/documents/new`} className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  New Document
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/workspace/${workspaceId}/projects/new`} className="flex items-center gap-2">
                  <FolderPlus className="h-4 w-4" />
                  New Project
                </Link>
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

          {/* Notifications Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 relative"
            asChild
          >
            <Link to={`/workspace/${workspaceId}/notifications`}>
              <Bell className="h-4 w-4" />
              {/* Optional notification badge - can be added later */}
              {/* <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span> */}
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

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
