import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import taskRoutes from './routes/taskRoutes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

export default app; 