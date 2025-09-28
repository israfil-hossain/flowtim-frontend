"use client";

import { useState } from "react";
import {
  LucideIcon,
  Settings,
  Users,
  CheckCircle,
  LayoutDashboard,
  Clock,
  FileBarChart,
  FileText,
  FolderOpen,
  MessageSquare,
  Bell,
  BarChart3,
  ChevronRight,
  User,
  Palette,
  Briefcase,
  Tag,
  LayoutTemplate,
  CheckSquare,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";

type ItemType = {
  title: string;
  url?: string;
  icon: LucideIcon;
  subItems?: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

type MenuItemProps = {
  item: ItemType;
  pathname: string;
  isCollapsed: boolean;
};

const MenuItem = ({ item, pathname, isCollapsed }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActive =
    item.url === pathname ||
    (hasSubItems && item.subItems?.some((sub) => sub.url === pathname));

  if (!hasSubItems) {
    const content = (
      <SidebarMenuButton
        isActive={item.url === pathname}
        asChild
        className={`bg-white hover:bg-slate-100 hover:text-slate-900 active:bg-primary justify-start ${item.url === pathname ? 'data-[active=true]:bg-primary/20 data-[active=true]:border-l-4 data-[active=true]:border-primary data-[active=true]:text-primary-foreground' : ''}`}
      >
        <Link
          to={item.url || "#"}
          className="!text-[15px] justify-start data-[collapsed=true]:justify-center"
        >
          <item.icon className={isCollapsed ? "h-5 w-5" : ""} />
          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  }

  // Handle menu items with submenus
  if (isCollapsed) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <SidebarMenuButton
                  isActive={isActive}
                  className={`bg-white hover:bg-slate-100 hover:text-slate-900 active:bg-primary !text-[15px] justify-center ${isActive ? 'data-[active=true]:bg-primary/20 data-[active=true]:text-primary-foreground' : ''}`}
                >
                  <item.icon className="h-5 w-5" />
                </SidebarMenuButton>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent
          side="right"
          sideOffset={10}
          className="w-56 p-0"
          align="start"
        >
          <div className="px-3 py-2 font-medium text-sm border-b border-border bg-gray-50">
            {item.title}
          </div>
          <div className="py-1">
            {item.subItems &&
              item.subItems.map((subItem) => (
                <Link
                  key={subItem.title}
                  to={subItem.url}
                  className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-100 hover:text-slate-900 active:bg-primary transition-colors ${
                    subItem.url === pathname ? "bg-primary/20 border-l-4 border-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <subItem.icon className="h-4 w-4 text-primary" />
                  {subItem.title}
                </Link>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Expanded sidebar with collapsible submenus
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          isActive={isActive}
          className={`bg-white hover:bg-primary/80 hover:text-white active:bg-primary !text-[15px] justify-start group-data-[state=open]/collapsible:bg-primary/90 group-data-[state=open]/collapsible:text-white ${isActive ? 'data-[active=true]:bg-primary/90 data-[active=true]:border-l-4 data-[active=true]:border-primary data-[active=true]:text-white' : ''}`}
        >
          <item.icon />
          <span>{item.title}</span>
          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.subItems &&
            item.subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={subItem.url === pathname}
                  className="hover:bg-slate-100 hover:text-slate-900 active:bg-primary justify-start"
                >
                  <Link to={subItem.url} className="flex items-center gap-2">
                    <subItem.icon className="h-4 w-4 text-primary" />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};

export function NavMain() {
  const { hasPermission } = useAuthContext();
  const { open: sidebarOpen } = useSidebar();

  const canManageSettings = hasPermission(
    Permissions.MANAGE_WORKSPACE_SETTINGS
  );

  const workspaceId = useWorkspaceId();
  const location = useLocation();
  const pathname = location.pathname;

  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: `/workspace/${workspaceId}/tasks`,
      icon: CheckCircle,
    },
    {
      title: "Documents",
      url: `/workspace/${workspaceId}/documents`,
      icon: FileText,
    },
    {
      title: "Files",
      url: `/workspace/${workspaceId}/files`,
      icon: FolderOpen,
    },
    {
      title: "Chat",
      url: `/workspace/${workspaceId}/chat`,
      icon: MessageSquare,
    },
    {
      title: "Time Tracking",
      url: `/workspace/${workspaceId}/time-tracking`,
      icon: Clock,
    },
    {
      title: "Reports",
      url: `/workspace/${workspaceId}/reports`,
      icon: FileBarChart,
    },
    {
      title: "Analytics",
      url: `/workspace/${workspaceId}/analytics`,
      icon: BarChart3,
    },

    ...(canManageSettings
      ? [
          {
            title: "Settings",
            icon: Settings,
            subItems: [
              {
                title: "Profile",
                url: `/workspace/${workspaceId}/profile`,
                icon: User,
              },
              {
                title: "Appearance",
                url: `/workspace/${workspaceId}/appearance`,
                icon: Palette,
              },
              {
                title: "Notifications",
                url: `/workspace/${workspaceId}/notifications`,
                icon: Bell,
              },
              {
                title: "Job Title",
                url: `/workspace/${workspaceId}/settings/job-title`,
                icon: Briefcase,
              },
              {
                title: "Labels",
                url: `/workspace/${workspaceId}/settings/labels`,
                icon: Tag,
              },

              {
                title: "Team Members",
                url: `/workspace/${workspaceId}/members`,
                icon: Users,
              },

              {
                title: "Project Templates",
                url: `/workspace/${workspaceId}/settings/project-templates`,
                icon: LayoutTemplate,
              },
              {
                title: "Task Templates",
                url: `/workspace/${workspaceId}/settings/task-templates`,
                icon: CheckSquare,
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <SidebarGroup>
      <SidebarMenu className={!sidebarOpen ? "items-center" : ""}>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <MenuItem
              item={item}
              pathname={pathname}
              isCollapsed={!sidebarOpen}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
