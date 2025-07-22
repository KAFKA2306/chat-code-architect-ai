import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Folder, 
  FileText, 
  GitBranch, 
  Play, 
  Settings,
  Terminal,
  Database,
  Zap,
  Code2
} from "lucide-react";

export const Sidebar = () => {
  const projects = [
    { name: "E-commerce API", status: "active", language: "Python" },
    { name: "Chat Bot", status: "building", language: "Node.js" },
    { name: "Analytics Dashboard", status: "completed", language: "FastAPI" },
  ];

  const recentFiles = [
    "main.py", "requirements.txt", "docker-compose.yml", "README.md"
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card/50 backdrop-blur-sm">
      <ScrollArea className="h-full p-4">
        {/* Current Project */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Current Project</h3>
          <div className="p-3 bg-gradient-card rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">E-commerce API</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">FastAPI + Supabase</p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Play className="h-3 w-3 mr-1" />
                Build
              </Button>
              <Button size="sm" variant="outline">
                <Terminal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Projects</h3>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{project.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'active' ? 'bg-primary/20 text-primary' :
                    project.status === 'building' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{project.language}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <GitBranch className="h-4 w-4 mr-2" />
              New Branch
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Deploy to Supabase
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Zap className="h-4 w-4 mr-2" />
              Run Jupyter
            </Button>
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Files</h3>
          <div className="space-y-1">
            {recentFiles.map((file, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{file}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};