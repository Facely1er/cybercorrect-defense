import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, Target, BarChart3, CheckCircle, AlertTriangle, Plus, ArrowRight, GanttChart as Gantt, Network } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'milestones' | 'tasks' | 'raci' | 'wbs'>('roadmap');
  const { roadmap } = useProject();

  // Mock project data
  const projectPhases = [
    {
      id: 'phase-1',
      name: 'Assessment & Planning',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      tasks: 8,
      completedTasks: 8
    },
    {
      id: 'phase-2', 
      name: 'Level 1 Implementation',
      status: 'in_progress',
      progress: 75,
      startDate: '2024-01-16',
      endDate: '2024-02-15',
      tasks: 12,
      completedTasks: 9
    },
    {
      id: 'phase-3',
      name: 'Level 2 Implementation', 
      status: 'planned',
      progress: 20,
      startDate: '2024-02-16',
      endDate: '2024-05-15',
      tasks: 25,
      completedTasks: 5
    },
    {
      id: 'phase-4',
      name: 'Documentation & Assessment',
      status: 'planned',
      progress: 0,
      startDate: '2024-05-16',
      endDate: '2024-06-30',
      tasks: 15,
      completedTasks: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'planned': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderRoadmap = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">CMMC Implementation Roadmap</h3>
        <Button size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure Timeline
        </Button>
      </div>
      
      <div className="space-y-4">
        {projectPhases.map((phase, index) => (
          <Card key={phase.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{phase.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {phase.startDate} - {phase.endDate}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                  {phase.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {phase.completedTasks}/{phase.tasks} tasks
                </span>
              </div>
              
              <div className="w-full bg-muted h-2 rounded-full">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Project Milestones</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </div>
      
      <div className="text-center py-12">
        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Milestone Management</h3>
        <p className="text-muted-foreground mb-4">
          Track key project milestones and deliverables
        </p>
        <Button>Create First Milestone</Button>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Task Management</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Task Tracking</h3>
        <p className="text-muted-foreground mb-4">
          Manage control implementation tasks and assignments
        </p>
        <Button>Create Task Template</Button>
      </div>
    </div>
  );

  const renderRaci = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">RACI Matrix</h3>
        <Button size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure Roles
        </Button>
      </div>
      
      <div className="text-center py-12">
        <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Responsibility Assignment</h3>
        <p className="text-muted-foreground mb-4">
          Define roles and responsibilities for each CMMC control
        </p>
        <Button>Setup RACI Matrix</Button>
      </div>
    </div>
  );

  const renderWbs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Work Breakdown Structure</h3>
        <Button size="sm">
          <Gantt className="h-4 w-4 mr-2" />
          Generate WBS
        </Button>
      </div>
      
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Project Structure</h3>
        <p className="text-muted-foreground mb-4">
          Break down CMMC implementation into manageable work packages
        </p>
        <Button>Create WBS</Button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'roadmap', label: 'Roadmap', icon: Calendar },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle },
    { id: 'raci', label: 'RACI Matrix', icon: Network },
    { id: 'wbs', label: 'WBS', icon: BarChart3 }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Project Management</h1>
        <p className="text-muted-foreground">
          Manage your CMMC implementation project with roadmaps, milestones, and team coordination
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'roadmap' | 'milestones' | 'tasks' | 'raci' | 'wbs')}
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
        {activeTab === 'roadmap' && renderRoadmap()}
        {activeTab === 'milestones' && renderMilestones()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'raci' && renderRaci()}
        {activeTab === 'wbs' && renderWbs()}
      </div>
    </div>
  );
};

export default ProjectManagement;