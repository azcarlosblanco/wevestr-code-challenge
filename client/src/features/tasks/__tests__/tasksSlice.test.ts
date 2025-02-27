import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask
} from '../tasksSlice';
import { api } from '../../../services/api';
import type { RootState } from '../../../store';
import type { TaskState } from '../../../types/task';

// Mock the API service
jest.mock('../../../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Tasks Slice', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false
  };

  let store: ReturnType<typeof configureStore<{tasks: TaskState}>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer
      }
    });
  });

  describe('fetchTasks', () => {
    it('should handle successful task fetch', async () => {
      mockedApi.getTasks.mockResolvedValueOnce([mockTask]);

      await store.dispatch(fetchTasks());
      const state = store.getState().tasks;

      expect(state.status).toBe('succeeded');
      expect(state.tasks).toEqual([mockTask]);
      expect(state.error).toBeNull();
    });

    it('should handle failed task fetch', async () => {
      const error = new Error('Failed to fetch');
      mockedApi.getTasks.mockRejectedValueOnce(error);

      await store.dispatch(fetchTasks());
      const state = store.getState().tasks;

      expect(state.status).toBe('failed');
      expect(state.error).toBe(error.message);
    });
  });

  describe('addTask', () => {
    it('should handle successful task creation', async () => {
      const newTask = { title: 'New Task', description: 'New Description', completed: false };
      mockedApi.createTask.mockResolvedValueOnce({ ...newTask, id: 2 });

      await store.dispatch(addTask(newTask));
      const state = store.getState().tasks;

      expect(state.status).toBe('succeeded');
      expect(state.tasks).toContainEqual({ ...newTask, id: 2 });
    });
  });

  describe('updateTask', () => {
    it('should handle successful task update', async () => {
      const updatedTask = { ...mockTask, title: 'Updated Task' };
      mockedApi.updateTask.mockResolvedValueOnce(updatedTask);

      // First add the original task
      store = configureStore({
        reducer: {
          tasks: tasksReducer
        },
        preloadedState: {
          tasks: {
            tasks: [mockTask],
            status: 'idle',
            error: null
          }
        } as RootState
      });

      await store.dispatch(updateTask(updatedTask));
      const state = store.getState().tasks;

      expect(state.status).toBe('succeeded');
      expect(state.tasks[0]).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should handle successful task deletion', async () => {
      mockedApi.deleteTask.mockResolvedValueOnce(mockTask.id);

      // First add the task to be deleted
      store = configureStore({
        reducer: {
          tasks: tasksReducer
        },
        preloadedState: {
          tasks: {
            tasks: [mockTask],
            status: 'idle' as const,
            error: null
          }
        }
      });

      await store.dispatch(deleteTask(mockTask.id));
      const state = store.getState().tasks;

      expect(state.status).toBe('succeeded');
      expect(state.tasks).toHaveLength(0);
    });
  });
}); 