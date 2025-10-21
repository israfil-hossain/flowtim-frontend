"use client";

import { useState } from "react";
import {
  LucideIcon,
  Shield,
  Users,
  Building2,
  BarChart3,
  Settings,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
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
import { ADMIN_ROUTES } from "@/routes/common/routePaths";

type AdminSubItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const adminSubItems: AdminSubItem[] = [
  {
    title: "Users",
    url: ADMIN_ROUTES.USERS,
    icon: Users,
  },
  {
    title: "Workspaces",
    url: ADMIN_ROUTES.WORKSPACES,
    icon: Building2,
  },
  {
    title: "Analytics",
    url: ADMIN_ROUTES.ANALYTICS,
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: ADMIN_ROUTES.SETTINGS,
    icon: Settings,
  },
  {
    title: "Billing",
    url: ADMIN_ROUTES.BILLING,
    icon: CreditCard,
  },
];

export function NavAdmin() {
  const { open: sidebarOpen } = useSidebar();
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const isActive = adminSubItems.some((item) => item.url === pathname);

  // Collapsed sidebar - show popover
  if (!sidebarOpen) {
    return (
      <SidebarGroup className="mt-auto border-t pt-2">
        <SidebarMenu className="items-center">
          <SidebarMenuItem>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`bg-white hover:bg-red-50 hover:text-red-700 !text-[15px] justify-center ${
                          isActive
                            ? "data-[active=true]:bg-red-100 data-[active=true]:text-red-700"
                            : ""
                        }`}
                      >
                        <Shield className="h-5 w-5 text-red-600" />
                      </SidebarMenuButton>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <p>Admin Panel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <PopoverContent
                side="right"
                sideOffset={10}
                className="w-56 p-0"
                align="start"
              >
                <div className="px-3 py-2 font-medium text-sm border-b border-border bg-red-50 text-red-700">
                  <Shield className="inline-block h-4 w-4 mr-2" />
                  Admin Panel
                </div>
                <div className="py-1">
                  {adminSubItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-red-50 hover:text-red-700 transition-colors ${
                        item.url === pathname
                          ? "bg-red-100 border-l-4 border-red-600 text-red-700"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4 text-red-600" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // Expanded sidebar - show collapsible
  return (
    <SidebarGroup className="mt-auto border-t pt-2">
      <SidebarGroupLabel className="text-red-600 font-semibold">
        <Shield className="inline-block h-4 w-4 mr-2" />
        Admin Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                isActive={isActive}
                className={`bg-white hover:bg-red-50 hover:text-red-700 !text-[15px] justify-start group-data-[state=open]/collapsible:bg-red-100 group-data-[state=open]/collapsible:text-red-700 ${
                  isActive
                    ? "data-[active=true]:bg-red-100 data-[active=true]:border-l-4 data-[active=true]:border-red-600 data-[active=true]:text-red-700"
                    : ""
                }`}
              >
                <Shield className="text-red-600" />
                <span>Admin</span>
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {adminSubItems.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={item.url === pathname}
                      className="hover:bg-red-50 hover:text-red-700 justify-start"
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-red-600" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
