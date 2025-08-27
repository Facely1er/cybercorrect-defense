import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { toast, subscribeToToasts, type ToastData } from '../../lib/toast';

type ToastProps = {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
};

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  type = 'default',
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-success-green/90 text-white dark:bg-dark-success/90 dark:text-white';
      case 'error':
        return 'bg-alert-coral/90 text-white dark:bg-dark-alert/90 dark:text-white';
      case 'warning':
        return 'bg-premium-gold/90 text-gray-900 dark:bg-dark-premium/90 dark:text-gray-900';
      case 'info':
        return 'bg-secondary-teal/90 text-white dark:bg-dark-primary/90 dark:text-white';
      default:
        return 'bg-primary-teal/90 text-white dark:bg-dark-primary/90 dark:text-white';
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg shadow-lg p-4 mb-3 animate-in slide-in-from-right',
        getTypeClasses()
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {description && <p className="text-xs mt-1">{description}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};



export const Toaster: React.FC = () => {
  const [localToasts, setLocalToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((updatedToasts: ToastData[]) => {
      setLocalToasts(updatedToasts);
    });
    
    return unsubscribe;
  }, []);

  const handleClose = (id: string) => {
    toast.dismiss(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-72">
      {localToasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};
