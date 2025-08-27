import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  ArrowLeft,
  Target,
  Users,
  FileText,
  Clock,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ImplementationGuide = () => {
  const navigate = useNavigate();

  const implementationSteps = [
    {
      phase: 1,
      title: 'Assessment & Gap Analysis',
      duration: '2-4 weeks',
      description: 'Evaluate current compliance posture and identify implementation gaps',
      activities: [
        'Complete CMMC assessment using our platform',
        'Identify compliance gaps and priorities',
        'Estimate implementation effort and timeline',
        'Create initial project roadmap'
      ],
      deliverables: ['Assessment report', 'Gap analysis', 'Implementation roadmap'],
      tools: ['CMMC Assessment Engine', 'Gap Analysis Tool']
    },
    {
      phase: 2,
      title: 'Team Setup & Planning',
      duration: '1-2 weeks',
      description: 'Establish implementation team and define roles and responsibilities',
      activities: [
        'Define team structure and roles',
        'Create RACI matrix for control implementation',
        'Set up project management workflows',
        'Establish communication protocols'
      ],
      deliverables: ['Team charter', 'RACI matrix', 'Project plan'],
      tools: ['Team Management', 'RACI Matrix Generator', 'Project Roadmaps']
    },
    {
      phase: 3,
      title: 'Control Implementation',
      duration: '12-24 weeks',
      description: 'Systematically implement CMMC security controls',
      activities: [
        'Implement Level 1 foundational controls',
        'Implement Level 2 advanced controls',
        'Configure technical security measures',
        'Develop policies and procedures'
      ],
      deliverables: ['Implemented controls', 'Security configurations', 'Policy documents'],
      tools: ['Control Implementation Tracker', 'Policy Generator', 'Evidence Vault']
    },
    {
      phase: 4,
      title: 'Documentation & Evidence',
      duration: '4-8 weeks',
      description: 'Create required CMMC documentation and collect evidence',
      activities: [
        'Generate System Security Plan (SSP)',
        'Create Plan of Action & Milestones (POA&M)',
        'Collect and organize implementation evidence',
        'Prepare assessment artifacts'
      ],
      deliverables: ['SSP document', 'POA&M document', 'Evidence collection'],
      tools: ['SSP Generator', 'POA&M Generator', 'Evidence Management']
    },
    {
      phase: 5,
      title: 'Assessment Preparation',
      duration: '2-4 weeks',
      description: 'Prepare for CMMC assessment and certification',
      activities: [
        'Conduct internal readiness review',
        'Address any remaining gaps',
        'Schedule third-party assessment',
        'Final evidence organization'
      ],
      deliverables: ['Readiness report', 'Assessment schedule', 'Final documentation'],
      tools: ['Assessment Readiness Check', 'Final Review Tools']
    }
  ];

  const teamRoles = [
    {
      role: 'Project Manager',
      responsibilities: [
        'Overall project coordination',
        'Timeline and milestone management',
        'Resource allocation',
        'Stakeholder communication'
      ],
      skills: ['Project management', 'CMMC knowledge', 'Communication'],
      timeCommitment: '25-50% during implementation'
    },
    {
      role: 'Information Systems Security Officer (ISSO)',
      responsibilities: [
        'Security control assessment',
        'Implementation validation',
        'Security policy development',
        'Risk management oversight'
      ],
      skills: ['Security expertise', 'NIST frameworks', 'Risk assessment'],
      timeCommitment: '50-75% during implementation'
    },
    {
      role: 'Control Implementers',
      responsibilities: [
        'Technical control implementation',
        'System configuration',
        'Evidence collection',
        'Testing and validation'
      ],
      skills: ['Technical expertise', 'System administration', 'Security tools'],
      timeCommitment: '75-100% during active implementation'
    },
    {
      role: 'Evidence Manager',
      responsibilities: [
        'Evidence collection coordination',
        'Document organization',
        'Audit trail maintenance',
        'Compliance tracking'
      ],
      skills: ['Document management', 'Compliance procedures', 'Attention to detail'],
      timeCommitment: '25-50% throughout project'
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
          <h1 className="text-4xl font-bold mb-4 text-foreground">CMMC Implementation Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Step-by-step guide for implementing CMMC 2.0 requirements in your organization
          </p>
        </div>

        {/* Implementation Phases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Implementation Phases</h2>
          <div className="space-y-8">
            {implementationSteps.map((step) => (
              <Card key={step.phase} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                          {step.phase}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {step.duration}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Activities</h4>
                          <ul className="space-y-2">
                            {step.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Deliverables</h4>
                          <ul className="space-y-2 mb-4">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-start">
                                <FileText className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-foreground">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <h4 className="font-semibold text-foreground mb-3">Platform Tools</h4>
                          <ul className="space-y-1">
                            {step.tools.map((tool, idx) => (
                              <li key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block mr-1 mb-1">
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Roles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">CMMC Implementation Team Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamRoles.map((role) => (
              <Card key={role.role}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{role.role}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Time Commitment: </span>
                    <span className="text-muted-foreground">{role.timeCommitment}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Ready to Start Implementation?</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Use our comprehensive platform to guide your CMMC implementation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg">
                Start CMMC Assessment
                <Target className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/team">
              <Button size="lg" variant="outline">
                Setup Implementation Team
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationGuide;