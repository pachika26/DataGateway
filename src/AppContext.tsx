import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Dataset } from './types';
import { MOCK_PROJECTS, MOCK_DATASETS } from './mockData';

interface AppContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  datasets: Dataset[];
  adHocPinnedIds: string[];
  pinDataset: (datasetId: string) => void;
  unpinDataset: (datasetId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project | null>(null); // Default to null for ad-hoc
  const [adHocPinnedIds, setAdHocPinnedIds] = useState<string[]>([]);
  const [datasets] = useState<Dataset[]>(MOCK_DATASETS);

  const pinDataset = (datasetId: string) => {
    if (currentProject) {
      if (currentProject.pinnedDatasetIds.includes(datasetId)) return;
      const updatedProject = {
        ...currentProject,
        pinnedDatasetIds: [...currentProject.pinnedDatasetIds, datasetId]
      };
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      setCurrentProject(updatedProject);
    } else {
      if (adHocPinnedIds.includes(datasetId)) return;
      setAdHocPinnedIds(prev => [...prev, datasetId]);
    }
  };

  const unpinDataset = (datasetId: string) => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        pinnedDatasetIds: currentProject.pinnedDatasetIds.filter(id => id !== datasetId)
      };
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      setCurrentProject(updatedProject);
    } else {
      setAdHocPinnedIds(prev => prev.filter(id => id !== datasetId));
    }
  };

  return (
    <AppContext.Provider value={{ 
      projects, 
      currentProject, 
      setCurrentProject, 
      datasets,
      adHocPinnedIds,
      pinDataset,
      unpinDataset
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
