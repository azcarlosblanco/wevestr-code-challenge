import db from '../config/database';
import { Task, TaskInput } from '../types/task';

class TaskModel {
  static getAll(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      db.all<Task>('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static getById(id: number): Promise<Task | undefined> {
    return new Promise((resolve, reject) => {
      db.get<Task>('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static create(taskData: TaskInput): Promise<Task> {
    return new Promise((resolve, reject) => {
      const { title, description } = taskData;
      db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function(err) {
          if (err) reject(err);
          resolve({ id: this.lastID, title, description });
        }
      );
    });
  }

  static update(id: number, taskData: TaskInput): Promise<Task> {
    return new Promise((resolve, reject) => {
      const { title, description, completed } = taskData;
      db.run(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completed, id],
        function(err) {
          if (err) reject(err);
          resolve({ id, title, description, completed });
        }
      );
    });
  }

  static delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

export default TaskModel; 