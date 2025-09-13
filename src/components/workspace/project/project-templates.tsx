/**
 * Project Templates
 * Pre-built project templates with tasks and workflows
 */

import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Filter, 
  Code, 
  Palette, 
  Megaphone, 
  Users, 
  Briefcase,
  Rocket,
  Building,
  Globe,
  Smartphone,
  BookOpen,
  ShoppingCart,
  Heart,
  Star,
  Clock,
  CheckCircle,
  Copy,
  Edit,
  Trash2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'software' | 'design' | 'marketing' | 'business' | 'research';
  icon: React.ReactNode;
  color: string;
  estimatedDuration: string;
  taskCount: number;
  tags: string[];
  isPopular?: boolean;
  isFavorite?: boolean;
  tasks: {
    title: string;
    description?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    estimatedHours: number;
    dependencies?: string[];
  }[];
  phases: {
    name: string;
    description: string;
    duration: string;
    taskCount: number;
  }[];
}

export const ProjectTemplates: FC = () => {
  const [templates] = useState<ProjectTemplate[]>([
    {
      id: '1',
      name: 'Web Application Development',
      description: 'Complete web app development from planning to deployment',
      category: 'software',
      icon: <Code className="h-6 w-6" />,
      color: 'bg-blue-500',
      estimatedDuration: '8-12 weeks',
      taskCount: 24,
      tags: ['React', 'Node.js', 'Database', 'API'],
      isPopular: true,
      tasks: [
        { title: 'Project Planning & Requirements', priority: 'HIGH', estimatedHours: 16 },
        { title: 'UI/UX Design', priority: 'HIGH', estimatedHours: 32 },
        { title: 'Database Design', priority: 'HIGH', estimatedHours: 12 },
        { title: 'Backend API Development', priority: 'HIGH', estimatedHours: 48 },
        { title: 'Frontend Development', priority: 'HIGH', estimatedHours: 56 },
        { title: 'Testing & QA', priority: 'MEDIUM', estimatedHours: 24 },
        { title: 'Deployment & DevOps', priority: 'MEDIUM', estimatedHours: 16 }
      ],
      phases: [
        { name: 'Planning', description: 'Requirements and design', duration: '2 weeks', taskCount: 4 },
        { name: 'Development', description: 'Core development phase', duration: '6 weeks', taskCount: 12 },
        { name: 'Testing', description: 'QA and bug fixes', duration: '2 weeks', taskCount: 5 },
        { name: 'Deployment', description: 'Launch and monitoring', duration: '2 weeks', taskCount: 3 }
      ]
    },
    {
      id: '2',
      name: 'Mobile App MVP',
      description: 'Minimum viable product for mobile application',
      category: 'software',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-green-500',
      estimatedDuration: '6-8 weeks',
      taskCount: 18,
      tags: ['React Native', 'MVP', 'Mobile'],
      isPopular: true,
      tasks: [
        { title: 'Market Research', priority: 'HIGH', estimatedHours: 12 },
        { title: 'MVP Feature Definition', priority: 'HIGH', estimatedHours: 8 },
        { title: 'Wireframes & Prototypes', priority: 'HIGH', estimatedHours: 20 },
        { title: 'Mobile App Development', priority: 'HIGH', estimatedHours: 80 },
        { title: 'Beta Testing', priority: 'MEDIUM', estimatedHours: 16 }
      ],
      phases: [
        { name: 'Research', description: 'Market and user research', duration: '1 week', taskCount: 3 },
        { name: 'Design', description: 'UI/UX design phase', duration: '2 weeks', taskCount: 5 },
        { name: 'Development', description: 'App development', duration: '4 weeks', taskCount: 8 },
        { name: 'Launch', description: 'Testing and launch', duration: '1 week', taskCount: 2 }
      ]
    },
    {
      id: '3',
      name: 'Brand Identity Design',
      description: 'Complete brand identity and visual design system',
      category: 'design',
      icon: <Palette className="h-6 w-6" />,
      color: 'bg-purple-500',
      estimatedDuration: '4-6 weeks',
      taskCount: 15,
      tags: ['Branding', 'Logo', 'Design System', 'Guidelines'],
      tasks: [
        { title: 'Brand Strategy Workshop', priority: 'HIGH', estimatedHours: 8 },
        { title: 'Logo Design Concepts', priority: 'HIGH', estimatedHours: 24 },
        { title: 'Color Palette Development', priority: 'MEDIUM', estimatedHours: 6 },
        { title: 'Typography Selection', priority: 'MEDIUM', estimatedHours: 4 },
        { title: 'Brand Guidelines Document', priority: 'HIGH', estimatedHours: 16 }
      ],
      phases: [
        { name: 'Strategy', description: 'Brand strategy and research', duration: '1 week', taskCount: 4 },
        { name: 'Design', description: 'Visual identity creation', duration: '3 weeks', taskCount: 8 },
        { name: 'Documentation', description: 'Guidelines and assets', duration: '2 weeks', taskCount: 3 }
      ]
    },
    {
      id: '4',
      name: 'Digital Marketing Campaign',
      description: 'Multi-channel digital marketing campaign launch',
      category: 'marketing',
      icon: <Megaphone className="h-6 w-6" />,
      color: 'bg-red-500',
      estimatedDuration: '6-10 weeks',
      taskCount: 20,
      tags: ['Social Media', 'Content', 'Analytics', 'SEO'],
      isFavorite: true,
      tasks: [
        { title: 'Campaign Strategy Planning', priority: 'HIGH', estimatedHours: 12 },
        { title: 'Content Calendar Creation', priority: 'HIGH', estimatedHours: 16 },
        { title: 'Creative Asset Development', priority: 'HIGH', estimatedHours: 32 },
        { title: 'Social Media Setup', priority: 'MEDIUM', estimatedHours: 8 },
        { title: 'Campaign Launch', priority: 'HIGH', estimatedHours: 4 }
      ],
      phases: [
        { name: 'Planning', description: 'Strategy and planning', duration: '2 weeks', taskCount: 5 },
        { name: 'Creation', description: 'Content and asset creation', duration: '4 weeks', taskCount: 10 },
        { name: 'Launch', description: 'Campaign execution', duration: '2 weeks', taskCount: 3 },
        { name: 'Analysis', description: 'Performance tracking', duration: '2 weeks', taskCount: 2 }
      ]
    },
    {
      id: '5',
      name: 'Product Launch',
      description: 'Complete product launch strategy and execution',
      category: 'business',
      icon: <Rocket className="h-6 w-6" />,
      color: 'bg-orange-500',
      estimatedDuration: '8-12 weeks',
      taskCount: 25,
      tags: ['Launch', 'Marketing', 'Sales', 'PR'],
      isPopular: true,
      tasks: [
        { title: 'Go-to-Market Strategy', priority: 'HIGH', estimatedHours: 20 },
        { title: 'Launch Timeline Planning', priority: 'HIGH', estimatedHours: 8 },
        { title: 'Marketing Material Creation', priority: 'HIGH', estimatedHours: 40 },
        { title: 'PR & Media Outreach', priority: 'MEDIUM', estimatedHours: 24 },
        { title: 'Launch Event Planning', priority: 'MEDIUM', estimatedHours: 32 }
      ],
      phases: [
        { name: 'Strategy', description: 'Launch strategy development', duration: '2 weeks', taskCount: 6 },
        { name: 'Preparation', description: 'Asset and material prep', duration: '4 weeks', taskCount: 12 },
        { name: 'Launch', description: 'Launch execution', duration: '2 weeks', taskCount: 4 },
        { name: 'Post-Launch', description: 'Analysis and optimization', duration: '4 weeks', taskCount: 3 }
      ]
    },
    {
      id: '6',
      name: 'User Research Study',
      description: 'Comprehensive user research and usability testing',
      category: 'research',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-teal-500',
      estimatedDuration: '4-6 weeks',
      taskCount: 12,
      tags: ['UX Research', 'Testing', 'Analysis', 'Insights'],
      tasks: [
        { title: 'Research Plan Development', priority: 'HIGH', estimatedHours: 12 },
        { title: 'Participant Recruitment', priority: 'HIGH', estimatedHours: 16 },
        { title: 'User Interviews', priority: 'HIGH', estimatedHours: 24 },
        { title: 'Usability Testing Sessions', priority: 'HIGH', estimatedHours: 20 },
        { title: 'Data Analysis & Insights', priority: 'MEDIUM', estimatedHours: 18 }
      ],
      phases: [
        { name: 'Planning', description: 'Research methodology', duration: '1 week', taskCount: 3 },
        { name: 'Recruitment', description: 'Participant sourcing', duration: '1 week', taskCount: 2 },
        { name: 'Research', description: 'Data collection', duration: '3 weeks', taskCount: 5 },
        { name: 'Analysis', description: 'Insights and reporting', duration: '1 week', taskCount: 2 }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Templates', icon: <Building className="h-4 w-4" /> },
    { id: 'software', name: 'Software', icon: <Code className="h-4 w-4" /> },
    { id: 'design', name: 'Design', icon: <Palette className="h-4 w-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <Megaphone className="h-4 w-4" /> },
    { id: 'business', name: 'Business', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'research', name: 'Research', icon: <BookOpen className="h-4 w-4" /> }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularTemplates = templates.filter(t => t.isPopular);
  const favoriteTemplates = templates.filter(t => t.isFavorite);

  const handleUseTemplate = (template: ProjectTemplate) => {
    console.log('Using template:', template);
    // TODO: Implement template usage
  };

  const handleViewTemplate = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project Templates</h2>
          <p className="text-muted-foreground">
            Get started quickly with pre-built project templates
          </p>
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {category.icon}
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Template Sections */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Templates ({templates.length})</TabsTrigger>
          <TabsTrigger value="popular">Popular ({popularTemplates.length})</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteTemplates.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${template.color} text-white`}>
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {template.name}
                          {template.isPopular && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {template.isFavorite && (
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          )}
                        </CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {template.estimatedDuration}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {template.taskCount} tasks
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTemplate(template)}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${template.color} text-white`}>
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {template.estimatedDuration}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {template.taskCount} tasks
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="flex-1" onClick={() => handleUseTemplate(template)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewTemplate(template)}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteTemplates.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-muted-foreground">No favorite templates yet</p>
                <p className="text-sm text-muted-foreground">Heart your favorite templates to find them here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  {/* Same card content */}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Template Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedTemplate.color} text-white`}>
                    {selectedTemplate.icon}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedTemplate.name}</DialogTitle>
                    <DialogDescription>{selectedTemplate.description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">{selectedTemplate.estimatedDuration}</p>
                        <p className="text-sm text-muted-foreground">Estimated Duration</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">{selectedTemplate.taskCount} Tasks</p>
                        <p className="text-sm text-muted-foreground">Total Tasks</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Project Phases</h4>
                  <div className="space-y-2">
                    {selectedTemplate.phases.map((phase, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">{phase.name}</h5>
                              <p className="text-sm text-muted-foreground">{phase.description}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>{phase.duration}</p>
                              <p>{phase.taskCount} tasks</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Key Tasks</h4>
                  <div className="space-y-2">
                    {selectedTemplate.tasks.slice(0, 5).map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          {task.description && (
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${
                            task.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                            task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {task.estimatedHours}h
                          </span>
                        </div>
                      </div>
                    ))}
                    {selectedTemplate.tasks.length > 5 && (
                      <p className="text-sm text-muted-foreground text-center pt-2">
                        +{selectedTemplate.tasks.length - 5} more tasks
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleUseTemplate(selectedTemplate)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};