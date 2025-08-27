import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  CheckCircle,
  ArrowLeft,
  FileText,
  Target,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Nist800171Guide = () => {
  const navigate = useNavigate();

  const controlFamilies = [
    {
      code: 'AC',
      name: 'Access Control',
      controls: 22,
      description: 'Controls for limiting system access to authorized users, processes, and devices'
    },
    {
      code: 'AT',
      name: 'Awareness and Training',
      controls: 3,
      description: 'Ensuring personnel are aware of security risks and trained appropriately'
    },
    {
      code: 'AU',
      name: 'Audit and Accountability',
      controls: 9,
      description: 'Creating, protecting, and retaining information system audit records'
    },
    {
      code: 'CA',
      name: 'Security Assessment',
      controls: 7,
      description: 'Periodic assessment of security controls and remediation of deficiencies'
    },
    {
      code: 'CM',
      name: 'Configuration Management',
      controls: 9,
      description: 'Establishing and maintaining baseline configurations'
    },
    {
      code: 'CP',
      name: 'Contingency Planning',
      controls: 4,
      description: 'Planning for emergency response, backup operations, and post-disaster recovery'
    },
    {
      code: 'IA',
      name: 'Identification and Authentication',
      controls: 11,
      description: 'Identifying users, processes, and devices before granting access'
    },
    {
      code: 'IR',
      name: 'Incident Response',
      controls: 3,
      description: 'Establishing operational incident-handling capability'
    },
    {
      code: 'MA',
      name: 'Maintenance',
      controls: 6,
      description: 'Performing periodic and timely maintenance on systems and components'
    },
    {
      code: 'MP',
      name: 'Media Protection',
      controls: 8,
      description: 'Protecting system media (digital and non-digital)'
    },
    {
      code: 'PE',
      name: 'Physical and Environmental Protection',
      controls: 6,
      description: 'Physical access controls and environmental safeguards'
    },
    {
      code: 'PS',
      name: 'Personnel Security',
      controls: 2,
      description: 'Ensuring individuals are trustworthy and meet established security criteria'
    },
    {
      code: 'RA',
      name: 'Risk Assessment',
      controls: 3,
      description: 'Assessing risk to organizational operations and assets'
    },
    {
      code: 'SA',
      name: 'System and Services Acquisition',
      controls: 4,
      description: 'Allocating resources to adequately protect information systems'
    },
    {
      code: 'SC',
      name: 'System and Communications Protection',
      controls: 23,
      description: 'Monitoring, controlling, and protecting organizational communications'
    },
    {
      code: 'SI',
      name: 'System and Information Integrity',
      controls: 7,
      description: 'Identifying, reporting, and correcting information system flaws'
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
          <h1 className="text-4xl font-bold mb-4 text-foreground">NIST SP 800-171 Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete guide to implementing NIST SP 800-171 security requirements for CMMC Level 2 compliance
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About NIST SP 800-171</h2>
                <p className="text-muted-foreground mb-4">
                  NIST Special Publication 800-171 provides guidelines for protecting the confidentiality of Controlled Unclassified Information (CUI) in nonfederal information systems and organizations.
                </p>
                <p className="text-muted-foreground">
                  These 110 security requirements form the foundation of CMMC Level 2 certification and are essential for defense contractors handling CUI.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Key Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Total Requirements</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">110</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Control Families</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">CMMC Level</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">Level 2</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Families */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">NIST 800-171 Control Families</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlFamilies.map((family) => (
              <Card key={family.code} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">{family.code}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{family.name}</h3>
                      <p className="text-sm text-muted-foreground">{family.controls} controls</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{family.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Controls
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Approach */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Implementation Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">1. Assess Current State</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate your current implementation status for each of the 110 requirements
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2. Implement Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Systematically implement security controls based on priority and dependencies
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">3. Document & Verify</h3>
                <p className="text-sm text-muted-foreground">
                  Generate required documentation and collect evidence for assessment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Start Your NIST 800-171 Implementation</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Use our platform to assess your current state and implement the required security controls
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment?level=2">
              <Button size="lg">
                Start NIST 800-171 Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app/controls">
              <Button size="lg" variant="outline">
                View Control Implementation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nist800171Guide;