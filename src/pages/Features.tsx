import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  Shield, 
  CheckCircle, 
  Target, 
  Users, 
  BarChart3, 
  FileCheck, 
  Award, 
  Settings, 
  Database, 
  Network, 
  Globe
} from 'lucide-react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  const featureCategories = {
    assessment: {
      title: 'CMMC Assessment Engine',
      description: 'Comprehensive CMMC compliance evaluation and gap analysis',
      features: [
        {
          icon: Target,
          title: 'Multi-Level Assessment',
          description: 'Complete assessment coverage for CMMC Levels 1, 2, and 3 with automated scoring',
          benefits: ['Level 1: 17 foundational practices', 'Level 2: 110 NIST SP 800-171 controls', 'Level 3: Enhanced requirements', 'Automated gap identification']
        },
        {
          icon: BarChart3,
          title: 'Intelligent Gap Analysis',
          description: 'AI-powered analysis identifies compliance gaps and provides prioritized remediation roadmap',
          benefits: ['Risk-based prioritization', 'Cost-benefit analysis', 'Timeline estimation', 'Resource planning']
        },
        {
          icon: Award,
          title: 'Certification Readiness',
          description: 'Evaluate your readiness for CMMC certification with detailed scoring and recommendations',
          benefits: ['Certification probability scoring', 'Assessor-ready documentation', 'Evidence organization', 'Compliance tracking']
        }
      ]
    },
    implementation: {
      title: 'Control Implementation Management',
      description: 'Step-by-step guidance for implementing CMMC security controls',
      features: [
        {
          icon: Shield,
          title: 'Control Implementation Tracker',
          description: 'Track implementation progress for all 110 NIST SP 800-171 security controls',
          benefits: ['Control family organization', 'Implementation guidance', 'Progress tracking', 'Evidence linking']
        },
        {
          icon: Users,
          title: 'Role-Based Workflows',
          description: 'Assign controls to team members based on their roles and expertise',
          benefits: ['RACI matrix automation', 'Task assignment', 'Progress monitoring', 'Collaboration tools']
        },
        {
          icon: Database,
          title: 'Evidence Management',
          description: 'Centralized vault for storing and organizing compliance evidence',
          benefits: ['Secure file storage', 'Version control', 'Audit trail', 'Quick retrieval']
        }
      ]
    },
    collaboration: {
      title: 'Team Collaboration & Project Management',
      description: 'Full project management capabilities for CMMC implementation teams',
      features: [
        {
          icon: Network,
          title: 'Project Roadmaps',
          description: 'Visual roadmaps showing implementation phases, milestones, and dependencies',
          benefits: ['Gantt chart views', 'Milestone tracking', 'Dependency management', 'Timeline visualization']
        },
        {
          icon: Settings,
          title: 'Work Breakdown Structure (WBS)',
          description: 'Automatically generate WBS for CMMC implementation based on selected controls',
          benefits: ['Hierarchical task breakdown', 'Effort estimation', 'Resource allocation', 'Progress tracking']
        },
        {
          icon: Users,
          title: 'RACI Matrix Management',
          description: 'Define and manage responsibility assignments for each security control',
          benefits: ['Clear role definition', 'Accountability tracking', 'Communication planning', 'Conflict resolution']
        }
      ]
    },
    documentation: {
      title: 'Automated Documentation Generation',
      description: 'Generate CMMC-required documentation automatically from your implementation',
      features: [
        {
          icon: FileCheck,
          title: 'System Security Plan (SSP)',
          description: 'Auto-generate comprehensive SSP documents from your control implementations',
          benefits: ['NIST 800-171 aligned', 'Control narrative generation', 'Evidence integration', 'Version control']
        },
        {
          icon: Target,
          title: 'Plan of Action & Milestones (POA&M)',
          description: 'Automatically create POA&M documents from identified gaps and planned remediation',
          benefits: ['Gap-based generation', 'Timeline planning', 'Resource allocation', 'Progress tracking']
        },
        {
          icon: Shield,
          title: 'Policy & Procedure Templates',
          description: 'Generate security policies and procedures aligned with CMMC requirements',
          benefits: ['CMMC-aligned templates', 'Customizable content', 'Version management', 'Approval workflows']
        }
      ]
    }
  };

  const currentTab = featureCategories[activeTab as keyof typeof featureCategories];

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 bg-grid opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8">
              <span className="bg-blue-100 text-blue-700 dark:bg-dark-primary/10 dark:text-dark-primary px-6 py-3 rounded-full inline-flex items-center text-sm font-semibold tracking-wide uppercase animate-fade-in">
                <Award className="w-4 h-4 mr-2" />
                CMMC 2.0 Platform Features
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Complete <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">CMMC Implementation</span> Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              From assessment to certification - everything you need for CMMC compliance
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/assessment">
                <Button size="lg" className="enhanced-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                  Start Assessment
                  <Target className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/app/dashboard">
                <Button size="lg" variant="outline" className="hover:-translate-y-1 transition-transform px-8 py-4 text-lg font-semibold">
                  View Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories with Tabs */}
      <section className="py-24 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {Object.entries(featureCategories).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-lg ${
                    activeTab === key 
                      ? 'bg-blue-600 text-white shadow-xl scale-105' 
                      : 'bg-white dark:bg-dark-surface text-foreground hover:bg-gray-100 dark:hover:bg-dark-support shadow-md'
                  }`}
                >
                  {key === 'assessment' && <Target className="w-4 h-4" />}
                  {key === 'implementation' && <Shield className="w-4 h-4" />}
                  {key === 'collaboration' && <Users className="w-4 h-4" />}
                  {key === 'documentation' && <FileText className="w-4 h-4" />}
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              <div className="text-center mb-16">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {currentTab.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {currentTab.description}
                </p>
              </div>

              <div className="grid gap-8">
                {currentTab.features.map((feature, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-10">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-semibold mb-4 text-foreground">
                            {feature.title}
                          </h4>
                          <p className="text-lg text-muted-foreground mb-6">
                            {feature.description}
                          </p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {feature.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-dark-primary dark:to-dark-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Experience the Complete CMMC Platform
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Start your CMMC compliance journey with our comprehensive assessment and implementation tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment" className="no-underline">
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white font-semibold shadow-lg"
                >
                  Start Free Assessment
                  <Target className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="no-underline">
                <Button 
                  className="bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900 font-semibold shadow-lg"
                >
                  View Platform Demo
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

export default Features;