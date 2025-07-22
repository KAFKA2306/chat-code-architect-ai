import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Terminal, 
  GitBranch, 
  Database, 
  Zap, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Code2,
  Github,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const projects = [
    {
      id: 1,
      name: "E-commerce API",
      description: "FastAPI backend with Supabase integration",
      status: "building",
      progress: 75,
      lastActivity: "2 minutes ago",
      tech: ["Python", "FastAPI", "Supabase"],
      branch: "feature/payment-integration"
    },
    {
      id: 2,
      name: "Chat Bot Service",
      description: "Claude-powered customer support bot",
      status: "completed",
      progress: 100,
      lastActivity: "1 hour ago",
      tech: ["Node.js", "Claude API", "Express"],
      branch: "main"
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Real-time data visualization platform",
      status: "planning",
      progress: 25,
      lastActivity: "1 day ago",
      tech: ["React", "D3.js", "WebSocket"],
      branch: "develop"
    }
  ];

  const recentActivities = [
    { action: "PR Created", project: "E-commerce API", time: "2m ago", type: "git" },
    { action: "Build Completed", project: "Chat Bot Service", time: "5m ago", type: "build" },
    { action: "Database Migration", project: "E-commerce API", time: "15m ago", type: "database" },
    { action: "Function Deployed", project: "Analytics Dashboard", time: "1h ago", type: "deploy" },
  ];

  const stats = [
    { label: "Active Projects", value: "3", icon: Code2, color: "text-primary" },
    { label: "Successful Builds", value: "127", icon: CheckCircle, color: "text-success" },
    { label: "GitHub PRs", value: "24", icon: GitBranch, color: "text-info" },
    { label: "Team Members", value: "8", icon: Users, color: "text-accent" },
  ];

  return (
    <AppLayout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI-powered backend projects</p>
          </div>
          <div className="flex space-x-3">
            <Button asChild>
              <Link to="/chat">
                <Terminal className="h-4 w-4 mr-2" />
                Start Building
              </Link>
            </Button>
            <Button variant="outline">
              <Github className="h-4 w-4 mr-2" />
              Sync GitHub
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Projects</span>
                  <Button variant="outline" size="sm">
                    <Code2 className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </CardTitle>
                <CardDescription>
                  AI-generated backend applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 rounded-lg bg-muted/20 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          project.status === 'completed' ? 'default' :
                          project.status === 'building' ? 'secondary' : 'outline'
                        }>
                          {project.status === 'building' ? (
                            <div className="flex items-center">
                              <div className="animate-pulse-glow h-2 w-2 bg-warning rounded-full mr-2" />
                              Building
                            </div>
                          ) : project.status === 'completed' ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Planning
                            </div>
                          )}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          {project.status === 'building' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <GitBranch className="h-3 w-3 mr-1" />
                            {project.branch}
                          </div>
                          <span>{project.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across your projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/10">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'git' ? 'bg-primary/20' :
                      activity.type === 'build' ? 'bg-success/20' :
                      activity.type === 'database' ? 'bg-info/20' :
                      'bg-accent/20'
                    }`}>
                      {activity.type === 'git' && <GitBranch className="h-4 w-4 text-primary" />}
                      {activity.type === 'build' && <CheckCircle className="h-4 w-4 text-success" />}
                      {activity.type === 'database' && <Database className="h-4 w-4 text-info" />}
                      {activity.type === 'deploy' && <Zap className="h-4 w-4 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.project}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}