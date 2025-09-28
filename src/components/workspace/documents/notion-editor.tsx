import { FC, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Plus,
  GripVertical,
  MoreHorizontal,
  Save,
  Users,
  Clock,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";

export interface BlockType {
  id: string;
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulleted-list' | 'numbered-list' | 'quote' | 'code' | 'image' | 'divider' | 'table';
  content: string;
  properties?: {
    level?: number;
    imageUrl?: string;
    imageCaption?: string;
    alignment?: 'left' | 'center' | 'right';
    tableData?: string[][];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentData {
  id: string;
  title: string;
  emoji?: string;
  coverImage?: string;
  blocks: BlockType[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  collaborators: {
    id: string;
    name: string;
    avatar?: string;
    isActive: boolean;
    lastSeen?: Date;
  }[];
  lastSaved: Date;
  version: number;
  folderId?: string | null;
}

interface NotionEditorProps {
  document: DocumentData | null;
  onDocumentSave: (document: DocumentData) => void;
  onDocumentUpdate: (updates: Partial<DocumentData>) => void;
  onBackToList?: () => void;
  isReadOnly?: boolean;
  className?: string;
}

interface BlockProps {
  block: BlockType;
  index: number;
  isSelected: boolean;
  onBlockUpdate: (blockId: string, updates: Partial<BlockType>) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockAdd: (afterBlockId: string, type: BlockType['type']) => void;
  onBlockSelect: (blockId: string | null) => void;
  onBlockMove: (blockId: string, direction: 'up' | 'down') => void;
  isReadOnly?: boolean;
}

const BlockComponent: FC<BlockProps> = ({
  block,
  index,
  isSelected,
  onBlockUpdate,
  onBlockDelete,
  onBlockAdd,
  onBlockSelect,
  onBlockMove,
  isReadOnly = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(block.content);
  }, [block.content]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, [isEditing, content.length]);

  const handleSave = () => {
    onBlockUpdate(block.id, { content, updatedAt: new Date() });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
      onBlockAdd(block.id, 'paragraph');
    } else if (e.key === 'Escape') {
      setContent(block.content);
      setIsEditing(false);
    }
  };


  const renderBlockContent = () => {
    if (isEditing && !isReadOnly) {
      return (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className="min-h-[40px] resize-none border-none p-0 focus:ring-0 focus:ring-offset-0 bg-transparent text-gray-800 leading-relaxed"
          placeholder="Type '/' for commands..."
        />
      );
    }

    switch (block.type) {
      case 'heading1':
        return <h1 className="text-2xl font-bold text-gray-900 leading-tight">{content}</h1>;
      case 'heading2':
        return <h2 className="text-xl font-semibold text-gray-900 leading-tight">{content}</h2>;
      case 'heading3':
        return <h3 className="text-lg font-medium text-gray-900 leading-tight">{content}</h3>;
      case 'bulleted-list':
        return (
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {content.split('\n').map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol className="list-decimal list-inside text-gray-800 space-y-1">
            {content.split('\n').map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ol>
        );
      case 'quote':
        return (
          <blockquote className="border-l-3 border-gray-300 pl-4 italic text-gray-700 bg-gray-50 py-2 rounded-r">
            {content}
          </blockquote>
        );
      case 'code':
        return (
          <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto border">
            <code className="text-sm font-mono text-gray-800">{content}</code>
          </pre>
        );
      case 'image':
        return (
          <div className="my-4">
            {block.properties?.imageUrl && (
              <img
                src={block.properties.imageUrl}
                alt={block.properties.imageCaption || ''}
                className="max-w-full h-auto rounded-lg border"
              />
            )}
            {block.properties?.imageCaption && (
              <p className="text-sm text-gray-600 text-center mt-2">
                {block.properties.imageCaption}
              </p>
            )}
          </div>
        );
      case 'divider':
        return <hr className="my-4 border-gray-200" />;
      case 'table':
        return (
          <div className="my-4 overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <tbody>
                {(block.properties?.tableData || [['', ''], ['', '']]).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-gray-200 last:border-b-0">
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="border-r border-gray-200 p-3 text-sm last:border-r-0 text-gray-800"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>;
    }
  };

  return (
    <div
      className={`group relative py-1 px-2 rounded-lg transition-colors ${
        isSelected ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'
      }`}
      onClick={() => onBlockSelect(block.id)}
    >
      {/* Block Handle */}
      <div className="absolute left-0 top-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 cursor-grab hover:bg-gray-100 rounded"
          disabled={isReadOnly}
        >
          <GripVertical className="h-3 w-3 text-gray-400" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-gray-100 rounded">
              <Plus className="h-3 w-3 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'paragraph')} className="text-sm">
              <Type className="mr-2 h-3 w-3" />
              Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'heading1')} className="text-sm">
              <Heading1 className="mr-2 h-3 w-3" />
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'heading2')} className="text-sm">
              <Heading2 className="mr-2 h-3 w-3" />
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'heading3')} className="text-sm">
              <Heading3 className="mr-2 h-3 w-3" />
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'bulleted-list')} className="text-sm">
              <List className="mr-2 h-3 w-3" />
              Bulleted List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'numbered-list')} className="text-sm">
              <ListOrdered className="mr-2 h-3 w-3" />
              Numbered List
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'quote')} className="text-sm">
              <Quote className="mr-2 h-3 w-3" />
              Quote
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'code')} className="text-sm">
              <Code className="mr-2 h-3 w-3" />
              Code
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockAdd(block.id, 'divider')} className="text-sm">
              <Minus className="mr-2 h-3 w-3" />
              Divider
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Block Content */}
      <div
        className="ml-8 cursor-text py-1"
        onDoubleClick={() => !isReadOnly && setIsEditing(true)}
      >
        {renderBlockContent()}
      </div>

      {/* Block Actions */}
      {isSelected && !isReadOnly && (
        <div className="absolute right-1 top-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-gray-100 rounded text-gray-400"
            onClick={() => onBlockMove(block.id, 'up')}
            disabled={index === 0}
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-gray-100 rounded text-gray-400"
            onClick={() => onBlockMove(block.id, 'down')}
          >
            ↓
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-gray-100 rounded">
                <MoreHorizontal className="h-3 w-3 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditing(true)} className="text-sm">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBlockDelete(block.id)} className="text-red-600 text-sm">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export const NotionEditor: FC<NotionEditorProps> = ({
  document,
  onDocumentSave,
  onDocumentUpdate,
  onBackToList,
  isReadOnly = false,
  className = "",
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [title, setTitle] = useState(document?.title || '');
  const [emoji, setEmoji] = useState(document?.emoji || '📄');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    setTitle(document?.title || '');
    setEmoji(document?.emoji || '📄');
  }, [document]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Eye className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Select a document</h3>
          <p>Choose a document from the list to start reading or editing</p>
        </div>
      </div>
    );
  }

  const handleTitleSave = () => {
    if (title.trim() !== document.title) {
      onDocumentUpdate({ title: title.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleBlockUpdate = (blockId: string, updates: Partial<BlockType>) => {
    const updatedBlocks = document.blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onDocumentUpdate({ blocks: updatedBlocks, lastSaved: new Date() });
  };

  const handleBlockAdd = (afterBlockId: string, type: BlockType['type']) => {
    const newBlock: BlockType = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const afterIndex = document.blocks.findIndex(block => block.id === afterBlockId);
    const updatedBlocks = [...document.blocks];
    updatedBlocks.splice(afterIndex + 1, 0, newBlock);
    
    onDocumentUpdate({ blocks: updatedBlocks });
    setSelectedBlockId(newBlock.id);
  };

  const handleBlockDelete = (blockId: string) => {
    const updatedBlocks = document.blocks.filter(block => block.id !== blockId);
    onDocumentUpdate({ blocks: updatedBlocks });
    setSelectedBlockId(null);
  };

  const handleBlockMove = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = document.blocks.findIndex(block => block.id === blockId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= document.blocks.length) return;

    const updatedBlocks = [...document.blocks];
    const [movedBlock] = updatedBlocks.splice(currentIndex, 1);
    updatedBlocks.splice(newIndex, 0, movedBlock);
    
    onDocumentUpdate({ blocks: updatedBlocks });
  };

  const activeCollaborators = document.collaborators.filter(c => c.isActive);

  return (
    <TooltipProvider>
      <div className={`h-full flex flex-col bg-white ${className}`}>
        {/* Document Header */}
        <div className="flex-none border-b border-gray-100 p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              {onBackToList && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBackToList}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              
              {/* Emoji */}
              <span className="text-3xl">{emoji}</span>
              
              {/* Title */}
              {isEditingTitle && !isReadOnly ? (
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSave();
                    if (e.key === 'Escape') {
                      setTitle(document.title);
                      setIsEditingTitle(false);
                    }
                  }}
                  className="text-3xl font-bold border-none p-0 h-auto focus:ring-0 bg-transparent"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-3xl font-bold cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-gray-900"
                  onDoubleClick={() => !isReadOnly && setIsEditingTitle(true)}
                >
                  {title || 'Untitled'}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Active Collaborators */}
              {activeCollaborators.length > 0 && (
                <div className="flex -space-x-2">
                  {activeCollaborators.slice(0, 3).map((collaborator) => (
                    <Tooltip key={collaborator.id}>
                      <TooltipTrigger>
                        <Avatar className="h-7 w-7 border-2 border-white">
                          <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                            {collaborator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{collaborator.name} (editing)</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {activeCollaborators.length > 3 && (
                    <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium border-2 border-white text-gray-600">
                      +{activeCollaborators.length - 3}
                    </div>
                  )}
                </div>
              )}

              {/* Save Status */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Saved {format(document.lastSaved, 'HH:mm')}</span>
              </div>

              {/* Save Button */}
              {!isReadOnly && (
                <Button size="sm" onClick={() => onDocumentSave(document)} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>

          {/* Document Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By {document.author.name}</span>
            <span>•</span>
            <span>Version {document.version}</span>
            <span>•</span>
            <span>{document.blocks.length} blocks</span>
            {document.collaborators.length > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{document.collaborators.length} collaborator{document.collaborators.length !== 1 ? 's' : ''}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-8 space-y-1">
            {document.blocks.length === 0 && !isReadOnly ? (
              <div className="text-center py-12 text-gray-500">
                <Type className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2 text-gray-900">Start writing</h3>
                <p>Click here to add your first block</p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleBlockAdd('', 'paragraph')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </div>
            ) : (
              document.blocks.map((block, index) => (
                <BlockComponent
                  key={block.id}
                  block={block}
                  index={index}
                  isSelected={selectedBlockId === block.id}
                  onBlockUpdate={handleBlockUpdate}
                  onBlockDelete={handleBlockDelete}
                  onBlockAdd={handleBlockAdd}
                  onBlockSelect={setSelectedBlockId}
                  onBlockMove={handleBlockMove}
                  isReadOnly={isReadOnly}
                />
              ))
            )}

            {/* Add Block Button at End */}
            {document.blocks.length > 0 && !isReadOnly && (
              <div className="pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBlockAdd(document.blocks[document.blocks.length - 1].id, 'paragraph')}
                  className="w-full text-gray-500 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};