import React, { createContext, useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'project_manager' | 'security_officer' | 'control_implementer' | 'auditor' | 'evidence_manager';
  permissions: string[];
  assignedControls: string[];
  lastActive: Date;
  avatar?: string;
}

interface TeamProject {
  id: string;
  name: string;
  description: string;
  cmmcLevel: 1 | 2 | 3;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
  members: string[];
}

interface TeamContextType {
  currentProject: TeamProject | null;
  projects: TeamProject[];
  teamMembers: TeamMember[];
  userRole: string;
  createProject: (project: Omit<TeamProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  inviteMembers: (emails: string[], role: string) => void;
  assignControl: (controlId: string, memberId: string) => void;
  updateProjectStatus: (projectId: string, status: TeamProject['status']) => void;
  setCurrentProject: (projectId: string) => void;
}

export const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProjectState] = useState<TeamProject | null>(null);
  const [projects, setProjects] = useState<TeamProject[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [userRole] = useState<string>('project_manager');

  useEffect(() => {
    // Load team data from localStorage or API
    const savedProjects = localStorage.getItem('teamProjects');
    const savedMembers = localStorage.getItem('teamMembers');
    
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      if (parsedProjects.length > 0) {
        setCurrentProjectState(parsedProjects[0]);
      }
    }
    
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    }
  }, []);

  const createProject = (projectData: Omit<TeamProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: TeamProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('teamProjects', JSON.stringify(updatedProjects));
    
    if (!currentProject) {
      setCurrentProjectState(newProject);
    }
  };

  const inviteMembers = (emails: string[], role: string) => {
    const newMembers: TeamMember[] = emails.map(email => ({
      id: `member-${Date.now()}-${Math.random()}`,
      name: email.split('@')[0],
      email,
      role: role as TeamMember['role'],
      permissions: getRolePermissions(role),
      assignedControls: [],
      lastActive: new Date()
    }));
    
    const updatedMembers = [...teamMembers, ...newMembers];
    setTeamMembers(updatedMembers);
    localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
  };

  const getRolePermissions = (role: string): string[] => {
    const rolePermissions = {
      project_manager: ['manage_project', 'assign_tasks', 'view_all', 'generate_reports'],
      security_officer: ['assess_controls', 'approve_implementations', 'manage_policies'],
      control_implementer: ['implement_controls', 'upload_evidence', 'update_status'],
      auditor: ['view_evidence', 'assess_compliance', 'generate_reports'],
      evidence_manager: ['manage_evidence', 'organize_documents', 'maintain_vault']
    };
    return rolePermissions[role as keyof typeof rolePermissions] || [];
  };

  const assignControl = (controlId: string, memberId: string) => {
    const updatedMembers = teamMembers.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          assignedControls: [...member.assignedControls, controlId]
        };
      }
      return member;
    });
    
    setTeamMembers(updatedMembers);
    localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
  };

  const updateProjectStatus = (projectId: string, status: TeamProject['status']) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          status,
          updatedAt: new Date()
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    localStorage.setItem('teamProjects', JSON.stringify(updatedProjects));
    
    if (currentProject?.id === projectId) {
      setCurrentProjectState(updatedProjects.find(p => p.id === projectId) || null);
    }
  };

  const setCurrentProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setCurrentProjectState(project || null);
  };

  return (
    <TeamContext.Provider value={{
      currentProject,
      projects,
      teamMembers,
      userRole,
      createProject,
      inviteMembers,
      assignControl,
      updateProjectStatus,
      setCurrentProject
    }}>
      {children}
    </TeamContext.Provider>
  );
};