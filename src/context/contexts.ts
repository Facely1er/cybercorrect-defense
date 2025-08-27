import { createContext } from 'react';
import { User } from '../types';

// AuthContext types and context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// GuideContext types and context
export interface GuideProgress {
  id: string;
  completed: string[];
  lastVisited: string;
  startedAt: string;
  completedAt?: string;
}

interface GuideContextType {
  progress: Record<string, GuideProgress>;
  markSectionComplete: (guideId: string, sectionId: string) => void;
  updateLastVisited: (guideId: string, sectionId: string) => void;
  getGuideProgress: (guideId: string) => number;
  getSectionProgress: (guideId: string, sectionId: string) => boolean;
}

export const GuideContext = createContext<GuideContextType | undefined>(undefined);

// TeamContext types and context
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  responsibilities?: string[];
  assignedControls?: string[];
}

export interface TeamProject {
  id: string;
  name: string;
  description: string;
  targetLevel: number;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  startDate: string;
  targetDate: string;
  members: string[];
  progress: number;
}

interface TeamContextType {
  currentProject: TeamProject | null;
  projects: TeamProject[];
  teamMembers: TeamMember[];
  userRole: string;
  inviteMembers: (emails: string[]) => void;
  assignControl: (controlId: string, memberId: string) => void;
  updateProjectStatus: (projectId: string, status: TeamProject['status']) => void;
  setCurrentProject: (projectId: string) => void;
}

export const TeamContext = createContext<TeamContextType | undefined>(undefined);

// ProjectContext types and context
export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  controlIds: string[];
  progress: number;
}

export interface ControlTask {
  id: string;
  controlId: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface ProjectRoadmap {
  phases: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    milestones: string[];
    status: 'planned' | 'active' | 'completed';
  }[];
}

export interface RACIMatrix {
  controlId: string;
  responsible: string[];
  accountable: string;
  consulted: string[];
  informed: string[];
}

export interface WBSNode {
  id: string;
  title: string;
  type: 'phase' | 'deliverable' | 'task';
  parent?: string;
  children: string[];
  controlIds?: string[];
  assignedTo?: string;
  duration?: number;
  dependencies?: string[];
}

interface ProjectContextType {
  milestones: ProjectMilestone[];
  tasks: ControlTask[];
  roadmap: ProjectRoadmap | null;
  raciMatrix: RACIMatrix[];
  wbs: WBSNode[];
  addMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<ProjectMilestone>) => void;
  addTask: (task: Omit<ControlTask, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<ControlTask>) => void;
  updateRoadmap: (roadmap: ProjectRoadmap) => void;
  updateRACIMatrix: (controlId: string, raci: Omit<RACIMatrix, 'controlId'>) => void;
  generateWBS: (controls: string[]) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);