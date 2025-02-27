import axios from 'axios';
import { api } from '../api';
import { Task } from '../../types/task';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should fetch all tasks', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockTask] });
      
      const result = await api.getTasks();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/api/tasks');
      expect(result).toEqual([mockTask]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'New Description', completed: false };
      mockedAxios.post.mockResolvedValueOnce({ data: { ...newTask, id: 1 } });
      
      const result = await api.createTask(newTask);
      
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/api/tasks', newTask);
      expect(result).toEqual({ ...newTask, id: 1 });
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updatedTask = { ...mockTask, title: 'Updated Task' };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedTask });
      
      const result = await api.updateTask(updatedTask);
      
      expect(mockedAxios.put).toHaveBeenCalledWith(`http://localhost:8000/api/tasks/${updatedTask.id}`, updatedTask);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: null });
      
      const result = await api.deleteTask(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:8000/api/tasks/1');
      expect(result).toBe(1);
    });
  });
}); 