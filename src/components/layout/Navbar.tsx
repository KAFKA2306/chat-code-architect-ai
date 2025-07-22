import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Github, 
  Settings, 
  User, 
  Zap,
  Terminal,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Lovable-for-Backend
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Development</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/chat" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Terminal className="h-4 w-4" />
              <span>Chat</span>
            </Link>
            <Link 
              to="/projects" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Database className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link 
              to="/jupyter" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>Jupyter</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};