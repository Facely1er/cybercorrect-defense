import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Play,
  Pause,
  Building2,
  Award,
  Calculator,
  Eye,
  Users,
  FileCheck,
  Database,
  Lock,
  Shield,
  ClipboardCheck,
  HelpCircle,
  AlertTriangle,
  BarChart2
} from 'lucide-react';
import { toast } from '../lib/toast';
import { useChatbot } from '../hooks/useChatbot';

// Import demo components
import AssessmentDemo from '../components/demo/AssessmentDemo';
import DashboardDemo from '../components/demo/DashboardDemo';
import FrameworkDemo from '../components/demo/FrameworkDemo';
import RecommendationsDemo from '../components/demo/RecommendationsDemo';
import SensitiveInfoDemo from '../components/demo/SensitiveInfoDemo';

const Demo = () => {
  const { openChatbot } = useChatbot();
  const [demoState, setDemoState] = useState('intro'); // intro, dashboard, assessment, framework, recommendations, sensitive
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const autoPlayRef = useRef(null);
  
  // Demo step control with auto-play
  useEffect(() => {
    let timer = null;
    
    if (playing) {
      timer = setTimeout(() => {
        if (currentStep < 5) {
          setCurrentStep(prevStep => prevStep + 1);
        } else {
          setPlaying(false);
        }
      }, 3000);
      
      autoPlayRef.current = timer;
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [playing, currentStep]);
  
  // Control demo content based on current step
  useEffect(() => {
    if (currentStep === 0) {
      setDemoState('intro');
    } else if (currentStep >= 1 && currentStep <= 4) {
      setDemoState('mapper');
    } else if (currentStep === 5) {
      setDemoState('assessment');
    }
  }, [currentStep]);
  
  const startDemo = () => {
    setPlaying(true);
    setCurrentStep(1);
  };
  
  const stopDemo = () => {
    setPlaying(false);
  };
  
  const handleStepChange = (step) => {
    setPlaying(false);
    setCurrentStep(step);
  };
  
  const handleGuideMe = () => {
    openChatbot();
    toast.success('Interactive Guide Activated', 'Our guide bot will help you get started');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Interactive Demo</h1>
            <p className="text-muted-foreground">Explore CyberCorrect's powerful features for CUI protection and compliance management</p>
          </div>
          <div className="flex gap-2">
            <Link to="/about">
              <Button size="lg">
                Schedule a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Demo Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {playing ? (
                <Button variant="outline" size="sm" onClick={stopDemo}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Demo
                </Button>
              ) : (
                <Button size="sm" onClick={startDemo}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Demo
                </Button>
              )}
              
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <Button 
                    key={step}
                    variant={currentStep === step ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleStepChange(step)}
                  >
                    {step === 0 ? 'Intro' : step}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {demoState === 'intro' && 'Introduction'}
              {demoState === 'mapper' && 'CUI Data Flow Mapper'}
              {demoState === 'assessment' && 'CMMC Assessment'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature List (collapsible) */}
      {showFeatures && (
        <Card className="mb-6 border-primary">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Key CyberCorrect Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <Database className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">CUI Data Flow Mapper</p>
                  <p className="text-sm text-muted-foreground">Visually map and document CUI flows across your systems</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">CMMC 2.0 Assessment</p>
                  <p className="text-sm text-muted-foreground">Evaluate compliance with CMMC 2.0 requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileCheck className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">SSP Generator</p>
                  <p className="text-sm text-muted-foreground">Auto-generate System Security Plans</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileCheck className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">POA&M Generator</p>
                  <p className="text-sm text-muted-foreground">Create and manage Plans of Action & Milestones</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Evidence Management</p>
                  <p className="text-sm text-muted-foreground">Collect and organize compliance evidence</p>
                </div>
              </div>
              <div className="flex items-start">
                <BarChart2 className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Compliance Dashboard</p>
                  <p className="text-sm text-muted-foreground">Real-time visibility into compliance status</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Demo Content */}
      {demoState === 'intro' && (
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="max-w-2xl mx-auto">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Welcome to CyberCorrect</h2>
              <p className="text-lg mb-6">
                Experience our powerful, integrated platform for CMMC 2.0 compliance and CUI protection
              </p>
              <p className="mb-8">
                This interactive demo will walk you through key features of our platform. Watch as we demonstrate how CyberCorrect can help you visualize CUI data flows, assess CMMC 2.0 compliance, and generate required documentation.
              </p>
              <Button size="lg" onClick={startDemo}>
                <Play className="mr-2 h-4 w-4" />
                Start the Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {demoState === 'mapper' && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">CUI Data Flow Mapper</h3>
            <div className="relative bg-muted/20 border border-muted rounded-lg h-80 mb-4 overflow-hidden">
              <div className="absolute inset-0 p-4">
                <div className="absolute top-4 left-4 z-10 bg-surface/90 dark:bg-dark-surface/90 rounded border border-support-gray dark:border-dark-support py-2 px-4">
                  <p className="font-medium text-sm">CUI Flow Visualization</p>
                </div>
                
                {/* Demo visualization elements */}
                <div className="relative w-full h-full">
                  {/* Nodes are shown based on the current step */}
                  {currentStep >= 1 && (
                    <div className="absolute top-20 left-10 w-36 p-3 rounded-lg border-2 bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">CUI Source</span>
                        <span className="bg-white rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
                      </div>
                      <div className="text-[10px] mt-1">
                        <span className="bg-primary/10 px-1 py-0.5 rounded">CRAD</span>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 2 && (
                    <div className="absolute top-20 left-[200px] w-36 p-3 rounded-lg border-2 bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">Processing</span>
                        <span className="bg-white rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
                      </div>
                      <div className="text-[10px] mt-1">
                        <span className="bg-primary/10 px-1 py-0.5 rounded">CRAD</span>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 3 && (
                    <div className="absolute top-20 left-[390px] w-36 p-3 rounded-lg border-2 bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">Storage</span>
                        <span className="bg-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                      </div>
                      <div className="text-[10px] mt-1">
                        <span className="bg-primary/10 px-1 py-0.5 rounded">CRAD</span>
                        <span className="bg-primary/10 px-1 py-0.5 rounded ml-1">NNPI</span>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 4 && (
                    <div className="absolute top-[150px] left-[200px] w-36 p-3 rounded-lg border-2 bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">Users</span>
                        <span className="bg-white rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Connections based on the current step */}
                  <svg className="absolute inset-0 w-full h-full">
                    {currentStep >= 2 && (
                      <g>
                        <path 
                          d="M120 80 L200 80" 
                          stroke="#10b981" 
                          strokeWidth="2" 
                          fill="none"
                          markerEnd="url(#arrowhead)" 
                        />
                        <foreignObject x="140" y="55" width="40" height="20">
                          <div className="text-xs bg-white px-1 rounded border border-gray-200">TLS</div>
                        </foreignObject>
                      </g>
                    )}
                    
                    {currentStep >= 3 && (
                      <g>
                        <path 
                          d="M310 80 L390 80" 
                          stroke="#10b981" 
                          strokeWidth="2" 
                          fill="none"
                          markerEnd="url(#arrowhead)"
                        />
                        <foreignObject x="330" y="55" width="40" height="20">
                          <div className="text-xs bg-white px-1 rounded border border-gray-200">TLS</div>
                        </foreignObject>
                      </g>
                    )}
                    
                    {currentStep >= 4 && (
                      <g>
                        <path 
                          d="M390 100 L270 150" 
                          stroke="#10b981" 
                          strokeWidth="2" 
                          fill="none"
                          markerEnd="url(#arrowhead)"
                        />
                        <foreignObject x="320" y="115" width="40" height="20">
                          <div className="text-xs bg-white px-1 rounded border border-gray-200">HTTPS</div>
                        </foreignObject>
                      </g>
                    )}
                    
                    <defs>
                      <marker 
                        id="arrowhead" 
                        markerWidth="10" 
                        markerHeight="7" 
                        refX="0" 
                        refY="3.5" 
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              The CUI Data Flow Mapper allows you to visually document how Controlled Unclassified Information (CUI) moves through your systems and processes. 
              This documentation is required for NIST SP 800-171 compliance and CMMC 2.0 certification.
            </p>
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setCurrentStep(5)}>
                Continue to CMMC Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {demoState === 'assessment' && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">CMMC 2.0 Assessment</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <Card className="bg-muted/10 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold mb-1">78%</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold mb-1">32</div>
                    <div className="text-sm text-muted-foreground">Controls Assessed</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold mb-1">25</div>
                    <div className="text-sm text-muted-foreground">Compliant</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold mb-1">7</div>
                    <div className="text-sm text-muted-foreground">Non-compliant</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="border rounded-lg">
                <div className="bg-muted/30 p-3 border-b">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Access Control</div>
                    <div className="text-sm text-muted-foreground">75% Compliant</div>
                  </div>
                  <div className="w-full bg-muted h-2 mt-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div className="p-2">
                  <div className="p-3 border-b last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mt-0.5 rounded-full p-1 bg-success/10 text-success">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <div className="font-medium">Limit information system access</div>
                            <div className="text-xs bg-primary/10 text-primary ml-2 px-2 py-0.5 rounded-full">AC.1.001</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Limit system access to authorized users, processes, or devices</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mt-0.5 rounded-full p-1 bg-success/10 text-success">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <div className="font-medium">Limit information system access to authorized transactions</div>
                            <div className="text-xs bg-primary/10 text-primary ml-2 px-2 py-0.5 rounded-full">AC.1.002</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Limit system access to the types of transactions that authorized users are permitted to execute</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mt-0.5 rounded-full p-1 bg-destructive/10 text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <div className="font-medium">Control CUI flow</div>
                            <div className="text-xs bg-primary/10 text-primary ml-2 px-2 py-0.5 rounded-full">AC.1.003</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Control the flow of CUI in accordance with approved authorizations</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mt-0.5 rounded-full p-1 bg-success/10 text-success">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <div className="font-medium">Separation of duties</div>
                            <div className="text-xs bg-primary/10 text-primary ml-2 px-2 py-0.5 rounded-full">AC.1.004</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Separate the duties of individuals to reduce the risk of malevolent activity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Button>
                  View Detailed Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <p className="text-muted-foreground text-sm">
              The CMMC 2.0 Assessment tool evaluates your compliance against CMMC 2.0 requirements, providing detailed results and recommendations for remediation.
            </p>
          </div>
        </Card>
      )}
      
      {/* Demo Navigation */}
      <div className="mt-8">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-medium">Try CyberCorrect Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/cui-mapper" className="block">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">CUI Data Flow Mapper</div>
                      <div className="text-xs text-muted-foreground">Document CUI data flows</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/cmmc-quick-check" className="block">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">CMMC 2.0 Assessment</div>
                      <div className="text-xs text-muted-foreground">Evaluate CMMC 2.0 compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/poam-generator" className="block">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">POA&M Generator</div>
                      <div className="text-xs text-muted-foreground">Create action plans</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-8 p-6 bg-primary/5 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Ready to streamline your compliance journey?</h3>
        <p className="mb-4">Experience the full power of CyberCorrect with a personalized demo or free trial.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Schedule a Live Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={handleGuideMe}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Guide Me Through It
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;