import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';


interface TaskState {
  tasks: Task[];
  addTask: (title: string, about: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  loadTasks: () => Promise<void>;
}

// Storage key
const TASKS_STORAGE_KEY = '@todo_tasks';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  
  addTask: (title: string, about: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      about,
      completed: false,
      createdAt: new Date(),
    };
    
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      // Save to AsyncStorage
      AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  
  toggleTask: (id: string) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // Save to AsyncStorage
      AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  
  deleteTask: (id: string) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      // Save to AsyncStorage
      AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  
  loadTasks: async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        set({ tasks: parsedTasks });
      }
    } catch (error) {
      console.error('Failed to load tasks from storage', error);
    }
  },
}));