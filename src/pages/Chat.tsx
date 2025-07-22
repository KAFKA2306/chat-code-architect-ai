import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Code, 
  GitBranch, 
  Database, 
  Play, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy,
  Download,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    status?: 'thinking' | 'building' | 'completed' | 'error';
    actions?: Array<{
      type: 'pr' | 'deploy' | 'file' | 'migration';
      label: string;
      url?: string;
      description?: string;
    }>;
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'こんにちは！Lovable-for-Backend へようこそ。チャットでバックエンドアプリケーションを構築しましょう。どのようなプロジェクトを作成したいですか？',
      timestamp: new Date(),
      metadata: {
        status: 'completed'
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isBuilding) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsBuilding(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `了解しました！「${inputValue}」について、FastAPI + Supabase を使用したバックエンドAPIを構築します。以下の手順で進めます：

1. プロジェクト構造の作成
2. FastAPI アプリケーションのセットアップ
3. Supabase データベーススキーマの設計
4. API エンドポイントの実装
5. Docker コンテナ設定
6. GitHub Actions CI/CD パイプライン

Claude Code CLI を使用してコードを生成中...`,
        timestamp: new Date(),
        metadata: {
          status: 'building',
          actions: [
            {
              type: 'pr',
              label: 'PR #123: Initial project setup',
              url: '#',
              description: 'FastAPI project structure and dependencies'
            },
            {
              type: 'migration',
              label: 'Database migration created',
              url: '#',
              description: 'Created initial schema for user management'
            },
            {
              type: 'deploy',
              label: 'Deploy to Supabase Edge Functions',
              url: '#',
              description: 'Preview environment ready'
            }
          ]
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsBuilding(false);

      // Show completion after 3 seconds
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, metadata: { ...msg.metadata, status: 'completed' } }
            : msg
        ));
        
        toast({
          title: "プロジェクトが完成しました！",
          description: "GitHub PR とプレビュー環境が準備されています。",
        });
      }, 3000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "コピーしました",
      description: "テキストがクリップボードにコピーされました。",
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'thinking':
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case 'building':
        return <Play className="h-4 w-4 text-info animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'pr':
        return <GitBranch className="h-4 w-4" />;
      case 'deploy':
        return <Play className="h-4 w-4" />;
      case 'file':
        return <Code className="h-4 w-4" />;
      case 'migration':
        return <Database className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4 bg-card/50 backdrop-blur-sm">
            <h1 className="text-xl font-semibold text-foreground">Claude Code Builder</h1>
            <p className="text-sm text-muted-foreground">自然言語でバックエンドアプリケーションを構築</p>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${
                        message.type === 'user' 
                          ? 'bg-primary/20' 
                          : 'bg-accent/20'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 text-primary" />
                        ) : (
                          <Bot className="h-5 w-5 text-accent" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div className={`p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary/10 border border-primary/20'
                            : 'bg-gradient-card border border-border'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              {message.type === 'user' ? 'You' : 'Claude Code'}
                            </span>
                            <div className="flex items-center space-x-2">
                              {message.metadata?.status && getStatusIcon(message.metadata.status)}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(message.content)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-sm text-foreground whitespace-pre-wrap">
                            {message.content}
                          </div>
                          
                          {message.metadata?.actions && (
                            <div className="mt-4 space-y-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Generated Actions
                              </h4>
                              <div className="space-y-2">
                                {message.metadata.actions.map((action, index) => (
                                  <div key={index} className="p-3 bg-muted/20 rounded-md border border-border">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        {getActionIcon(action.type)}
                                        <span className="text-sm font-medium text-foreground">{action.label}</span>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    {action.description && (
                                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-1 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isBuilding && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-accent/20">
                      <Bot className="h-5 w-5 text-accent" />
                    </div>
                    <div className="p-4 bg-gradient-card border border-border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-pulse-glow h-2 w-2 bg-accent rounded-full" />
                        <span className="text-sm text-foreground">Claude Code is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="バックエンドAPIを作成したいです。FastAPIでユーザー認証機能を..."
                  className="flex-1"
                  disabled={isBuilding}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isBuilding}
                  className="px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Plan
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Code className="h-3 w-3 mr-1" />
                    Build
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Test
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Database className="h-3 w-3 mr-1" />
                    Deploy
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm p-4">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm font-medium text-foreground">E-commerce API</div>
              <div className="text-xs text-muted-foreground">FastAPI + Supabase</div>
              <div className="flex space-x-2 mt-3">
                <Badge variant="outline" className="text-xs">Python</Badge>
                <Badge variant="outline" className="text-xs">FastAPI</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                REST API with Authentication
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                GraphQL API with Subscriptions
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                Microservices Architecture
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                Real-time Chat Backend
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}