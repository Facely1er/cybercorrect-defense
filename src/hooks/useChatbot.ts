import { useContext } from 'react';
import { ChatbotContext } from '../components/chat/ChatbotProvider';

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};