import { useMemo } from "react";
import { PermissionType } from "@/constant";
import { UserType, WorkspaceWithMembersType } from "@/types/api.type";

const usePermissions = (
  user?: UserType,
  workspace?: WorkspaceWithMembersType
): PermissionType[] => {
  return useMemo(() => {
    // Return empty array if user or workspace is not loaded yet
    if (!user || !workspace) {
      return [];
    }

    // Find user's role in the workspace
    const userMember = workspace.members?.find(
      (member) => member.userId === user._id
    );

    // Return empty array if user is not a member or role is not found
    if (!userMember || !userMember.role) {
      return [];
    }

    // Return permissions from the role, or empty array if permissions is null/undefined
    return userMember.role.permissions || [];
  }, [user, workspace]);
};

export default usePermissions;
