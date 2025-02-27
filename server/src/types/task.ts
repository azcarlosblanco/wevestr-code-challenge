export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
  created_at?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  completed?: boolean;
} 