import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { fetchTasks } from './features/tasks/tasksSlice';
import type { AppDispatch, RootState } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <TaskForm />
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <TaskList />
    </Container>
  );
}

export default App; 