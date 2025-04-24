export interface Task {
  id: string;
  title: string;
  about: string; // Added description field
  completed: boolean;
  createdAt: Date;
}