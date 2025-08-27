import { useContext } from 'react';
import { GuideContext } from '../context/GuideContext';

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};