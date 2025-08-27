import React, { createContext, useState, useEffect } from 'react';

interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: string;
  controlIds: string[];
  dependencies: string[];
}

interface ControlTask {
  id: string;
  controlId: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'review' | 'completed';
  assignedTo: string;
  dueDate: Date;
  effort: number; // hours
  progress: number; // percentage
  dependencies: string[];
  evidence: string[];
}

interface ProjectRoadmap {
  phases: {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    milestones: string[];
    status: 'planned' | 'active' | 'completed';
  }[];
}

interface RACIMatrix {
  controlId: string;
  responsible: string[];
  accountable: string[];
  consulted: string[];
  informed: string[];
}

interface WorkBreakdownStructure {
  id: string;
  name: string;
  level: number;
  parent?: string;
  children: string[];
  tasks: string[];
  effort: number;
  duration: number;
}

interface ProjectContextType {
  milestones: ProjectMilestone[];
  tasks: ControlTask[];
  roadmap: ProjectRoadmap | null;
  raciMatrix: RACIMatrix[];
  wbs: WorkBreakdownStructure[];
  createMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<ProjectMilestone>) => void;
  createTask: (task: Omit<ControlTask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<ControlTask>) => void;
  updateRoadmap: (roadmap: ProjectRoadmap) => void;
  updateRACIMatrix: (controlId: string, raci: Omit<RACIMatrix, 'controlId'>) => void;
  generateWBS: (controls: string[]) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [tasks, setTasks] = useState<ControlTask[]>([]);
  const [roadmap, setRoadmap] = useState<ProjectRoadmap | null>(null);
  const [raciMatrix, setRaciMatrix] = useState<RACIMatrix[]>([]);
  const [wbs, setWbs] = useState<WorkBreakdownStructure[]>([]);

  useEffect(() => {
    // Load project data from localStorage
    const savedMilestones = localStorage.getItem('projectMilestones');
    const savedTasks = localStorage.getItem('projectTasks');
    const savedRoadmap = localStorage.getItem('projectRoadmap');
    const savedRaci = localStorage.getItem('raciMatrix');
    const savedWbs = localStorage.getItem('workBreakdownStructure');
    
    if (savedMilestones) setMilestones(JSON.parse(savedMilestones));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));
    if (savedRaci) setRaciMatrix(JSON.parse(savedRaci));
    if (savedWbs) setWbs(JSON.parse(savedWbs));
  }, []);

  const createMilestone = (milestoneData: Omit<ProjectMilestone, 'id'>) => {
    const newMilestone: ProjectMilestone = {
      ...milestoneData,
      id: `milestone-${Date.now()}`
    };
    
    const updatedMilestones = [...milestones, newMilestone];
    setMilestones(updatedMilestones);
    localStorage.setItem('projectMilestones', JSON.stringify(updatedMilestones));
  };

  const updateMilestone = (id: string, updates: Partial<ProjectMilestone>) => {
    const updatedMilestones = milestones.map(milestone => 
      milestone.id === id ? { ...milestone, ...updates } : milestone
    );
    setMilestones(updatedMilestones);
    localStorage.setItem('projectMilestones', JSON.stringify(updatedMilestones));
  };

  const createTask = (taskData: Omit<ControlTask, 'id'>) => {
    const newTask: ControlTask = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('projectTasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (id: string, updates: Partial<ControlTask>) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('projectTasks', JSON.stringify(updatedTasks));
  };

  const updateRoadmap = (newRoadmap: ProjectRoadmap) => {
    setRoadmap(newRoadmap);
    localStorage.setItem('projectRoadmap', JSON.stringify(newRoadmap));
  };

  const updateRACIMatrix = (controlId: string, raci: Omit<RACIMatrix, 'controlId'>) => {
    const updatedRaci = raciMatrix.filter(item => item.controlId !== controlId);
    updatedRaci.push({ controlId, ...raci });
    setRaciMatrix(updatedRaci);
    localStorage.setItem('raciMatrix', JSON.stringify(updatedRaci));
  };

  const generateWBS = (controls: string[]) => {
    // Generate work breakdown structure based on control families
    const controlFamilies = [
      'Access Control', 'Configuration Management', 'Identification and Authentication',
      'Incident Response', 'System and Information Integrity', 'Risk Assessment'
    ];
    
    const wbsItems: WorkBreakdownStructure[] = [];
    
    // Root level
    wbsItems.push({
      id: 'wbs-root',
      name: 'CMMC Implementation Project',
      level: 0,
      children: controlFamilies.map(family => `wbs-${family.replace(/\s+/g, '-').toLowerCase()}`),
      tasks: [],
      effort: 0,
      duration: 0
    });
    
    // Control family level
    controlFamilies.forEach((family) => {
      const familyId = `wbs-${family.replace(/\s+/g, '-').toLowerCase()}`;
      wbsItems.push({
        id: familyId,
        name: family,
        level: 1,
        parent: 'wbs-root',
        children: [],
        tasks: controls.filter(c => c.includes(family.substring(0, 2).toUpperCase())),
        effort: Math.floor(Math.random() * 40) + 20,
        duration: Math.floor(Math.random() * 4) + 2
      });
    });
    
    setWbs(wbsItems);
    localStorage.setItem('workBreakdownStructure', JSON.stringify(wbsItems));
  };

  return (
    <ProjectContext.Provider value={{
      milestones,
      tasks,
      roadmap,
      raciMatrix,
      wbs,
      createMilestone,
      updateMilestone,
      createTask,
      updateTask,
      updateRoadmap,
      updateRACIMatrix,
      generateWBS
    }}>
      {children}
    </ProjectContext.Provider>
  );
};