import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Shield,
  Award,
  Target,
  Users,
  ArrowLeft
} from 'lucide-react';

const Documentation = () => {
  const categories = [
    {
      icon: Shield,
      title: "CMMC 2.0 Guide",
      description: "Complete guide to CMMC 2.0 requirements and implementation",
      articles: [
        { title: "CMMC 2.0 Overview", path: "/documentation/cmmc-guide" },
        { title: "Level Requirements", path: "/documentation/cmmc-guide" },
        { title: "Assessment Process", path: "/documentation/cmmc-guide" },
        { title: "Certification Path", path: "/documentation/cmmc-guide" }
      ]
    },
    {
      icon: Award,
      title: "NIST SP 800-171",
      description: "Implementation guidance for NIST SP 800-171 security requirements", 
      articles: [
        { title: "Control Family Overview", path: "/documentation/nist-800-171-guide" },
        { title: "Implementation Guide", path: "/documentation/nist-800-171-guide" },
        { title: "Evidence Requirements", path: "/documentation/nist-800-171-guide" },
        { title: "Assessment Procedures", path: "/documentation/nist-800-171-guide" }
      ]
    },
    {
      icon: Target,
      title: "Implementation Guide",
      description: "Step-by-step implementation guidance and best practices",
      articles: [
        { title: "Getting Started", path: "/documentation/implementation-guide" },
        { title: "Team Setup", path: "/documentation/implementation-guide" },
        { title: "Control Implementation", path: "/documentation/implementation-guide" },
        { title: "Documentation Requirements", path: "/documentation/implementation-guide" }
      ]
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Guide for managing CMMC implementation teams",
      articles: [
        { title: "Role Definitions", path: "/documentation/implementation-guide" },
        { title: "Responsibility Assignment", path: "/documentation/implementation-guide" },
        { title: "Collaboration Best Practices", path: "/documentation/implementation-guide" },
        { title: "Project Management", path: "/documentation/implementation-guide" }
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">CMMC Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guides and resources for CMMC 2.0 compliance implementation
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search CMMC documentation..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <category.icon className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-foreground">{category.title}</h2>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link 
                        to={article.path} 
                        className="text-primary hover:text-primary/80 text-sm flex items-center"
                      >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link to={category.articles[0].path}>
                  <Button variant="outline" className="w-full">
                    View Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Need Additional Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our CMMC experts are available to provide personalized guidance for your compliance journey
          </p>
          <Link to="/about">
            <Button size="lg">
              Contact CMMC Experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Documentation;