import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Target, 
  Clock,
  Award,
  Building,
  Info
} from 'lucide-react';

const CmmcAssessmentStart = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'solo' | 'team' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | null>(null);

  const assessmentModes = [
    {
      id: 'solo' as const,
      title: 'Solo Assessment',
      description: 'Individual assessment for streamlined compliance journey',
      icon: Target,
      features: [
        'Self-paced assessment',
        'Automated gap analysis',
        'Personal action plan',
        'Document templates'
      ],
      timeEstimate: '2-3 hours',
      deliverables: 'Assessment report, gap analysis, action plan'
    },
    {
      id: 'team' as const,
      title: 'Team Assessment',
      description: 'Collaborative assessment with role-based responsibilities',
      icon: Users,
      features: [
        'Role-based assessment sections',
        'Collaborative evidence collection',
        'Team project planning',
        'Responsibility assignment'
      ],
      timeEstimate: '4-6 hours (distributed)',
      deliverables: 'Comprehensive project plan, RACI matrix, team roadmap'
    }
  ];

  const cmmcLevels = [
    {
      level: 1 as const,
      title: 'Level 1 - Foundational',
      description: 'Basic cyber hygiene practices',
      controls: 17,
      focus: 'Federal Contract Information (FCI)',
      assessment: 'Annual self-assessment'
    },
    {
      level: 2 as const,
      title: 'Level 2 - Advanced', 
      description: 'Intermediate cyber hygiene practices',
      controls: 110,
      focus: 'Controlled Unclassified Information (CUI)',
      assessment: 'Self-assessment or third-party assessment'
    },
    {
      level: 3 as const,
      title: 'Level 3 - Expert',
      description: 'Good cyber hygiene practices',
      controls: '110+',
      focus: 'Protection against Advanced Persistent Threats',
      assessment: 'Government-led assessment'
    }
  ];

  const handleStartAssessment = () => {
    if (!selectedMode || !selectedLevel) return;
    
    const params = new URLSearchParams({
      mode: selectedMode,
      level: selectedLevel.toString()
    });
    
    if (selectedLevel === 1) {
      navigate(`/assessment/level-1?${params}`);
    } else if (selectedLevel === 2) {
      navigate(`/assessment/level-2?${params}`);
    } else {
      navigate(`/assessment/level-2?${params}`); // Level 3 uses Level 2 base + additional requirements
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">CMMC 2.0 Assessment</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Evaluate your organization's readiness for CMMC certification and create your implementation plan
          </p>
        </div>

        {/* Assessment Mode Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Choose Assessment Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessmentModes.map((mode) => (
              <Card 
                key={mode.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMode === mode.id ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                      <mode.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{mode.title}</h3>
                      <p className="text-muted-foreground">{mode.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {mode.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/30 p-3 rounded">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Time</span>
                      </div>
                      <div className="font-medium">{mode.timeEstimate}</div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded">
                      <div className="flex items-center text-muted-foreground">
                        <FileCheck className="w-4 h-4 mr-1" />
                        <span>Output</span>
                      </div>
                      <div className="font-medium text-xs">{mode.deliverables}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CMMC Level Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Select Target CMMC Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cmmcLevels.map((level) => (
              <Card 
                key={level.level} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === level.level ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setSelectedLevel(level.level)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">L{level.level}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{level.title}</h3>
                    <p className="text-muted-foreground text-sm">{level.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-muted/30 p-3 rounded text-center">
                      <div className="font-bold text-foreground">{level.controls}</div>
                      <div className="text-xs text-muted-foreground">Security Controls</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Focus Area</div>
                      <div className="text-sm font-medium text-foreground">{level.focus}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Assessment Type</div>
                      <div className="text-sm font-medium text-foreground">{level.assessment}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Assessment Information */}
        <div className="mb-8">
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What to Expect</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Assessment Process</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Answer questions about your current security practices</li>
                        <li>• Provide evidence of control implementation where applicable</li>
                        <li>• Review automated gap analysis and recommendations</li>
                        <li>• Receive your personalized implementation roadmap</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">After Assessment</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Detailed compliance score and gap analysis</li>
                        <li>• Prioritized remediation recommendations</li>
                        <li>• Generated SSP and POA&M templates</li>
                        <li>• Project timeline and resource estimates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleStartAssessment}
            disabled={!selectedMode || !selectedLevel}
            className="px-12 py-4 text-lg"
          >
            Start CMMC Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {(!selectedMode || !selectedLevel) && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select both assessment mode and target CMMC level to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmmcAssessmentStart;