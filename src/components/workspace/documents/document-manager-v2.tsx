import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Share2,
  Eye,
  Move,
  Star,
  StarOff,
  Calendar,
  FolderOpen,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { FolderTree, FolderNode } from "./folder-tree";
import { NotionEditor, DocumentData, BlockType } from "./notion-editor";

interface Document {
  id: string;
  title: string;
  emoji?: string;
  content: string;
  blocks: BlockType[];
  type: 'text' | 'markdown' | 'rich-text' | 'notion';
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  collaborators: {
    id: string;
    name: string;
    avatar?: string;
    permission: 'view' | 'edit' | 'admin';
    isActive?: boolean;
    lastSeen?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  lastSaved: Date;
  version: number;
  isPublic: boolean;
  isFavorite: boolean;
  projectId?: string;
  workspaceId: string;
  folderId?: string | null;
}

export const DocumentManagerV2: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [documentToMove, setDocumentToMove] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "notion" as const,
    category: "",
    folderId: null as string | null,
  });

  // Mock folder data
  const mockFolders: FolderNode[] = [
    {
      id: 'folder1',
      name: 'Project Documentation',
      type: 'folder',
      parentId: null,
      documentCount: 3,
      createdAt: new Date(2024, 0, 5),
      updatedAt: new Date(2024, 0, 15),
      children: [
        {
          id: 'folder1-1',
          name: 'Requirements',
          type: 'folder',
          parentId: 'folder1',
          documentCount: 2,
          createdAt: new Date(2024, 0, 6),
          updatedAt: new Date(2024, 0, 12),
          children: [],
        },
        {
          id: 'folder1-2',
          name: 'Design',
          type: 'folder',
          parentId: 'folder1',
          documentCount: 1,
          createdAt: new Date(2024, 0, 7),
          updatedAt: new Date(2024, 0, 14),
          children: [],
        },
      ],
    },
    {
      id: 'folder2',
      name: 'Meeting Notes',
      type: 'folder',
      parentId: null,
      documentCount: 5,
      createdAt: new Date(2024, 0, 8),
      updatedAt: new Date(2024, 0, 16),
      children: [],
    },
    {
      id: 'folder3',
      name: 'Templates',
      type: 'folder',
      parentId: null,
      documentCount: 2,
      createdAt: new Date(2024, 0, 9),
      updatedAt: new Date(2024, 0, 13),
      children: [],
    },
  ];

  // Mock documents data
  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Product Requirements Document',
      emoji: '📋',
      content: 'Comprehensive product requirements...',
      blocks: [
        {
          id: 'block-1',
          type: 'heading1',
          content: 'Product Requirements Document',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-2',
          type: 'paragraph',
          content: 'This document outlines the requirements for our new product feature...',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-3',
          type: 'heading2',
          content: 'User Stories',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-4',
          type: 'bulleted-list',
          content: 'As a user, I want to be able to create documents\nAs a user, I want to organize documents in folders\nAs a user, I want to collaborate with team members',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      type: 'notion',
      category: 'Requirements',
      tags: ['product', 'requirements', 'planning'],
      author: {
        id: '1',
        name: 'John Doe',
        avatar: undefined
      },
      collaborators: [
        { id: '2', name: 'Jane Smith', permission: 'edit', isActive: true },
        { id: '3', name: 'Bob Johnson', permission: 'view', isActive: false, lastSeen: new Date(Date.now() - 1000 * 60 * 30) }
      ],
      createdAt: new Date(2024, 0, 10),
      updatedAt: new Date(2024, 0, 15),
      lastSaved: new Date(),
      version: 3,
      isPublic: false,
      isFavorite: true,
      workspaceId: 'workspace1',
      folderId: 'folder1-1'
    },
    {
      id: '2',
      title: 'API Documentation',
      emoji: '🔌',
      content: 'REST API endpoints and usage examples...',
      blocks: [
        {
          id: 'block-5',
          type: 'heading1',
          content: 'API Documentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-6',
          type: 'paragraph',
          content: 'This document contains all the API endpoints and their usage examples.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-7',
          type: 'code',
          content: 'GET /api/documents\nPOST /api/documents\nPUT /api/documents/:id\nDELETE /api/documents/:id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      type: 'notion',
      category: 'Documentation',
      tags: ['api', 'documentation', 'backend'],
      author: {
        id: '2',
        name: 'Jane Smith',
        avatar: undefined
      },
      collaborators: [
        { id: '1', name: 'John Doe', permission: 'admin', isActive: false },
        { id: '4', name: 'Alice Wilson', permission: 'edit', isActive: true }
      ],
      createdAt: new Date(2024, 0, 12),
      updatedAt: new Date(2024, 0, 14),
      lastSaved: new Date(Date.now() - 1000 * 60 * 15),
      version: 2,
      isPublic: true,
      isFavorite: false,
      workspaceId: 'workspace1',
      folderId: null
    },
    {
      id: '3',
      title: 'Sprint Planning Notes',
      emoji: '🏃',
      content: 'Sprint planning meeting notes and action items...',
      blocks: [
        {
          id: 'block-8',
          type: 'heading1',
          content: 'Sprint Planning - Week 12',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-9',
          type: 'paragraph',
          content: 'Meeting date: March 15, 2024\nAttendees: John, Jane, Bob, Alice',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-10',
          type: 'heading2',
          content: 'Action Items',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'block-11',
          type: 'numbered-list',
          content: 'Complete user authentication module\nImplement file upload feature\nWrite unit tests for API endpoints\nUpdate documentation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      type: 'notion',
      category: 'Meeting Notes',
      tags: ['meeting', 'sprint', 'planning'],
      author: {
        id: '3',
        name: 'Bob Johnson',
        avatar: undefined
      },
      collaborators: [],
      createdAt: new Date(2024, 0, 8),
      updatedAt: new Date(2024, 0, 8),
      lastSaved: new Date(Date.now() - 1000 * 60 * 60),
      version: 1,
      isPublic: false,
      isFavorite: false,
      workspaceId: 'workspace1',
      folderId: 'folder2'
    }
  ];

  const categories = ['all', 'Requirements', 'Documentation', 'Meeting Notes', 'Design', 'Templates'];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesFolder = selectedFolderId === null || doc.folderId === selectedFolderId;
    return matchesSearch && matchesCategory && matchesFolder;
  });

  const handleCreateDocument = () => {
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: newDocument.title,
      emoji: '📄',
      content: '',
      blocks: [
        {
          id: 'block-initial',
          type: 'paragraph',
          content: 'Start typing here...',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      type: newDocument.type,
      category: newDocument.category,
      tags: [],
      author: { id: '1', name: 'Current User' },
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSaved: new Date(),
      version: 1,
      isPublic: false,
      isFavorite: false,
      workspaceId: 'workspace1',
      folderId: newDocument.folderId,
    };
    
    // TODO: API call to create document
    console.log('Creating document:', newDoc);
    setSelectedDocument(newDoc);
    setIsCreateDialogOpen(false);
    setNewDocument({
      title: "",
      type: "notion",
      category: "",
      folderId: null,
    });
  };

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDocumentSave = (document: DocumentData) => {
    // TODO: API call to save document
    console.log('Saving document:', document);
  };

  const handleDocumentUpdate = (updates: Partial<DocumentData>) => {
    if (selectedDocument) {
      setSelectedDocument({
        ...selectedDocument,
        ...updates
      } as Document);
      // TODO: Debounced API call to update document
      console.log('Document updated:', updates);
    }
  };

  const handleMoveDocument = (documentId: string, targetFolderId: string | null) => {
    // TODO: API call to move document
    console.log('Moving document:', documentId, 'to folder:', targetFolderId);
    setIsMoveDialogOpen(false);
    setDocumentToMove(null);
  };

  const handleFolderCreate = (name: string, parentId: string | null) => {
    // TODO: API call to create folder
    console.log('Creating folder:', name, 'in parent:', parentId);
  };

  const handleFolderRename = (folderId: string, newName: string) => {
    // TODO: API call to rename folder
    console.log('Renaming folder:', folderId, 'to:', newName);
  };

  const handleFolderDelete = (folderId: string) => {
    // TODO: API call to delete folder
    console.log('Deleting folder:', folderId);
  };

  const handleToggleFavorite = (documentId: string) => {
    // TODO: API call to toggle favorite
    console.log('Toggling favorite for document:', documentId);
  };

  const getAllFolders = (folders: FolderNode[]): FolderNode[] => {
    let result: FolderNode[] = [];
    folders.forEach(folder => {
      result.push(folder);
      if (folder.children.length > 0) {
        result = result.concat(getAllFolders(folder.children));
      }
    });
    return result;
  };

  const currentFolderName = selectedFolderId 
    ? getAllFolders(mockFolders).find(f => f.id === selectedFolderId)?.name 
    : 'All Documents';

  // If a document is selected, show full-page view
  if (selectedDocument) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-gray-50/30">
        <NotionEditor
          document={{
            ...selectedDocument,
            collaborators: selectedDocument.collaborators.map(c => ({
              ...c,
              isActive: c.isActive || false,
              lastSeen: c.lastSeen || new Date(),
            }))
          } as DocumentData}
          onDocumentSave={handleDocumentSave}
          onDocumentUpdate={handleDocumentUpdate}
          onBackToList={() => setSelectedDocument(null)}
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50/30">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full flex flex-col bg-white border-r border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                <Button 
                  size="sm" 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="h-7 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Folder Tree */}
            <div className="flex-1 overflow-y-auto p-3">
              <FolderTree
                folders={mockFolders}
                selectedFolderId={selectedFolderId}
                onFolderSelect={setSelectedFolderId}
                onFolderCreate={handleFolderCreate}
                onFolderRename={handleFolderRename}
                onFolderDelete={handleFolderDelete}
                onDocumentMove={handleMoveDocument}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-gray-200 hover:bg-gray-300" />

        {/* Document List */}
        <ResizablePanel defaultSize={75} minSize={65}>
          <div className="h-full flex flex-col bg-white">
            {/* List Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">{currentFolderName}</h3>
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    {filteredDocuments.length}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[130px] h-8 text-sm border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" className="h-8 border-gray-200">
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredDocuments.map((document) => {
                const author = document.author;
                const authorName = author.name;
                const authorInitials = getAvatarFallbackText(authorName);
                const authorColor = getAvatarColor(authorName);

                return (
                  <div 
                    key={document.id} 
                    className="group cursor-pointer hover:bg-gray-50 transition-all rounded-lg p-3 border border-transparent hover:border-gray-200"
                    onClick={() => handleDocumentSelect(document)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-lg mt-0.5">{document.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 truncate">{document.title}</h4>
                            <div className="flex items-center gap-1">
                              <div className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                                v{document.version}
                              </div>
                              {document.isPublic && (
                                <div className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                                  Public
                                </div>
                              )}
                              {document.isFavorite && (
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {document.blocks.find(b => b.type === 'paragraph')?.content || document.content.substring(0, 100)}...
                          </p>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {document.category}
                            </div>
                            {document.tags.slice(0, 2).map(tag => (
                              <div key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                                {tag}
                              </div>
                            ))}
                            {document.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{document.tags.length - 2}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={author.avatar} alt={authorName} />
                                <AvatarFallback className={`${authorColor} text-[10px]`}>
                                  {authorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">{authorName}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {format(document.updatedAt, 'MMM d')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDocumentSelect(document)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentSelect(document)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              setDocumentToMove(document.id);
                              setIsMoveDialogOpen(true);
                            }}
                          >
                            <Move className="mr-2 h-4 w-4" />
                            Move
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFavorite(document.id)}>
                            {document.isFavorite ? (
                              <StarOff className="mr-2 h-4 w-4" />
                            ) : (
                              <Star className="mr-2 h-4 w-4" />
                            )}
                            {document.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-900">No documents found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Create your first document to get started'
                    }
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Document
                  </Button>
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Create Document Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
            <DialogDescription>
              Create a new document in your workspace
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Document title..."
                value={newDocument.title}
                onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={newDocument.category} 
                  onValueChange={(value) => setNewDocument(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Folder</label>
                <Select 
                  value={newDocument.folderId || "none"} 
                  onValueChange={(value) => setNewDocument(prev => ({ ...prev, folderId: value === "none" ? null : value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No folder</SelectItem>
                    {getAllFolders(mockFolders).map(folder => (
                      <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDocument} disabled={!newDocument.title}>
              Create Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Document Dialog */}
      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Document</DialogTitle>
            <DialogDescription>
              Choose a folder to move this document to
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleMoveDocument(documentToMove!, null)}
            >
              <FileText className="mr-2 h-4 w-4" />
              No folder (Root)
            </Button>
            
            {getAllFolders(mockFolders).map(folder => (
              <Button
                key={folder.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoveDocument(documentToMove!, folder.id)}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                {folder.name}
              </Button>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMoveDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};