import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  ArrowLeft,
  Award,
  Target,
  Building,
  Clock,
  Info,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CmmcGuide = () => {
  const navigate = useNavigate();

  const cmmcLevels = [
    {
      level: 1,
      title: 'Level 1 - Foundational',
      description: 'Basic cyber hygiene practices',
      practices: 17,
      focus: 'Federal Contract Information (FCI)',
      assessment: 'Annual self-assessment',
      timeline: '2-4 weeks implementation',
      keyPractices: [
        'Basic access control',
        'User identification', 
        'Media protection',
        'Physical protection',
        'System integrity'
      ]
    },
    {
      level: 2,
      title: 'Level 2 - Advanced',
      description: 'Intermediate cyber hygiene practices', 
      practices: 110,
      focus: 'Controlled Unclassified Information (CUI)',
      assessment: 'Self-assessment or third-party assessment',
      timeline: '6-12 months implementation',
      keyPractices: [
        'All NIST SP 800-171 controls',
        'Comprehensive access control',
        'Incident response capability',
        'Configuration management',
        'Risk assessment'
      ]
    },
    {
      level: 3,
      title: 'Level 3 - Expert',
      description: 'Good cyber hygiene practices',
      practices: '110+',
      focus: 'Advanced Persistent Threat (APT) protection',
      assessment: 'Government-led assessment',
      timeline: '12-18 months implementation',
      keyPractices: [
        'Enhanced controls from NIST SP 800-172',
        'Advanced threat protection',
        'Supply chain security',
        'Enhanced monitoring',
        'Threat hunting capabilities'
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: 1,
      name: 'Assessment & Planning',
      duration: '2-4 weeks',
      activities: [
        'Complete CMMC assessment',
        'Identify compliance gaps',
        'Develop implementation roadmap',
        'Assign team roles and responsibilities'
      ]
    },
    {
      phase: 2,
      name: 'Control Implementation',
      duration: '8-16 weeks',
      activities: [
        'Implement security controls',
        'Configure technical systems',
        'Develop policies and procedures',
        'Train staff on new processes'
      ]
    },
    {
      phase: 3,
      name: 'Documentation & Evidence',
      duration: '4-8 weeks',
      activities: [
        'Generate System Security Plan (SSP)',
        'Create Plan of Action & Milestones (POA&M)',
        'Collect and organize evidence',
        'Prepare for assessment'
      ]
    },
    {
      phase: 4,
      name: 'Assessment & Certification',
      duration: '2-6 weeks',
      activities: [
        'Conduct final self-assessment',
        'Schedule third-party assessment (if required)',
        'Address any findings',
        'Achieve CMMC certification'
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/documentation')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documentation
        </Button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">CMMC 2.0 Complete Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to understand and implement CMMC 2.0 requirements
          </p>
        </div>

        {/* CMMC Overview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Understanding CMMC 2.0</h2>
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="h-6 w-6 text-primary mr-2" />
                    What is CMMC 2.0?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The Cybersecurity Maturity Model Certification (CMMC) 2.0 is a framework designed to protect sensitive unclassified information shared by the Department of Defense (DoD) with its contractors and subcontractors.
                  </p>
                  <p className="text-muted-foreground">
                    CMMC 2.0 combines various cybersecurity standards and best practices and provides the DoD with increased assurance that contractors can adequately protect sensitive information.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="h-6 w-6 text-primary mr-2" />
                    Why CMMC 2.0 Matters
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Required for DoD contracts handling CUI</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Protects sensitive defense information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Enhances overall cybersecurity posture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Demonstrates commitment to security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CMMC Levels */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">CMMC 2.0 Levels</h2>
          <div className="space-y-8">
            {cmmcLevels.map((level) => (
              <Card key={level.level} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">L{level.level}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{level.title}</h3>
                          <p className="text-muted-foreground">{level.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-muted/30 p-3 rounded">
                          <div className="text-sm font-medium text-foreground">{level.practices} Practices</div>
                          <div className="text-xs text-muted-foreground">Security controls</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded">
                          <div className="text-sm font-medium text-foreground">{level.assessment}</div>
                          <div className="text-xs text-muted-foreground">Assessment type</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded">
                          <div className="text-sm font-medium text-foreground">{level.timeline}</div>
                          <div className="text-xs text-muted-foreground">Typical timeline</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Focus Area</h4>
                          <p className="text-sm text-muted-foreground mb-4">{level.focus}</p>
                          
                          <h4 className="font-semibold text-foreground mb-3">Key Practices</h4>
                          <ul className="space-y-2">
                            {level.keyPractices.map((practice, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground">{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                              Ready to assess Level {level.level}?
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                              Evaluate your organization's readiness for CMMC Level {level.level} certification
                            </p>
                            <Link to={`/assessment?level=${level.level}`}>
                              <Button size="sm" className="w-full">
                                Start Level {level.level} Assessment
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">CMMC Implementation Phases</h2>
          <div className="space-y-6">
            {implementationPhases.map((phase) => (
              <Card key={phase.phase}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {phase.phase}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-foreground">{phase.name}</h3>
                        <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Key Activities</h4>
                          <ul className="space-y-2">
                            {phase.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">Platform Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Our platform provides specific tools and workflows to support each phase of your CMMC implementation journey.
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">
                            View Phase Tools
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Start Your CMMC Implementation</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Use our comprehensive platform to assess, implement, and maintain CMMC compliance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg">
                Start CMMC Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/dashboard">
              <Button size="lg" variant="outline">
                Access Team Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmmcGuide;