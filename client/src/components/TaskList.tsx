import { useSelector, useDispatch } from 'react-redux';
import { List, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { TaskItem } from './TaskItem';
import { deleteTask, updateTask } from '../features/tasks/tasksSlice';
import type { Task } from '../types/task';
import { useState } from 'react';

export const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleToggleComplete = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete !== null) {
      dispatch(deleteTask(taskToDelete));
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  return (
    <>
      <List>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteClick}
          />
        ))}
      </List>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 