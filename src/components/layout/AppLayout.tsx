import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Shield,
  FolderOpen,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTeam } from '../../context/TeamContext';
import { Button } from '../ui/Button';

interface AppLayoutProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentProject, teamMembers } = useTeam();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/app/dashboard',
      icon: LayoutDashboard,
      description: 'Overview of CMMC compliance progress'
    },
    {
      name: 'Control Implementation',
      href: '/app/controls',
      icon: Shield,
      description: 'Implement and track CMMC security controls'
    },
    {
      name: 'Evidence Vault',
      href: '/app/evidence',
      icon: FolderOpen,
      description: 'Manage compliance evidence and documentation'
    },
    {
      name: 'Project Management',
      href: '/app/projects',
      icon: LayoutDashboard,
      description: 'Project roadmaps, milestones, and task tracking'
    },
    {
      name: 'Team Management',
      href: '/app/team',
      icon: Users,
      description: 'Manage team members and role assignments'
    },
    {
      name: 'Document Generation',
      href: '/app/documents',
      icon: FileText,
      description: 'Generate SSP, POA&M, and policy documents'
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link to="/app/dashboard" className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <div>
              <div className="font-bold text-foreground">CMMC Platform</div>
              <div className="text-xs text-muted-foreground">by CyberCorrect</div>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Project Info */}
        {currentProject && (
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="text-xs text-muted-foreground mb-1">Current Project</div>
            <div className="font-medium text-foreground text-sm">{currentProject.name}</div>
            <div className="text-xs text-muted-foreground">CMMC Level {currentProject.cmmcLevel}</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 flex-shrink-0`} />
              <div>
                <div>{item.name}</div>
                <div className={`text-xs ${isActive(item.href) ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Team Members Summary */}
        {teamMembers.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Team Members</div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm font-medium">{teamMembers.length} members</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search controls, evidence, tasks..."
                className="pl-10 pr-4 py-2 w-80 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.role}</div>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-background">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;