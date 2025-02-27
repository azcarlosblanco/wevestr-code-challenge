export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
}

export interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} 