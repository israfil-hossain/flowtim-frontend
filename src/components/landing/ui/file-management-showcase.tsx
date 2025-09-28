import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/ui/section-badge";
import { 
  FolderTree,
  FileText,
  Share2,
  Shield,
  Search,
  Cloud,
  ArrowRight,
  CheckCircle,
  Upload,
  Download
} from "lucide-react";

const FILE_FEATURES = [
  {
    id: 1,
    icon: FolderTree,
    title: "Smart File Organization",
    description: "Organize your project files with intelligent folder structures, automated categorization, and intuitive navigation.",
    image: "/images/dashboard.png",
    features: ["Nested Folders", "Auto-categorization", "Custom Tags", "Quick Navigation"],
    reverse: false
  },
  {
    id: 2,
    icon: Share2,
    title: "Seamless File Sharing",
    description: "Share files and folders with team members, external collaborators, or clients with granular permission controls.",
    image: "/images/dashboard.png",
    features: ["Permission Controls", "Link Sharing", "Access Logs", "Expiration Dates"],
    reverse: true
  },
  {
    id: 3,
    icon: Cloud,
    title: "Cloud Synchronization",
    description: "Keep your files synchronized across all devices with real-time updates and offline access capabilities.",
    image: "/images/dashboard.png",
    features: ["Real-time Sync", "Offline Access", "Version History", "Conflict Resolution"],
    reverse: false
  }
];

const MANAGEMENT_TOOLS = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find any file instantly with powerful search filters and metadata indexing."
  },
  {
    icon: Shield,
    title: "Security & Backup",
    description: "Enterprise-grade security with automated backups and encryption at rest."
  },
  {
    icon: Upload,
    title: "Bulk Operations",
    description: "Upload, move, and organize multiple files with drag-and-drop functionality."
  },
  {
    icon: Download,
    title: "Export & Archive",
    description: "Export project files or create archives for long-term storage and compliance."
  }
];

const FileManagementShowcase = () => {
  return (
    <Wrapper className="py-20 lg:py-32">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-6 mb-16">
        <AnimationContainer animation="fadeUp" delay={0.1}>
          <SectionBadge title="File & Folder Management" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-nohemi !leading-tight primary-gradient">
            Organize, share, and manage
            <br />
            <span className="text-foreground">all your project files</span>
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-uncut">
            Centralize your project documents, assets, and resources with intelligent file management that scales with your team.
          </p>
        </AnimationContainer>
      </div>

      {/* Main Features */}
      <div className="space-y-24 mb-20">
        {FILE_FEATURES.map((feature, index) => (
          <AnimationContainer key={feature.id} animation="fadeUp" delay={0.4 + (index * 0.1)}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={`space-y-6 ${feature.reverse ? 'lg:col-start-2' : ''}`}>
                <AnimationContainer animation="fadeUp" delay={0.5 + (index * 0.1)}>
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.6 + (index * 0.1)}>
                  <h3 className="text-2xl md:text-3xl font-bold font-nohemi text-foreground">
                    {feature.title}
                  </h3>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.7 + (index * 0.1)}>
                  <p className="text-lg text-muted-foreground font-uncut leading-relaxed">
                    {feature.description}
                  </p>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.8 + (index * 0.1)}>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground font-uncut">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimationContainer>

                <AnimationContainer animation="fadeUp" delay={0.9 + (index * 0.1)}>
                  <Button className="group bg-primary hover:bg-primary/90">
                    Explore Feature
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </AnimationContainer>
              </div>

              {/* Image */}
              <div className={`${feature.reverse ? 'lg:col-start-1' : ''}`}>
                <AnimationContainer 
                  animation={feature.reverse ? "fadeLeft" : "fadeRight"} 
                  delay={0.6 + (index * 0.1)}
                >
                  <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 lg:p-6">
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                        />
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute top-8 right-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      
                      {/* File Count Indicator */}
                      <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium text-foreground">2.4k Files</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>
        ))}
      </div>

      {/* Management Tools Grid */}
      <AnimationContainer animation="fadeUp" delay={0.6}>
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold font-nohemi mb-4">
            Powerful Management Tools
          </h3>
          <p className="text-muted-foreground font-uncut max-w-2xl mx-auto">
            Complete suite of tools to manage, secure, and optimize your file workflow.
          </p>
        </div>
      </AnimationContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {MANAGEMENT_TOOLS.map((tool, index) => (
          <AnimationContainer key={index} animation="fadeUp" delay={0.7 + (index * 0.1)}>
            <div className="group p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold font-nohemi mb-2 text-foreground">
                {tool.title}
              </h4>
              <p className="text-sm text-muted-foreground font-uncut leading-relaxed">
                {tool.description}
              </p>
            </div>
          </AnimationContainer>
        ))}
      </div>

      {/* Bottom CTA */}
      <AnimationContainer animation="fadeUp" delay={0.8}>
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold font-nohemi mb-4">
              Ready to streamline your file management?
            </h3>
            <p className="text-muted-foreground mb-6 font-uncut">
              Start organizing your project files like never before. Experience the power of intelligent file management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Managing Files
                <FolderTree className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
                <Share2 className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  );
};

export default FileManagementShowcase;