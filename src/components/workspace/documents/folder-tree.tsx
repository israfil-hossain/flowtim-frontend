import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderPlus,
  FileText,
} from "lucide-react";

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder' | 'document';
  parentId: string | null;
  children: FolderNode[];
  documentCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FolderTreeProps {
  folders: FolderNode[];
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onFolderCreate: (name: string, parentId: string | null) => void;
  onFolderRename: (folderId: string, newName: string) => void;
  onFolderDelete: (folderId: string) => void;
  onDocumentMove: (documentId: string, targetFolderId: string | null) => void;
  className?: string;
}

interface FolderItemProps {
  folder: FolderNode;
  level: number;
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onFolderCreate: (name: string, parentId: string | null) => void;
  onFolderRename: (folderId: string, newName: string) => void;
  onFolderDelete: (folderId: string) => void;
}

const FolderItem: FC<FolderItemProps> = ({
  folder,
  level,
  selectedFolderId,
  onFolderSelect,
  onFolderCreate,
  onFolderRename,
  onFolderDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(folder.name);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const hasChildren = folder.children && folder.children.length > 0;
  const isSelected = selectedFolderId === folder.id;

  const handleRename = () => {
    if (editName.trim() && editName !== folder.name) {
      onFolderRename(folder.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCreateSubfolder = () => {
    if (newFolderName.trim()) {
      onFolderCreate(newFolderName.trim(), folder.id);
      setNewFolderName("");
      setShowCreateDialog(false);
      setIsExpanded(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isEditing) {
        handleRename();
      } else if (showCreateDialog) {
        handleCreateSubfolder();
      }
    } else if (e.key === 'Escape') {
      if (isEditing) {
        setEditName(folder.name);
        setIsEditing(false);
      } else if (showCreateDialog) {
        setNewFolderName("");
        setShowCreateDialog(false);
      }
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer group ${
          isSelected ? 'bg-primary/10 text-primary' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )
          ) : null}
        </Button>

        {/* Folder Icon */}
        <div className="flex items-center gap-2 flex-1" onClick={() => onFolderSelect(folder.id)}>
          {isExpanded && hasChildren ? (
            <FolderOpen className="h-4 w-4 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 text-blue-500" />
          )}

          {/* Folder Name */}
          {isEditing ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyPress}
              className="h-6 px-1 text-sm"
              autoFocus
            />
          ) : (
            <span className="flex-1 text-sm font-medium truncate">{folder.name}</span>
          )}

          {/* Document Count Badge */}
          {folder.documentCount && folder.documentCount > 0 && (
            <Badge variant="secondary" className="text-xs h-5">
              {folder.documentCount}
            </Badge>
          )}
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
              <FolderPlus className="mr-2 h-4 w-4" />
              New Subfolder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onFolderDelete(folder.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Subfolders */}
      {isExpanded && hasChildren && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              level={level + 1}
              selectedFolderId={selectedFolderId}
              onFolderSelect={onFolderSelect}
              onFolderCreate={onFolderCreate}
              onFolderRename={onFolderRename}
              onFolderDelete={onFolderDelete}
            />
          ))}
        </div>
      )}

      {/* Create Subfolder Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Subfolder</DialogTitle>
            <DialogDescription>
              Create a new subfolder in "{folder.name}"
            </DialogDescription>
          </DialogHeader>
          
          <div>
            <Input
              placeholder="Folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSubfolder} disabled={!newFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const FolderTree: FC<FolderTreeProps> = ({
  folders,
  selectedFolderId,
  onFolderSelect,
  onFolderCreate,
  onFolderRename,
  onFolderDelete,
  className = "",
}) => {
  const [showCreateRootDialog, setShowCreateRootDialog] = useState(false);
  const [newRootFolderName, setNewRootFolderName] = useState("");

  const handleCreateRootFolder = () => {
    if (newRootFolderName.trim()) {
      onFolderCreate(newRootFolderName.trim(), null);
      setNewRootFolderName("");
      setShowCreateRootDialog(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateRootFolder();
    } else if (e.key === 'Escape') {
      setNewRootFolderName("");
      setShowCreateRootDialog(false);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {/* All Documents (Root) */}
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer ${
          selectedFolderId === null ? 'bg-primary/10 text-primary' : ''
        }`}
        onClick={() => onFolderSelect(null)}
      >
        <FileText className="h-4 w-4" />
        <span className="text-sm font-medium">All Documents</span>
      </div>

      {/* Folder Tree */}
      <div className="space-y-1">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            level={0}
            selectedFolderId={selectedFolderId}
            onFolderSelect={onFolderSelect}
            onFolderCreate={onFolderCreate}
            onFolderRename={onFolderRename}
            onFolderDelete={onFolderDelete}
          />
        ))}
      </div>

      {/* Create Root Folder Button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground"
        onClick={() => setShowCreateRootDialog(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Folder
      </Button>

      {/* Create Root Folder Dialog */}
      <Dialog open={showCreateRootDialog} onOpenChange={setShowCreateRootDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your documents
            </DialogDescription>
          </DialogHeader>
          
          <div>
            <Input
              placeholder="Folder name..."
              value={newRootFolderName}
              onChange={(e) => setNewRootFolderName(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateRootDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRootFolder} disabled={!newRootFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};