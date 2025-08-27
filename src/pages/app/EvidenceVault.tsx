import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FolderOpen, 
  Upload, 
  File, 
  Image, 
  FileText, 
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  User,
  Tag,
  Shield
} from 'lucide-react';

interface EvidenceFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'screenshot' | 'config' | 'policy' | 'report';
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  controlIds: string[];
  tags: string[];
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  version: number;
}

const EvidenceVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedControl, setSelectedControl] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<EvidenceFile | null>(null);

  // Mock evidence data
  const evidenceFiles: EvidenceFile[] = [
    {
      id: 'ev-001',
      name: 'Active_Directory_Configuration.pdf',
      type: 'document',
      size: '2.3 MB',
      uploadedBy: 'John Smith',
      uploadedAt: new Date('2024-01-15'),
      controlIds: ['AC.L1-3.1.1', 'AC.L1-3.1.2'],
      tags: ['access-control', 'configuration', 'active-directory'],
      description: 'Active Directory configuration documentation showing implementation of access controls',
      status: 'approved',
      reviewedBy: 'Security Officer',
      reviewedAt: new Date('2024-01-16'),
      version: 1
    },
    {
      id: 'ev-002',
      name: 'MFA_Implementation_Screenshots.zip',
      type: 'image',
      size: '5.1 MB',
      uploadedBy: 'Mike Wilson',
      uploadedAt: new Date('2024-01-28'),
      controlIds: ['IA.L2-3.5.3'],
      tags: ['mfa', 'authentication', 'screenshots'],
      description: 'Screenshots showing MFA configuration for privileged and non-privileged accounts',
      status: 'pending',
      version: 1
    },
    {
      id: 'ev-003',
      name: 'Incident_Response_Plan_v2.docx',
      type: 'policy',
      size: '1.8 MB',
      uploadedBy: 'Lisa Chen',
      uploadedAt: new Date('2024-01-30'),
      controlIds: ['IR.L2-3.6.1', 'IR.L2-3.6.2'],
      tags: ['incident-response', 'policy', 'procedures'],
      description: 'Updated incident response plan with procedures for handling security incidents',
      status: 'pending',
      version: 2
    },
    {
      id: 'ev-004',
      name: 'System_Baseline_Configuration_Report.pdf',
      type: 'report',
      size: '3.7 MB',
      uploadedBy: 'Tom Davis',
      uploadedAt: new Date('2024-01-25'),
      controlIds: ['CM.L2-3.4.1', 'CM.L2-3.4.2'],
      tags: ['configuration-management', 'baseline', 'systems'],
      description: 'Comprehensive report on system baseline configurations and inventory',
      status: 'approved',
      reviewedBy: 'Security Officer',
      reviewedAt: new Date('2024-01-26'),
      version: 1
    }
  ];

  const getFileIcon = (type: EvidenceFile['type']) => {
    switch (type) {
      case 'image': case 'screenshot': return Image;
      case 'document': case 'policy': case 'report': return FileText;
      case 'config': return Shield;
      default: return File;
    }
  };

  const getStatusColor = (status: EvidenceFile['status']) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredFiles = evidenceFiles.filter(file => {
    const matchesSearch = searchTerm === '' || 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesControl = selectedControl === 'all' || file.controlIds.includes(selectedControl);
    const matchesType = selectedType === 'all' || file.type === selectedType;
    
    return matchesSearch && matchesControl && matchesType;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Evidence Vault</h1>
            <p className="text-muted-foreground">
              Centralized repository for CMMC compliance evidence and documentation
            </p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence
          </Button>
        </div>
      </div>

      {/* Evidence Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold text-foreground">{evidenceFiles.length}</p>
              </div>
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {evidenceFiles.filter(f => f.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {evidenceFiles.filter(f => f.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Controls Covered</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(evidenceFiles.flatMap(f => f.controlIds)).size}
                </p>
              </div>
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Evidence Files</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search evidence files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="image">Images</option>
              <option value="screenshot">Screenshots</option>
              <option value="config">Configurations</option>
              <option value="policy">Policies</option>
              <option value="report">Reports</option>
            </select>
          </div>

          {/* File List */}
          <div className="space-y-3">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div 
                  key={file.id} 
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileIcon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">{file.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                        {file.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {file.uploadedBy}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {file.uploadedAt.toLocaleDateString()}
                      </div>
                      <div>{file.size}</div>
                      <div>v{file.version}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {file.controlIds.map(controlId => (
                          <span key={controlId} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {controlId}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No evidence files found</h3>
              <p className="text-muted-foreground mb-4">
                Upload evidence files to support your CMMC control implementations
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Evidence File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceVault;