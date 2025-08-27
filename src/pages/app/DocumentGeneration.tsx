import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FileText, 
  Download, 
  Shield, 
  Target, 
  CheckCircle,
  FileCheck,
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

interface DocumentTemplate {
  id: string;
  name: string;
  type: 'ssp' | 'poam' | 'policy' | 'procedure' | 'report';
  description: string;
  version: string;
  lastUpdated: Date;
  status: 'draft' | 'review' | 'approved';
  completeness: number;
  requiredForLevel: number[];
}

const DocumentGeneration = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'generated' | 'policies'>('templates');

  const documentTemplates: DocumentTemplate[] = [
    {
      id: 'ssp-template',
      name: 'System Security Plan (SSP)',
      type: 'ssp',
      description: 'Comprehensive SSP template for NIST SP 800-171 compliance',
      version: '2.1',
      lastUpdated: new Date('2024-01-15'),
      status: 'approved',
      completeness: 85,
      requiredForLevel: [2, 3]
    },
    {
      id: 'poam-template', 
      name: 'Plan of Action & Milestones (POA&M)',
      type: 'poam',
      description: 'POA&M template for tracking remediation activities',
      version: '1.3',
      lastUpdated: new Date('2024-01-20'),
      status: 'approved',
      completeness: 92,
      requiredForLevel: [1, 2, 3]
    },
    {
      id: 'access-control-policy',
      name: 'Access Control Policy',
      type: 'policy',
      description: 'Comprehensive access control policy template',
      version: '1.0',
      lastUpdated: new Date('2024-01-10'),
      status: 'draft',
      completeness: 60,
      requiredForLevel: [1, 2, 3]
    },
    {
      id: 'incident-response-plan',
      name: 'Incident Response Plan',
      type: 'procedure',
      description: 'Detailed incident response procedures and playbooks',
      version: '1.5',
      lastUpdated: new Date('2024-01-25'),
      status: 'review',
      completeness: 78,
      requiredForLevel: [2, 3]
    },
    {
      id: 'compliance-report',
      name: 'CMMC Readiness Report',
      type: 'report',
      description: 'Comprehensive assessment and readiness report',
      version: '1.0',
      lastUpdated: new Date('2024-01-30'),
      status: 'draft',
      completeness: 45,
      requiredForLevel: [1, 2, 3]
    }
  ];

  const getTypeIcon = (type: DocumentTemplate['type']) => {
    switch (type) {
      case 'ssp': return Shield;
      case 'poam': return Target;
      case 'policy': return FileText;
      case 'procedure': return CheckCircle;
      case 'report': return BarChart3;
      default: return FileText;
    }
  };

  const getStatusColor = (status: DocumentTemplate['status']) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'review': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'draft': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleGenerateDocument = (_templateId: string) => {
    toast.success('Document generation started', 'Your document is being generated...');
    
    setTimeout(() => {
      toast.success('Document generated successfully', 'Your document is ready for download');
    }, 2000);
  };

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Document Templates</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTemplates.map((template) => {
          const TypeIcon = getTypeIcon(template.type);
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TypeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Completeness</span>
                    <span className="text-sm text-muted-foreground">{template.completeness}%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${template.completeness}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground">
                    Required for Level: {template.requiredForLevel.join(', ')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    v{template.version}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleGenerateDocument(template.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderGenerated = () => (
    <div className="text-center py-12">
      <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">Generated Documents</h3>
      <p className="text-muted-foreground mb-4">
        Your generated CMMC compliance documents will appear here
      </p>
      <Button variant="outline">View Document History</Button>
    </div>
  );

  const renderPolicies = () => (
    <div className="text-center py-12">
      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">Policy Library</h3>
      <p className="text-muted-foreground mb-4">
        Access and customize security policies for CMMC compliance
      </p>
      <Button variant="outline">Browse Policy Templates</Button>
    </div>
  );

  const tabs = [
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'generated', label: 'Generated', icon: FileCheck },
    { id: 'policies', label: 'Policies', icon: Shield }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Document Generation</h1>
        <p className="text-muted-foreground">
          Generate CMMC compliance documents including SSP, POA&M, and security policies
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'templates' | 'generated' | 'policies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'generated' && renderGenerated()}
        {activeTab === 'policies' && renderPolicies()}
      </div>
    </div>
  );
};

export default DocumentGeneration;