import { Request, Response, NextFunction } from 'express';
import TaskModel from '../models/Task';
import { TaskInput } from '../types/task';

const taskController = {
  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskModel.getById(Number(req.params.id));
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskData: TaskInput = req.body;
      if (!taskData.title) {
        return res.status(400).json({ message: 'Title is required' });
      }
      const task = await TaskModel.create(taskData);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskModel.getById(Number(req.params.id));
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const updatedTask = await TaskModel.update(Number(req.params.id), req.body);
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskModel.getById(Number(req.params.id));
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await TaskModel.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

export default taskController; 