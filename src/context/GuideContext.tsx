import React, { useState, useEffect } from 'react';
import { GuideContext, type GuideProgress } from './contexts';

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Record<string, GuideProgress>>(() => {
    const saved = localStorage.getItem('guideProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('guideProgress', JSON.stringify(progress));
  }, [progress]);

  const markSectionComplete = (guideId: string, sectionId: string) => {
    setProgress(prev => {
      const guide = prev[guideId] || {
        id: guideId,
        completed: [],
        lastVisited: sectionId,
        startedAt: new Date().toISOString()
      };

      if (!guide.completed.includes(sectionId)) {
        const newCompleted = [...guide.completed, sectionId];
        return {
          ...prev,
          [guideId]: {
            ...guide,
            completed: newCompleted,
            completedAt: newCompleted.length === getTotalSections(guideId) 
              ? new Date().toISOString() 
              : undefined
          }
        };
      }

      return prev;
    });
  };

  const updateLastVisited = (guideId: string, sectionId: string) => {
    setProgress(prev => {
      const guide = prev[guideId] || {
        id: guideId,
        completed: [],
        lastVisited: sectionId,
        startedAt: new Date().toISOString()
      };

      return {
        ...prev,
        [guideId]: {
          ...guide,
          lastVisited: sectionId
        }
      };
    });
  };

  const getTotalSections = (guideId: string): number => {
    // This would ideally come from a configuration
    const guideSections: Record<string, number> = {
      'nist-csf': 15,
      'ransomware-protection': 12,
      'supply-chain': 12,
      'security-controls': 12,
      'compliance': 12,
      'risk-assessment': 12,
      'privacy-framework': 12,
      'cui-cmmc': 12
    };
    return guideSections[guideId] || 0;
  };

  const getGuideProgress = (guideId: string): number => {
    const guide = progress[guideId];
    if (!guide) return 0;

    const totalSections = getTotalSections(guideId);
    if (totalSections === 0) return 0;
    
    return Math.round((guide.completed.length / totalSections) * 100);
  };

  const getSectionProgress = (guideId: string, sectionId: string): boolean => {
    return progress[guideId]?.completed.includes(sectionId) || false;
  };

  return (
    <GuideContext.Provider value={{
      progress,
      markSectionComplete,
      updateLastVisited,
      getGuideProgress,
      getSectionProgress
    }}>
      {children}
    </GuideContext.Provider>
  );
};