import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Terminal, 
  Code2, 
  Database, 
  Zap, 
  GitBranch,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Terminal,
      title: "Chat-Driven Development",
      description: "自然言語でバックエンドAPIを設計・実装",
      badge: "Claude Code"
    },
    {
      icon: Database,
      title: "Supabase Integration",
      description: "自動プロビジョニング＆マイグレーション",
      badge: "Auto Deploy"
    },
    {
      icon: GitBranch,
      title: "GitHub Workflow",
      description: "PR作成からレビューまで完全自動化",
      badge: "CI/CD"
    },
    {
      icon: Zap,
      title: "Python & Jupyter",
      description: "データ処理・分析コードをブラウザで実行",
      badge: "JupyterLite"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Lovable-for-Backend</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Development Platform</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link to="/chat">
                  <Terminal className="h-4 w-4 mr-2" />
                  Start Building
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Claude Code CLI
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            チャットで<span className="bg-gradient-primary bg-clip-text text-transparent">バックエンド</span>を構築
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            自然言語プロンプトから、FastAPI・Supabase・Docker を活用した
            本格的なバックエンドアプリケーションを自動生成。
            GitHub PR から本番デプロイまで、すべてを AI がサポートします。
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" asChild>
              <Link to="/chat">
                <Terminal className="h-5 w-5 mr-2" />
                今すぐ始める
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                プロジェクト一覧
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-primary/20 rounded-lg w-fit mb-4 group-hover:shadow-primary transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs w-fit mx-auto mb-2">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-card border-border max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">3分で始める</CardTitle>
            <CardDescription>
              簡単なプロンプトでバックエンドAPIを構築してみましょう
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="mx-auto p-3 bg-success/20 rounded-full w-fit">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">1. プロンプト入力</h3>
                <p className="text-sm text-muted-foreground">
                  「ユーザー認証付きのREST APIを作って」
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto p-3 bg-warning/20 rounded-full w-fit">
                  <Code2 className="h-6 w-6 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">2. AI生成</h3>
                <p className="text-sm text-muted-foreground">
                  Claude Codeが最適なアーキテクチャで実装
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto p-3 bg-primary/20 rounded-full w-fit">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">3. 自動デプロイ</h3>
                <p className="text-sm text-muted-foreground">
                  GitHub PR & Supabase環境が自動構築
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/chat">
                  <Terminal className="h-5 w-5 mr-2" />
                  チャットを開始
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
