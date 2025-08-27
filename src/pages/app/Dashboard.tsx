import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, 
  Target, 
  AlertTriangle, 
  Users, 
  FileCheck, 
  ArrowRight,
  Award,
  Calendar,
  Activity
} from 'lucide-react';
import { useTeam } from '../../context/TeamContext';
import { useProject } from '../../context/ProjectContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentProject, teamMembers } = useTeam();
  
  // Mock compliance data - in real app this would come from assessment results
  const complianceData = {
    overallScore: 68,
    level1Score: 82,
    level2Score: 65,
    implementedControls: 72,
    totalControls: 110,
    criticalGaps: 8,
    highRiskGaps: 15,
    completedTasks: 28,
    totalTasks: 45
  };

  const recentActivity = [
    {
      id: 1,
      type: 'control_updated',
      message: 'AC-3 Access Enforcement control implementation completed',
      user: 'John Smith',
      timestamp: '2 hours ago',
      icon: Shield
    },
    {
      id: 2,
      type: 'evidence_uploaded',
      message: 'Evidence uploaded for IA-2 User Identification',
      user: 'Sarah Johnson',
      timestamp: '4 hours ago',
      icon: FileCheck
    },
    {
      id: 3,
      type: 'milestone_completed',
      message: 'Access Control implementation milestone completed',
      user: 'Team Lead',
      timestamp: '1 day ago',
      icon: Target
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Incident Response Plan Review',
      dueDate: '2024-02-15',
      assignee: 'Security Team',
      priority: 'high'
    },
    {
      id: 2,
      title: 'System Boundary Documentation',
      dueDate: '2024-02-20',
      assignee: 'IT Team',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Media Protection Controls Assessment',
      dueDate: '2024-02-25',
      assignee: 'Compliance Team', 
      priority: 'medium'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">CMMC Compliance Dashboard</h1>
        <p className="text-muted-foreground">
          {currentProject ? `Project: ${currentProject.name} (Level ${currentProject.cmmcLevel})` : 'Overview of your CMMC compliance progress'}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Compliance</p>
                <p className="text-3xl font-bold text-blue-600">{complianceData.overallScore}%</p>
                <p className="text-xs text-muted-foreground">
                  {complianceData.implementedControls}/{complianceData.totalControls} controls
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Level 1 Ready</p>
                <p className="text-3xl font-bold text-green-600">{complianceData.level1Score}%</p>
                <p className="text-xs text-muted-foreground">Foundational controls</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Gaps</p>
                <p className="text-3xl font-bold text-orange-600">{complianceData.criticalGaps}</p>
                <p className="text-xs text-muted-foreground">Immediate attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {complianceData.completedTasks}/{complianceData.totalTasks}
                </p>
                <p className="text-xs text-muted-foreground">Implementation progress</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Control Implementation Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Control Implementation Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { family: 'Access Control', implemented: 18, total: 22, percentage: 82 },
                  { family: 'Configuration Management', implemented: 7, total: 9, percentage: 78 },
                  { family: 'Identification & Authentication', implemented: 8, total: 11, percentage: 73 },
                  { family: 'Incident Response', implemented: 1, total: 3, percentage: 33 },
                  { family: 'System & Information Integrity', implemented: 4, total: 7, percentage: 57 }
                ].map((family, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-foreground">{family.family}</span>
                        <span className="text-sm text-muted-foreground">
                          {family.implemented}/{family.total}
                        </span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${family.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium text-foreground">
                      {family.percentage}%
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link to="/app/controls">
                  <Button variant="outline">
                    View All Controls
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/assessment" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Run Assessment
                </Button>
              </Link>
              <Link to="/app/documents" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate SSP
                </Button>
              </Link>
              <Link to="/app/evidence" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Upload Evidence
                </Button>
              </Link>
              <Link to="/app/team" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.assignee}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{deadline.dueDate}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {deadline.priority}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Status */}
          {teamMembers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Team Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.role.replace('_', ' ')} • {member.assignedControls.length} controls
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                  {teamMembers.length > 3 && (
                    <div className="text-center">
                      <Link to="/app/team">
                        <Button variant="outline" size="sm">
                          View All ({teamMembers.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;