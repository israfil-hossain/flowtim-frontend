/**
 * Team Chat Component
 * Real-time messaging and communication for teams
 */

import { FC, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreHorizontal,
  Search,
  Hash,
  Lock,
  Users,
  Plus,
  Settings,
  Pin,
  Reply,
  Edit,
  Trash2,
  ThumbsUp
} from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  author: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  channelId: string;
  timestamp: Date;
  editedAt?: Date;
  replyTo?: {
    id: string;
    author: string;
    content: string;
  };
  reactions: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  mentions: string[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

interface Channel {
  id: string;
  name: string;
  description?: string;
  type: 'public' | 'private' | 'direct';
  members: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdBy: string;
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: Date;
}

export const TeamChat: FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Mock data - replace with actual API calls and WebSocket
  const mockChannels: Channel[] = [
    {
      id: 'general',
      name: 'general',
      description: 'General team discussions',
      type: 'public',
      members: ['user1', 'user2', 'user3'],
      unreadCount: 0,
      createdBy: 'user1',
      createdAt: new Date(2024, 0, 1)
    },
    {
      id: 'development',
      name: 'development',
      description: 'Development discussions',
      type: 'public',
      members: ['user1', 'user2'],
      unreadCount: 3,
      createdBy: 'user1',
      createdAt: new Date(2024, 0, 2)
    },
    {
      id: 'design',
      name: 'design',
      description: 'Design reviews and feedback',
      type: 'private',
      members: ['user2', 'user3'],
      unreadCount: 1,
      createdBy: 'user2',
      createdAt: new Date(2024, 0, 3)
    }
  ];

  const mockUsers: User[] = [
    {
      id: 'user1',
      name: 'John Doe',
      isOnline: true,
      status: 'online'
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      isOnline: true,
      status: 'busy'
    },
    {
      id: 'user3',
      name: 'Bob Johnson',
      isOnline: false,
      status: 'offline',
      lastSeen: new Date(2024, 0, 15, 14, 30)
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hey everyone! How\'s the project going?',
      type: 'text',
      author: {
        id: 'user1',
        name: 'John Doe',
        isOnline: true
      },
      channelId: 'general',
      timestamp: new Date(2024, 0, 15, 9, 0),
      reactions: [
        { emoji: '👍', count: 2, users: ['user2', 'user3'] }
      ],
      mentions: []
    },
    {
      id: '2',
      content: 'Making great progress! The new dashboard is almost ready.',
      type: 'text',
      author: {
        id: 'user2',
        name: 'Jane Smith',
        isOnline: true
      },
      channelId: 'general',
      timestamp: new Date(2024, 0, 15, 9, 15),
      reactions: [],
      mentions: []
    },
    {
      id: '3',
      content: 'That\'s awesome! Can you share a screenshot?',
      type: 'text',
      author: {
        id: 'user3',
        name: 'Bob Johnson',
        isOnline: false
      },
      channelId: 'general',
      timestamp: new Date(2024, 0, 15, 9, 20),
      replyTo: {
        id: '2',
        author: 'Jane Smith',
        content: 'Making great progress! The new dashboard is almost ready.'
      },
      reactions: [],
      mentions: ['user2']
    },
    {
      id: '4',
      content: 'Sure! Here\'s the current state of the dashboard:',
      type: 'text',
      author: {
        id: 'user2',
        name: 'Jane Smith',
        isOnline: true
      },
      channelId: 'general',
      timestamp: new Date(2024, 0, 15, 9, 25),
      attachments: [
        {
          id: 'att1',
          name: 'dashboard-screenshot.png',
          url: '/uploads/dashboard.png',
          type: 'image/png',
          size: 1024000
        }
      ],
      reactions: [
        { emoji: '🔥', count: 1, users: ['user1'] },
        { emoji: '👏', count: 1, users: ['user3'] }
      ],
      mentions: []
    }
  ];

  const currentChannel = mockChannels.find(c => c.id === selectedChannel);
  const channelMessages = mockMessages.filter(m => m.channelId === selectedChannel);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // TODO: Send message via API/WebSocket
    console.log('Sending message:', {
      content: messageText,
      channelId: selectedChannel,
      replyTo: replyingTo?.id
    });

    setMessageText("");
    setReplyingTo(null);
    messageInputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    // TODO: Add/remove reaction
    console.log('Reaction:', messageId, emoji);
  };

  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'MMM d, HH:mm');
    }
  };

  const getChannelIcon = (channel: Channel) => {
    if (channel.type === 'private') {
      return <Lock className="h-4 w-4" />;
    } else if (channel.type === 'direct') {
      return <Users className="h-4 w-4" />;
    }
    return <Hash className="h-4 w-4" />;
  };

  const getStatusIndicator = (user: User) => {
    const colors = {
      online: 'bg-green-500',
      busy: 'bg-yellow-500',
      away: 'bg-orange-500',
      offline: 'bg-gray-400'
    };
    
    return (
      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${colors[user.status]}`} />
    );
  };

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Chat</h3>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="channels" className="flex-1">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="channels" className="space-y-1 px-2">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-medium text-muted-foreground">Channels</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-64">
              {mockChannels.map(channel => (
                <div
                  key={channel.id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted transition-colors ${
                    selectedChannel === channel.id ? 'bg-primary/10 text-primary' : ''
                  }`}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  {getChannelIcon(channel)}
                  <span className="flex-1 text-sm">{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {channel.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-1 px-2">
            <div className="p-2">
              <span className="text-sm font-medium text-muted-foreground">
                Team Members ({mockUsers.filter(u => u.isOnline).length} online)
              </span>
            </div>
            
            <ScrollArea className="h-64">
              {mockUsers.map(user => {
                const userName = user.name;
                const userInitials = getAvatarFallbackText(userName);
                const userColor = getAvatarColor(userName);

                return (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={userName} />
                        <AvatarFallback className={`${userColor} text-xs`}>
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      {getStatusIndicator(user)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.isOnline ? user.status : `Last seen ${user.lastSeen ? format(user.lastSeen, 'MMM d, HH:mm') : 'Never'}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentChannel && getChannelIcon(currentChannel)}
            <div>
              <h3 className="font-semibold">#{currentChannel?.name}</h3>
              {currentChannel?.description && (
                <p className="text-sm text-muted-foreground">{currentChannel.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {channelMessages.map((message, index) => {
              const author = message.author;
              const authorName = author.name;
              const authorInitials = getAvatarFallbackText(authorName);
              const authorColor = getAvatarColor(authorName);
              
              const showAvatar = index === 0 || channelMessages[index - 1].author.id !== message.author.id;

              return (
                <div key={message.id} className={`group flex gap-3 ${showAvatar ? 'mt-4' : 'mt-1'}`}>
                  <div className="w-8">
                    {showAvatar ? (
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={author.avatar} alt={authorName} />
                          <AvatarFallback className={`${authorColor} text-xs`}>
                            {authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        {author.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground text-center">
                        {format(message.timestamp, 'HH:mm')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {showAvatar && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm">{authorName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    {message.replyTo && (
                      <div className="mb-2 p-2 bg-muted/50 rounded border-l-2 border-primary">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Reply className="h-3 w-3" />
                          Reply to {message.replyTo.author}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {message.replyTo.content}
                        </p>
                      </div>
                    )}
                    
                    <div className="text-sm leading-relaxed">
                      {message.content}
                    </div>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{attachment.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({Math.round(attachment.size / 1024)}KB)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.reactions.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {message.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            className="flex items-center gap-1 px-2 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs transition-colors"
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleReaction(message.id, '👍')}>
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setReplyingTo(message)}>
                      <Reply className="h-3 w-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pin className="mr-2 h-4 w-4" />
                          Pin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Reply Bar */}
        {replyingTo && (
          <div className="p-2 bg-muted/50 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Reply className="h-4 w-4" />
                <span>Replying to <strong>{replyingTo.author.name}</strong></span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {replyingTo.content}
            </p>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                ref={messageInputRef}
                placeholder={`Message #${currentChannel?.name}`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[40px] max-h-32 resize-none"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};