import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const AppLayout = ({ children, showSidebar = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};