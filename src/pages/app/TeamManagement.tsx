import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Award, 
  CheckCircle,
  Clock,
  Mail,
  User,
  Settings,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useTeam } from '../../hooks/useTeam';
import { toast } from '../../lib/toast';

const TeamManagement = () => {
  const { teamMembers, inviteMembers, currentProject } = useTeam();
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [selectedRole, setSelectedRole] = useState('control_implementer');

  const roles = [
    {
      id: 'project_manager',
      name: 'Project Manager',
      description: 'Oversee CMMC implementation project and coordinate team activities',
      permissions: ['Manage project timeline', 'Assign tasks', 'View all areas', 'Generate reports'],
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      id: 'security_officer',
      name: 'Information Systems Security Officer (ISSO)',
      description: 'Responsible for security control implementation and assessment',
      permissions: ['Assess controls', 'Approve implementations', 'Manage security policies'],
      icon: Shield,
      color: 'text-green-600'
    },
    {
      id: 'control_implementer',
      name: 'Control Implementer',
      description: 'Implement specific security controls and upload evidence',
      permissions: ['Implement assigned controls', 'Upload evidence', 'Update task status'],
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      id: 'auditor',
      name: 'Internal Auditor',
      description: 'Review evidence and assess compliance readiness',
      permissions: ['Review evidence', 'Assess compliance', 'Generate audit reports'],
      icon: Award,
      color: 'text-orange-600'
    },
    {
      id: 'evidence_manager',
      name: 'Evidence Manager',
      description: 'Organize and manage compliance evidence and documentation',
      permissions: ['Manage evidence vault', 'Organize documents', 'Maintain file structure'],
      icon: Users,
      color: 'text-indigo-600'
    }
  ];

  const handleInviteMembers = () => {
    if (!inviteEmails.trim()) return;
    
    const emails = inviteEmails.split(',').map(email => email.trim()).filter(email => email);
    inviteMembers(emails, selectedRole);
    
    toast.success('Team members invited', `Invited ${emails.length} members as ${selectedRole.replace('_', ' ')}`);
    setInviteEmails('');
    setShowInviteForm(false);
  };

  const getAssignedControlsCount = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member?.assignedControls.length || 0;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Team Management</h1>
            <p className="text-muted-foreground">
              Manage team members, roles, and responsibilities for CMMC implementation
            </p>
          </div>
          <Button onClick={() => setShowInviteForm(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Team Members
          </Button>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {teamMembers.filter(m => 
                    new Date().getTime() - m.lastActive.getTime() < 24 * 60 * 60 * 1000
                  ).length}
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
                <p className="text-sm text-muted-foreground">Controls Assigned</p>
                <p className="text-2xl font-bold text-purple-600">
                  {teamMembers.reduce((sum, member) => sum + member.assignedControls.length, 0)}
                </p>
              </div>
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-orange-600">2.4h</p>
              </div>
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {teamMembers.length > 0 ? (
                <div className="space-y-4">
                  {teamMembers.map((member) => {
                    const roleInfo = roles.find(r => r.id === member.role);
                    return (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {roleInfo && <roleInfo.icon className={`h-4 w-4 ${roleInfo.color}`} />}
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                {roleInfo?.name || member.role.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {getAssignedControlsCount(member.id)} controls assigned
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No team members yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Invite team members to collaborate on CMMC implementation
                  </p>
                  <Button onClick={() => setShowInviteForm(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Your First Team Member
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Role Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>CMMC Team Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <role.icon className={`h-5 w-5 ${role.color}`} />
                      <h4 className="font-semibold text-foreground text-sm">{role.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{role.description}</p>
                    <div className="text-xs">
                      <p className="font-medium text-foreground mb-1">Key Permissions:</p>
                      <ul className="text-muted-foreground space-y-1">
                        {role.permissions.slice(0, 2).map((permission, idx) => (
                          <li key={idx}>• {permission}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invite Team Members Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Invite Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Email Addresses</label>
                <textarea
                  placeholder="Enter email addresses separated by commas"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInviteMembers}>
                  Send Invitations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;