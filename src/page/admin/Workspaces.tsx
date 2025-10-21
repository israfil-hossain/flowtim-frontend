import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";

const AdminWorkspaces = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Workspace Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all workspaces on the platform
          </p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Create Workspace
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Workspaces</CardTitle>
          <CardDescription>A list of all workspaces on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search workspaces..." className="max-w-sm" />
          </div>
          <p className="text-sm text-muted-foreground">
            Workspace list will be displayed here once the backend API is connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWorkspaces;
