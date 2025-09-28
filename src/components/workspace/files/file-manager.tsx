/**
 * File Manager Component
 * Upload, organize, and share files with the team
 */

import { FC, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  File, 
 
 
  Download, 
  Share2, 
  Trash2, 
  Eye,
  Search,
  Grid3X3,
  List,
  Folder,
  Plus,
  MoreHorizontal,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  X
} from "lucide-react";
import { format } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';
  url: string;
  thumbnail?: string;
  uploadedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  uploadedAt: Date;
  lastAccessed?: Date;
  downloads: number;
  folder?: string;
  tags: string[];
  isPublic: boolean;
  sharedWith: string[];
  projectId?: string;
  taskId?: string;
}

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdBy: string;
  createdAt: Date;
  fileCount: number;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export const FileManager: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - replace with actual API calls
  const mockFiles: FileItem[] = [
    {
      id: '1',
      name: 'project-mockup.png',
      size: 2048000, // 2MB
      type: 'image/png',
      category: 'image',
      url: '/uploads/project-mockup.png',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
      uploadedBy: {
        id: '1',
        name: 'John Doe',
        avatar: undefined
      },
      uploadedAt: new Date(2024, 0, 15),
      downloads: 12,
      tags: ['mockup', 'design', 'ui'],
      isPublic: false,
      sharedWith: ['user2', 'user3']
    },
    {
      id: '2',
      name: 'presentation.pdf',
      size: 5120000, // 5MB
      type: 'application/pdf',
      category: 'document',
      url: '/uploads/presentation.pdf',
      uploadedBy: {
        id: '2',
        name: 'Jane Smith',
        avatar: undefined
      },
      uploadedAt: new Date(2024, 0, 12),
      downloads: 8,
      tags: ['presentation', 'meeting'],
      isPublic: true,
      sharedWith: []
    },
    {
      id: '3',
      name: 'demo-video.mp4',
      size: 25600000, // 25MB
      type: 'video/mp4',
      category: 'video',
      url: '/uploads/demo-video.mp4',
      uploadedBy: {
        id: '3',
        name: 'Bob Johnson',
        avatar: undefined
      },
      uploadedAt: new Date(2024, 0, 10),
      downloads: 5,
      tags: ['demo', 'video', 'product'],
      isPublic: false,
      sharedWith: ['user1']
    }
  ];

  const mockFolders: Folder[] = [
    {
      id: '1',
      name: 'Design Assets',
      createdBy: 'user1',
      createdAt: new Date(2024, 0, 1),
      fileCount: 15
    },
    {
      id: '2',
      name: 'Documents',
      createdBy: 'user2',
      createdAt: new Date(2024, 0, 5),
      fileCount: 8
    },
    {
      id: '3',
      name: 'Videos',
      createdBy: 'user3',
      createdAt: new Date(2024, 0, 8),
      fileCount: 3
    }
  ];

  const categories = ['all', 'image', 'video', 'audio', 'document', 'archive', 'other'];

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesFolder = currentFolder ? file.folder === currentFolder : !file.folder;
    return matchesSearch && matchesCategory && matchesFolder;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (category: string, large = false) => {
    const size = large ? "h-8 w-8" : "h-4 w-4";
    switch (category) {
      case 'image':
        return <FileImage className={`${size} text-green-500`} />;
      case 'video':
        return <FileVideo className={`${size} text-blue-500`} />;
      case 'audio':
        return <FileAudio className={`${size} text-purple-500`} />;
      case 'document':
        return <FileText className={`${size} text-orange-500`} />;
      case 'archive':
        return <Archive className={`${size} text-yellow-500`} />;
      default:
        return <File className={`${size} text-gray-500`} />;
    }
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const uploadItem: UploadProgress = {
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      };
      
      setUploadProgress(prev => [...prev, uploadItem]);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => 
          prev.map(item => 
            item.fileName === file.name && item.status === 'uploading'
              ? { ...item, progress: Math.min(item.progress + Math.random() * 30, 100) }
              : item
          )
        );
      }, 500);
      
      // Complete upload after random time
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(prev => 
          prev.map(item => 
            item.fileName === file.name
              ? { ...item, progress: 100, status: 'completed' }
              : item
          )
        );
        
        // Remove completed uploads after 3 seconds
        setTimeout(() => {
          setUploadProgress(prev => prev.filter(item => item.fileName !== file.name));
        }, 3000);
      }, 2000 + Math.random() * 3000);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current?.files) {
      handleFileUpload(fileInputRef.current.files);
    }
  };

  const handleDownload = (file: FileItem) => {
    // TODO: Implement actual download
    console.log('Downloading file:', file.name);
  };

  const handleShare = (file: FileItem) => {
    // TODO: Open sharing dialog
    console.log('Sharing file:', file.name);
  };

  const handleDelete = (fileId: string) => {
    // TODO: Implement file deletion
    console.log('Deleting file:', fileId);
  };

  const handlePreview = (file: FileItem) => {
    // TODO: Open file preview
    console.log('Previewing file:', file.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Files</h2>
          <p className="text-muted-foreground">
            Upload, organize, and share files with your team
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Drag and drop files or click to select
                </DialogDescription>
              </DialogHeader>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Drop files here</p>
                <p className="text-muted-foreground mb-4">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  Select Files
                </Button>
              </div>
              
              {uploadProgress.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Upload Progress</h4>
                  {uploadProgress.map((upload, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate">{upload.fileName}</span>
                        <span className="text-muted-foreground">
                          {upload.status === 'completed' ? 'Complete' : `${Math.round(upload.progress)}%`}
                        </span>
                      </div>
                      <Progress value={upload.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Breadcrumb & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Folder className="h-4 w-4" />
            <span>Files</span>
            {currentFolder && (
              <>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {mockFolders.find(f => f.id === currentFolder)?.name}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Types' : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Folders */}
      {!currentFolder && mockFolders.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Folders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {mockFolders.map(folder => (
              <Card
                key={folder.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setCurrentFolder(folder.id)}
              >
                <CardContent className="p-4 text-center">
                  <Folder className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-medium text-sm truncate">{folder.name}</h4>
                  <p className="text-xs text-muted-foreground">{folder.fileCount} files</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {currentFolder ? `Files in ${mockFolders.find(f => f.id === currentFolder)?.name}` : 'Files'}
          </h3>
          {currentFolder && (
            <Button variant="outline" size="sm" onClick={() => setCurrentFolder(null)}>
              <X className="h-4 w-4 mr-2" />
              Back to all files
            </Button>
          )}
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map(file => {
              const uploader = file.uploadedBy;
              const uploaderName = uploader.name;
              const uploaderInitials = getAvatarFallbackText(uploaderName);
              const uploaderColor = getAvatarColor(uploaderName);

              return (
                <Card key={file.id} className="hover:shadow-md transition-shadow group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {file.isPublic && (
                          <Badge variant="secondary" className="text-xs">Public</Badge>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(file)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(file)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(file)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(file.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="text-center">
                      {file.thumbnail ? (
                        <img 
                          src={file.thumbnail} 
                          alt={file.name}
                          className="w-16 h-16 object-cover rounded mx-auto mb-3"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          {getFileIcon(file.category, true)}
                        </div>
                      )}
                      
                      <h4 className="font-medium text-sm truncate mb-1">{file.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{formatFileSize(file.size)}</p>
                      
                      <div className="flex items-center justify-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={uploader.avatar} alt={uploaderName} />
                          <AvatarFallback className={`${uploaderColor} text-[8px]`}>
                            {uploaderInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{uploaderName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                <div className="col-span-2">Name</div>
                <div>Size</div>
                <div>Type</div>
                <div>Uploaded</div>
                <div>Actions</div>
              </div>
              
              {filteredFiles.map(file => {
                const uploader = file.uploadedBy;
                const uploaderName = uploader.name;

                return (
                  <div key={file.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50 border-b last:border-b-0">
                    <div className="col-span-2 flex items-center gap-3">
                      {getFileIcon(file.category)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">by {uploaderName}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">{formatFileSize(file.size)}</div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {file.category}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {format(file.uploadedAt, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(file)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShare(file)}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <File className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No files found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Upload your first files to get started'
              }
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};