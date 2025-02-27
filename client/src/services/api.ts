import axios from 'axios';
import { Task } from '../types/task';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  getTasks: async () => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>) => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (task: Task) => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${task.id}`, task);
    return response.data;
  },

  deleteTask: async (id: number) => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return id;
  }
}; 