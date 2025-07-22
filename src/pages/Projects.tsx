import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  GitBranch,
  Database,
  Play,
  Pause,
  Settings,
  Trash2,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  Code2,
  Users,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'building' | 'completed' | 'paused' | 'error';
  technologies: string[];
  createdAt: string;
  lastModified: string;
  branch: string;
  repository: string;
  deploymentUrl?: string;
  team: string[];
  buildTime: string;
  linesOfCode: number;
}

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce API',
      description: 'FastAPI backend with Supabase integration for online marketplace',
      status: 'building',
      technologies: ['Python', 'FastAPI', 'Supabase', 'Redis', 'Docker'],
      createdAt: '2024-01-15',
      lastModified: '2 minutes ago',
      branch: 'feature/payment-integration',
      repository: 'github.com/team/ecommerce-api',
      deploymentUrl: 'https://api.marketplace.dev',
      team: ['Alice', 'Bob', 'Carol'],
      buildTime: '45s',
      linesOfCode: 2840
    },
    {
      id: '2',
      name: 'Chat Bot Service',
      description: 'Claude-powered customer support automation with multi-language support',
      status: 'completed',
      technologies: ['Node.js', 'Claude API', 'Express', 'MongoDB', 'Socket.io'],
      createdAt: '2024-01-10',
      lastModified: '1 hour ago',
      branch: 'main',
      repository: 'github.com/team/chatbot-service',
      deploymentUrl: 'https://chat.support.app',
      team: ['David', 'Eve'],
      buildTime: '32s',
      linesOfCode: 1965
    },
    {
      id: '3',
      name: 'Analytics Dashboard API',
      description: 'Real-time data processing and visualization backend',
      status: 'active',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Celery', 'WebSocket'],
      createdAt: '2024-01-05',
      lastModified: '3 hours ago',
      branch: 'develop',
      repository: 'github.com/team/analytics-api',
      deploymentUrl: 'https://analytics.dashboard.io',
      team: ['Frank', 'Grace', 'Henry'],
      buildTime: '1m 23s',
      linesOfCode: 4532
    },
    {
      id: '4',
      name: 'Authentication Service',
      description: 'OAuth2 and JWT-based microservice for user management',
      status: 'paused',
      technologies: ['Go', 'Gin', 'PostgreSQL', 'JWT', 'Redis'],
      createdAt: '2024-01-01',
      lastModified: '2 days ago',
      branch: 'feature/oauth-providers',
      repository: 'github.com/team/auth-service',
      team: ['Ian', 'Jane'],
      buildTime: '28s',
      linesOfCode: 1234
    },
    {
      id: '5',
      name: 'File Storage API',
      description: 'Distributed file storage with CDN integration',
      status: 'error',
      technologies: ['Rust', 'Actix', 'AWS S3', 'Redis', 'Docker'],
      createdAt: '2023-12-28',
      lastModified: '4 days ago',
      branch: 'hotfix/s3-connection',
      repository: 'github.com/team/storage-api',
      team: ['Kevin'],
      buildTime: 'Failed',
      linesOfCode: 892
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary/20 text-primary';
      case 'building': return 'bg-warning/20 text-warning';
      case 'completed': return 'bg-success/20 text-success';
      case 'paused': return 'bg-muted/20 text-muted-foreground';
      case 'error': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3" />;
      case 'building': return <Clock className="h-3 w-3 animate-pulse" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      case 'error': return <AlertTriangle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your AI-generated backend applications</p>
          </div>
          <Button asChild>
            <Link to="/chat">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="building">Building</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="capitalize">{project.status}</span>
                      </div>
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Lines of Code</div>
                    <div className="font-medium text-foreground">{project.linesOfCode.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Build Time</div>
                    <div className="font-medium text-foreground">{project.buildTime}</div>
                  </div>
                </div>

                {/* Repository and Branch */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{project.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{project.repository}</span>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                      >
                        {member[0]}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-6 h-6 bg-muted/20 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {project.lastModified}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-3 w-3" />
                    </Button>
                    {project.deploymentUrl && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start building your first AI-powered backend application'
              }
            </p>
            <Button asChild>
              <Link to="/chat">
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}