import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Task, UserProgress, Achievement } from '@/types';
import { INITIAL_TASKS, ACHIEVEMENTS } from '@/types';

interface ProgressContextType {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  updateTaskHours: (taskId: string, hours: number) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (taskId: string) => void;
  getBlockProgress: () => { blockId: string; blockName: string; total: number; completed: number; inProgress: number; totalHours: number; spentHours: number; color: string; progress: number }[];
  getOverallProgress: () => { total: number; completed: number; inProgress: number; totalHours: number; spentHours: number; percentage: number };
  unlockedAchievements: Achievement[];
  totalHoursSpent: number;
  streakDays: number;
  lastVisited: string;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = 'pris_progress';

function loadProgress(): UserProgress {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    tasks: INITIAL_TASKS,
    lastVisited: new Date().toISOString(),
    totalHoursSpent: 0,
    streakDays: 1,
    achievements: [],
  };
}

function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    // Update last visited and streak on mount
    const now = new Date();
    const lastVisit = new Date(progress.lastVisited);
    const diffDays = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    let newStreak = progress.streakDays;
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    const updated = {
      ...progress,
      lastVisited: now.toISOString(),
      streakDays: newStreak,
    };
    setProgress(updated);
    saveProgress(updated);
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const updateTaskStatus = useCallback((taskId: string, status: Task['status']) => {
    setProgress(prev => {
      const updatedTasks = prev.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status,
            completedAt: status === 'done' ? new Date().toISOString() : undefined,
          };
        }
        return task;
      });
      return { ...prev, tasks: updatedTasks };
    });
  }, []);

  const updateTaskHours = useCallback((taskId: string, hours: number) => {
    setProgress(prev => {
      const updatedTasks = prev.tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, spentHours: hours };
        }
        return task;
      });
      const totalSpent = updatedTasks.reduce((sum, t) => sum + t.spentHours, 0);
      return { ...prev, tasks: updatedTasks, totalHoursSpent: totalSpent };
    });
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    setProgress(prev => {
      const newTask: Task = {
        ...task,
        id: `TASK-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      return { ...prev, tasks: [...prev.tasks, newTask] };
    });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setProgress(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId),
    }));
  }, []);

  const getBlockProgress = useCallback(() => {
    const blocks = [
      { id: 'data', name: 'Data Pipeline', color: '#3b82f6' },
      { id: 'predictor', name: 'Predictor Engine', color: '#10b981' },
      { id: 'modeling', name: 'Modeling Engine', color: '#8b5cf6' },
      { id: 'optimization', name: 'Optimization Engine', color: '#f59e0b' },
      { id: 'interface', name: 'Interface Layer', color: '#ef4444' },
    ];

    return blocks.map(block => {
      const blockTasks = progress.tasks.filter(t => t.block === block.id);
      const completed = blockTasks.filter(t => t.status === 'done').length;
      const inProgress = blockTasks.filter(t => t.status === 'progress').length;
      const totalHours = blockTasks.reduce((sum, t) => sum + t.estimatedHours, 0);
      const spentHours = blockTasks.reduce((sum, t) => sum + t.spentHours, 0);
      const progressPct = blockTasks.length > 0 ? (completed / blockTasks.length) * 100 : 0;

      return {
        blockId: block.id,
        blockName: block.name,
        total: blockTasks.length,
        completed,
        inProgress,
        totalHours,
        spentHours,
        color: block.color,
        progress: progressPct,
      };
    });
  }, [progress.tasks]);

  const getOverallProgress = useCallback(() => {
    const total = progress.tasks.length;
    const completed = progress.tasks.filter(t => t.status === 'done').length;
    const inProgress = progress.tasks.filter(t => t.status === 'progress').length;
    const totalHours = progress.tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
    const spentHours = progress.tasks.reduce((sum, t) => sum + t.spentHours, 0);
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, inProgress, totalHours, spentHours, percentage };
  }, [progress.tasks]);

  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.condition(progress));

  return (
    <ProgressContext.Provider
      value={{
        tasks: progress.tasks,
        updateTaskStatus,
        updateTaskHours,
        addTask,
        deleteTask,
        getBlockProgress,
        getOverallProgress,
        unlockedAchievements,
        totalHoursSpent: progress.totalHoursSpent,
        streakDays: progress.streakDays,
        lastVisited: progress.lastVisited,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
