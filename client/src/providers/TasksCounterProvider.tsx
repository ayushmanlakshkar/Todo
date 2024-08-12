import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TaskModel } from '../model/TaskModel';

interface TaskCounterContextProps {
  totalTodoCount: number
  todoCount: number;
  onProgressCount: number;
  doneCount: number;
  expiredCount: number;
  refreshTaskCounts: () => void;
}

const TaskCounterContext = createContext<TaskCounterContextProps | undefined>(undefined);

export const useTaskCounter = () => {
  const context = useContext(TaskCounterContext);
  if (!context) {
    throw new Error('useTaskCounter must be used within a TaskCounterProvider');
  }
  return context;
};

export const TaskCounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todoCount, setTodoCount] = useState(0);
  const [onProgressCount, setOnProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [totalTodoCount, setTotalTodoCount] = useState(0);

  const refreshTaskCounts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/tasks`);
      const tasks: TaskModel[] = response.data;

      setTodoCount(tasks.filter(task => task.status === 'To Do').length);
      setOnProgressCount(tasks.filter(task => task.status === 'In Progress').length);
      setDoneCount(tasks.filter(task => task.status === 'Done').length);
      setTotalTodoCount(tasks.length);
      const now = new Date();
      setExpiredCount(tasks.filter(task => new Date(task.deadline) < now).length);
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  useEffect(() => {
    refreshTaskCounts();
  }, []);

  return (
    <TaskCounterContext.Provider value={{ todoCount, onProgressCount, doneCount, expiredCount, totalTodoCount, refreshTaskCounts }}>
      {children}
    </TaskCounterContext.Provider>
  );
};
