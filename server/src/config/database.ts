import sqlite3 from 'sqlite3';
import path from 'path';

const isTest = process.env.NODE_ENV === 'test';
const dbPath = path.resolve(__dirname, isTest ? '../../test-database.sqlite' : '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log(`Connected to SQLite database (${isTest ? 'test' : 'development'})`);
    createTasksTable();
  }
});

function createTasksTable(): void {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err);
    } else {
      console.log('Tasks table ready');
    }
  });
}

export default db; 