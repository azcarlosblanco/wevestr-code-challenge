import request from 'supertest';
import app from '../app';
import db from '../config/database';
import { Server } from 'http';

let server: Server;

describe('Task Routes', () => {
  beforeAll(async () => {
    server = app.listen(5001); // Use a different port for testing
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    // Clean up database
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks', (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
    server.close();
  });

  let taskId: number;

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.description).toBe('Test Description');

      taskId = response.body.id;
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          description: 'Test Description'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Title is required');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task', async () => {
      const response = await request(app).get(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(taskId);
      expect(response.body.title).toBe('Test Task');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/9999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({
          title: 'Updated Task',
          description: 'Updated Description',
          completed: true
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Task');
      expect(response.body.description).toBe('Updated Description');
      expect(response.body.completed).toBe(true);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/9999')
        .send({
          title: 'Updated Task',
          description: 'Updated Description'
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const response = await request(app).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/9999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Task not found');
    });
  });
}); 