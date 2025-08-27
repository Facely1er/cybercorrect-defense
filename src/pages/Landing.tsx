import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Award,
  Target,
  Users,
  BarChart3,
  FileCheck,
  Database,
  Globe
} from 'lucide-react';

const Landing = () => {

  const userPaths = [
    {
      id: 'solo',
      title: 'Solo Implementation',
      subtitle: 'Individual CMMC compliance journey',
      description: 'Streamlined assessment and implementation process for individual professionals managing CMMC compliance.',
      icon: Target,
      color: 'from-blue-600 to-cyan-600',
      features: [
        'Self-paced CMMC assessment',
        'Personal compliance dashboard',
        'Automated document generation',
        'Progress tracking and milestones'
      ],
      path: '/assessment?mode=solo'
    },
    {
      id: 'team',
      title: 'Team Implementation',
      subtitle: 'Collaborative CMMC compliance program',
      description: 'Full project management capabilities with role-based responsibilities and collaborative workflows.',
      icon: Users,
      color: 'from-green-600 to-emerald-600',
      features: [
        'Role-based team assignments',
        'Collaborative project planning',
        'Evidence management workflows',
        'Team progress tracking'
      ],
      path: '/app/dashboard'
    }
  ];

  const cmmcLevels = [
    {
      level: 1,
      title: 'Foundational',
      description: 'Basic cyber hygiene practices',
      controls: 17,
      assessment: 'Annual self-assessment',
      suitable: 'Organizations handling Federal Contract Information (FCI)'
    },
    {
      level: 2,
      title: 'Advanced',
      description: 'Intermediate cyber hygiene practices',
      controls: 110,
      assessment: 'Self or third-party assessment',
      suitable: 'Organizations handling Controlled Unclassified Information (CUI)'
    },
    {
      level: 3,
      title: 'Expert',
      description: 'Good cyber hygiene practices',
      controls: '110+',
      assessment: 'Government-led assessment',
      suitable: 'Organizations requiring protection against Advanced Persistent Threats (APTs)'
    }
  ];

  const platformBenefits = [
    {
      icon: Shield,
      title: 'CMMC Assessment Engine',
      description: 'Comprehensive evaluation against CMMC 2.0 requirements with automated gap analysis'
    },
    {
      icon: FileCheck,
      title: 'Control Implementation Tracking',
      description: 'Step-by-step guidance for implementing security controls with progress monitoring'
    },
    {
      icon: Database,
      title: 'Evidence Management',
      description: 'Centralized repository for compliance evidence with audit-ready organization'
    },
    {
      icon: BarChart3,
      title: 'Project Management',
      description: 'Full project management capabilities with RACI matrices, roadmaps, and WBS'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 bg-grid opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-8 animate-fade-in">
              <span className="bg-blue-100 text-blue-700 dark:bg-dark-primary/10 dark:text-dark-primary px-6 py-3 rounded-full inline-flex items-center text-sm font-semibold tracking-wide uppercase">
                <Award className="w-4 h-4 mr-2" />
                CMMC 2.0 Compliance Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Your Path to <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">CMMC Certification</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive CMMC 2.0 compliance platform with assessment, implementation tracking, 
              evidence management, and team collaboration capabilities
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/assessment" className="no-underline">
                <Button 
                  size="lg"
                  className="enhanced-button bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold text-white"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Start CMMC Assessment
                </Button>
              </Link>
              <Link to="/app/dashboard" className="no-underline">
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-white dark:border-gray-800 px-6 py-3 font-semibold shadow-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Access Team Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Path Selection */}
      <section className="py-24 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Choose Your CMMC Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the approach that best fits your organization's structure and needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {userPaths.map((path) => (
              <Card key={path.id} className="relative overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-0 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <CardContent className="relative p-10">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center mr-4`}>
                      <path.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{path.title}</h3>
                      <p className="text-muted-foreground">{path.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{path.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
                    <div className="space-y-2">
                      {path.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link to={path.path} className="no-underline">
                    <Button className={`w-full bg-gradient-to-r ${path.color} text-white hover:shadow-lg hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold`}>
                      Start {path.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CMMC Levels Overview */}
      <section className="py-24 bg-muted/20 dark:bg-dark-support/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              CMMC 2.0 Levels
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the three levels of CMMC 2.0 certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cmmcLevels.map((level, index) => (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">L{level.level}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{level.title}</h3>
                  <p className="text-muted-foreground mb-4">{level.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted/30 p-2 rounded">
                      <span className="font-medium">{level.controls} Controls</span>
                    </div>
                    <div className="bg-muted/30 p-2 rounded">
                      <span className="font-medium">{level.assessment}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">{level.suitable}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-24 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Complete CMMC Implementation Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for CMMC compliance from assessment to certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {platformBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-dark-primary dark:to-dark-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-white/90">Organizations Certified</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <p className="text-white/90">Faster Implementation</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$250K</div>
              <p className="text-white/90">Average Cost Savings</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-white/90">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-muted/20 dark:bg-dark-support/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Achieve CMMC Certification?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Start your CMMC compliance journey today with our comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment" className="no-underline">
                <Button 
                  size="lg" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 font-semibold shadow-lg"
                >
                  Start Free Assessment
                  <Shield className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="no-underline">
                <Button 
                  size="lg" 
                  className="bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900 px-6 py-3 font-semibold shadow-lg"
                >
                  View Demo
                  <Globe className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;