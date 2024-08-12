// TaskModalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TaskModel } from '../model/TaskModel';
// Define the type for the task da

// Define the type for the context
interface TaskModalContextType {
  isModalOpen: boolean;
  modalMode: 'create' | 'edit';
  taskData: TaskModel | null;
  openModal: (mode: 'create' | 'edit', task?: TaskModel) => void;
  closeModal: () => void;
}

// Create the context with default values
const TaskModalContext = createContext<TaskModalContextType | undefined>(undefined);

// Create the provider component
export const TaskModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [taskData, setTaskData] = useState<TaskModel | null>(null);

  const openModal = (mode: 'create' | 'edit', task?: TaskModel) => {
    setModalMode(mode);
    if (task) {
      setTaskData(task);
    } else {
      setTaskData(null); // Reset task data when creating a new task
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskData(null); // Clear task data when closing the modal
  };

  return (
    <TaskModalContext.Provider value={{ isModalOpen, modalMode, taskData, openModal, closeModal }}>
      {children}
    </TaskModalContext.Provider>
  );
};

// Custom hook to use the TaskModalContext
export const useTaskModal = (): TaskModalContextType => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error('useTaskModal must be used within a TaskModalProvider');
  }
  return context;
};