import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Award, 
  Info, 
  BookOpen, 
  User, 
  Sun, 
  Moon, 
  Home,
  Target,
  Users,
  FileText
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Button } from '../ui/Button';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';

interface LandingLayoutProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const LandingLayout = ({ toggleDarkMode, darkMode }: LandingLayoutProps) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Listen for scroll to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'Assessment',
      path: '/assessment',
      icon: Target
    },
    {
      name: 'Features', 
      path: '/features',
      icon: Award
    },
    {
      name: 'Documentation',
      path: '/documentation',
      icon: BookOpen
    },
    {
      name: 'Pricing',
      path: '/pricing',
      icon: FileText
    },
    {
      name: 'Demo',
      path: '/demo',
      icon: Shield
    },
    {
      name: 'About',
      path: '/about', 
      icon: Info
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <nav className={`fixed top-0 left-0 right-0 z-20 bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <div>
                  <div className="font-bold text-foreground">CMMC Platform</div>
                  <div className="text-xs text-muted-foreground">by CyberCorrect</div>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map(item => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={`flex items-center text-foreground hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path ? 'text-primary' : ''
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
              
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-foreground hover:text-primary transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <Link to={user ? "/app/dashboard" : "/login"}>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <User className="h-4 w-4 mr-2" />
                  {user ? 'Dashboard' : 'Login'}
                </Button>
              </Link>
              
              <button
                type="button"
                className="lg:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`lg:hidden absolute top-16 left-0 right-0 bg-surface dark:bg-dark-surface border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-4 py-2 space-y-1">
            {mainNavItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                  location.pathname === item.path 
                    ? 'text-primary bg-primary/5' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingLayout;