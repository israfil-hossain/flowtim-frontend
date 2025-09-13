/**
 * Document Management System
 * Create, share, and manage documents with version control
 */

import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Share2, 
  Edit, 
  Trash2, 
  Eye, 
  History,
  Users,
  Calendar,
  Filter,
  MoreHorizontal,
  FileImage,
  FileText as FilePdf,
  FileSpreadsheet
} from "lucide-react";
import { format } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'markdown' | 'rich-text';
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
  }[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
  isPublic: boolean;
  projectId?: string;
  workspaceId: string;
}

interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  changeLog: string;
}

export const DocumentManager: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: "",
    content: "",
    type: "text" as const,
    category: "",
    tags: [] as string[],
    isPublic: false,
  });

  // Mock data - replace with actual API calls
  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Project Requirements Document',
      content: '# Project Requirements\n\nThis document outlines the core requirements for the Flowtim project...',
      type: 'markdown',
      category: 'Requirements',
      tags: ['project', 'requirements', 'specifications'],
      author: {
        id: '1',
        name: 'John Doe',
        avatar: undefined
      },
      collaborators: [
        { id: '2', name: 'Jane Smith', permission: 'edit' },
        { id: '3', name: 'Bob Johnson', permission: 'view' }
      ],
      createdAt: new Date(2024, 0, 10),
      updatedAt: new Date(2024, 0, 15),
      version: 3,
      isPublic: false,
      workspaceId: 'workspace1'
    },
    {
      id: '2',
      title: 'API Documentation',
      content: 'REST API endpoints and usage examples...',
      type: 'text',
      category: 'Documentation',
      tags: ['api', 'documentation', 'backend'],
      author: {
        id: '2',
        name: 'Jane Smith',
        avatar: undefined
      },
      collaborators: [
        { id: '1', name: 'John Doe', permission: 'admin' },
        { id: '4', name: 'Alice Wilson', permission: 'edit' }
      ],
      createdAt: new Date(2024, 0, 12),
      updatedAt: new Date(2024, 0, 14),
      version: 2,
      isPublic: true,
      workspaceId: 'workspace1'
    },
    {
      id: '3',
      title: 'Meeting Notes - Sprint Planning',
      content: 'Sprint planning meeting notes and action items...',
      type: 'rich-text',
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
      version: 1,
      isPublic: false,
      workspaceId: 'workspace1'
    }
  ];

  const categories = ['all', 'Requirements', 'Documentation', 'Meeting Notes', 'Design', 'Testing'];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateDocument = () => {
    // TODO: Implement actual document creation
    console.log('Creating document:', newDocument);
    setIsCreateDialogOpen(false);
    setNewDocument({
      title: "",
      content: "",
      type: "text",
      category: "",
      tags: [],
      isPublic: false,
    });
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  const handleEditDocument = (documentId: string) => {
    // TODO: Open document editor
    console.log('Editing document:', documentId);
  };

  const handleDeleteDocument = (documentId: string) => {
    // TODO: Implement document deletion
    console.log('Deleting document:', documentId);
  };

  const handleShareDocument = (documentId: string) => {
    // TODO: Open sharing dialog
    console.log('Sharing document:', documentId);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'markdown':
      case 'rich-text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <FileImage className="h-4 w-4" />;
      case 'pdf':
        return <FilePdf className="h-4 w-4" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">
            Create, share, and manage team documents
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Create a new document for your team
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
                  <label className="text-sm font-medium">Type</label>
                  <Select value={newDocument.type} onValueChange={(value: any) => setNewDocument(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="rich-text">Rich Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newDocument.category} onValueChange={(value) => setNewDocument(prev => ({ ...prev, category: value }))}>
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
              </div>
              
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Start typing your document content..."
                  value={newDocument.content}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDocument} disabled={!newDocument.title || !newDocument.content}>
                Create Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[150px]">
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
        
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => {
          const author = document.author;
          const authorName = author.name;
          const authorInitials = getAvatarFallbackText(authorName);
          const authorColor = getAvatarColor(authorName);

          return (
            <Card key={document.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getDocumentIcon(document.type)}
                    <Badge variant="outline" className="text-xs">
                      v{document.version}
                    </Badge>
                    {document.isPublic && (
                      <Badge variant="secondary" className="text-xs">
                        Public
                      </Badge>
                    )}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDocument(document)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditDocument(document.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareDocument(document.id)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <History className="mr-2 h-4 w-4" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="text-base line-clamp-2">
                  {document.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {document.content.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {document.category}
                  </Badge>
                  {document.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {document.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{document.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={author.avatar} alt={authorName} />
                      <AvatarFallback className={`${authorColor} text-xs`}>
                        {authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{authorName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(document.updatedAt, 'MMM d')}
                  </div>
                </div>
                
                {document.collaborators.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <div className="flex -space-x-1">
                      {document.collaborators.slice(0, 3).map((collaborator) => {
                        const collabName = collaborator.name;
                        const collabInitials = getAvatarFallbackText(collabName);
                        const collabColor = getAvatarColor(collabName);
                        
                        return (
                          <Avatar key={collaborator.id} className="h-5 w-5 border-2 border-background">
                            <AvatarImage src={collaborator.avatar} alt={collabName} />
                            <AvatarFallback className={`${collabColor} text-[8px]`}>
                              {collabInitials}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                    {document.collaborators.length > 3 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{document.collaborators.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first document to get started'
              }
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Document Viewer Dialog */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          {selectedDocument && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedDocument.title}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">v{selectedDocument.version}</Badge>
                    <Button variant="outline" size="sm" onClick={() => handleEditDocument(selectedDocument.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShareDocument(selectedDocument.id)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                <DialogDescription>
                  By {selectedDocument.author.name} • Last updated {format(selectedDocument.updatedAt, 'MMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>
              
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {selectedDocument.content}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};