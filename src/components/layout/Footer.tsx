import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone,
  FileText,
  Shield,
  Target,
  BookOpen,
  Info
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');
  
  // Simplified footer for app routes
  if (isAppRoute) {
    return (
      <footer className="bg-surface border-t border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} CyberCorrect CMMC Platform. All rights reserved.
            </p>
            <div className="flex mt-2 md:mt-0 space-x-4">
              <Link to="/documentation" className="text-xs text-muted-foreground hover:text-primary">Documentation</Link>
              <Link to="/about" className="text-xs text-muted-foreground hover:text-primary">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <div className="font-bold text-foreground">CMMC Platform</div>
                <div className="text-xs text-muted-foreground">by CyberCorrect</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Complete CMMC 2.0 compliance platform for defense contractors and organizations handling CUI.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (240) 599-0102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">contact@ermits.com</span>
              </div>
            </div>
          </div>
          
          {/* CMMC Resources */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">CMMC Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/assessment" className="text-muted-foreground hover:text-primary flex items-center"><Target className="h-3.5 w-3.5 mr-2" />CMMC Assessment</Link></li>
              <li><Link to="/assessment/quick-check" className="text-muted-foreground hover:text-primary flex items-center"><Shield className="h-3.5 w-3.5 mr-2" />Quick Check</Link></li>
              <li><Link to="/documentation/cmmc-guide" className="text-muted-foreground hover:text-primary flex items-center"><BookOpen className="h-3.5 w-3.5 mr-2" />CMMC 2.0 Guide</Link></li>
              <li><Link to="/documentation/nist-800-171-guide" className="text-muted-foreground hover:text-primary flex items-center"><FileText className="h-3.5 w-3.5 mr-2" />NIST 800-171 Guide</Link></li>
            </ul>
          </div>
          
          {/* Platform Features */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link to="/demo" className="text-muted-foreground hover:text-primary">Demo</Link></li>
              <li><Link to="/documentation" className="text-muted-foreground hover:text-primary">Documentation</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary flex items-center"><Info className="h-3.5 w-3.5 mr-2" />About</Link></li>
              <li><a href="mailto:contact@ermits.com" className="text-muted-foreground hover:text-primary flex items-center"><Mail className="h-3.5 w-3.5 mr-2" />Contact</a></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="py-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CyberCorrect CMMC Platform. All rights reserved. | 
            Designed specifically for CMMC 2.0 compliance and defense contractor requirements.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;