import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";

const Asidebar = () => {

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="!py-0 dark:bg-background">
          <div className="flex h-[50px] items-center justify-start w-full px-1">
            {open ? (
              <Link
                to={`/workspace/${workspaceId}`}
                className="flex items-center justify-start w-full"
              >
                <img
                  src="/images/long-logo.png"
                  alt="Flowtim Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
            ) : (
              <Logo url={`/workspace/${workspaceId}`} />
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className=" !mt-0 dark:bg-background">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent>
              <WorkspaceSwitcher />
              <Separator />
              <NavMain />
              <Separator />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
