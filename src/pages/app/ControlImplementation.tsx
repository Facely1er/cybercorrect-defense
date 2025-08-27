import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  Plus,
  Search,
  Eye,
  Edit,
  Upload
} from 'lucide-react';

interface Control {
  id: string;
  family: string;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  status: 'not_started' | 'in_progress' | 'review' | 'completed' | 'not_applicable';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: string;
  evidenceCount: number;
  implementationNotes?: string;
  lastUpdated?: Date;
}

const ControlImplementation = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  // Mock CMMC controls data
  const controls: Control[] = [
    {
      id: 'AC.L1-3.1.1',
      family: 'Access Control',
      title: 'Limit information system access to authorized users',
      description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).',
      level: 1,
      status: 'completed',
      priority: 'high',
      assignee: 'John Smith',
      dueDate: '2024-01-15',
      evidenceCount: 3,
      implementationNotes: 'Implemented through Active Directory with role-based access controls',
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: 'AC.L1-3.1.2',
      family: 'Access Control',
      title: 'Limit information system access to authorized transactions',
      description: 'Limit information system access to the types of transactions and functions that authorized users are permitted to execute.',
      level: 1,
      status: 'in_progress',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: '2024-02-01',
      evidenceCount: 1,
      implementationNotes: 'Configuring application-level access controls',
      lastUpdated: new Date('2024-01-25')
    },
    {
      id: 'IA.L2-3.5.3',
      family: 'Identification and Authentication',
      title: 'Use multifactor authentication for privileged accounts',
      description: 'Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.',
      level: 2,
      status: 'review',
      priority: 'critical',
      assignee: 'Mike Wilson',
      dueDate: '2024-01-30',
      evidenceCount: 2,
      implementationNotes: 'MFA deployed for all privileged accounts, testing in progress',
      lastUpdated: new Date('2024-01-28')
    },
    {
      id: 'IR.L2-3.6.1',
      family: 'Incident Response',
      title: 'Establish incident-handling capability',
      description: 'Establish an operational incident-handling capability for organizational information systems.',
      level: 2,
      status: 'not_started',
      priority: 'high',
      assignee: 'Lisa Chen',
      dueDate: '2024-03-15',
      evidenceCount: 0,
      lastUpdated: new Date('2024-01-20')
    },
    {
      id: 'CM.L2-3.4.1',
      family: 'Configuration Management',
      title: 'Establish and maintain baseline configurations',
      description: 'Establish and maintain baseline configurations and inventories of organizational information systems.',
      level: 2,
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Tom Davis',
      dueDate: '2024-02-28',
      evidenceCount: 1,
      implementationNotes: 'Baseline configurations documented for 70% of systems',
      lastUpdated: new Date('2024-01-22')
    }
  ];

  const controlFamilies = [
    'Access Control',
    'Configuration Management', 
    'Identification and Authentication',
    'Incident Response',
    'System and Information Integrity',
    'Risk Assessment'
  ];

  const getStatusColor = (status: Control['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'review': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'not_started': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'not_applicable': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: Control['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredControls = controls.filter(control => {
    const matchesFamily = selectedFamily === 'all' || control.family === selectedFamily;
    const matchesStatus = selectedStatus === 'all' || control.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFamily && matchesStatus && matchesSearch;
  });

  const getStatusStats = () => {
    const stats = {
      completed: controls.filter(c => c.status === 'completed').length,
      in_progress: controls.filter(c => c.status === 'in_progress').length,
      review: controls.filter(c => c.status === 'review').length,
      not_started: controls.filter(c => c.status === 'not_started').length
    };
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">CMMC Control Implementation</h1>
        <p className="text-muted-foreground">
          Track and manage implementation of CMMC security controls
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{statusStats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{statusStats.in_progress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{statusStats.review}</div>
            <div className="text-xs text-muted-foreground">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{statusStats.not_started}</div>
            <div className="text-xs text-muted-foreground">Not Started</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Control Implementation Status</CardTitle>
            <div className="flex gap-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Bulk Update
              </Button>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Evidence
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search controls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Families</option>
              {controlFamilies.map(family => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Under Review</option>
              <option value="not_started">Not Started</option>
            </select>
          </div>

          {/* Controls Table */}
          <div className="space-y-3">
            {filteredControls.map((control) => (
              <Card 
                key={control.id} 
                className={`cursor-pointer hover:shadow-md transition-all ${
                  selectedControl?.id === control.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedControl(control)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-bold text-primary">{control.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                          {control.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(control.priority)}`}>
                          L{control.level}
                        </span>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {control.family}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2">{control.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{control.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm">
                        {control.assignee && (
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {control.assignee}
                          </div>
                        )}
                        {control.dueDate && (
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            Due {control.dueDate}
                          </div>
                        )}
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="h-4 w-4 mr-1" />
                          {control.evidenceCount} evidence files
                        </div>
                      </div>
                      
                      {control.implementationNotes && (
                        <div className="mt-3 p-3 bg-muted/30 rounded-md">
                          <p className="text-sm text-foreground">{control.implementationNotes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
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
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredControls.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No controls found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlImplementation;