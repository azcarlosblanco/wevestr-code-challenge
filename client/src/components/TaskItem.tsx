import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Task } from '../types/task';
import { updateTask } from '../features/tasks/tasksSlice';
import type { AppDispatch } from '../store';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateTask({
          ...task,
          title: editedTitle,
          description: editedDescription,
        })
      );
      setIsEditing(false);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box>
          {isEditing ? (
            <IconButton edge="end" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          ) : (
            <>
              <IconButton edge="end" onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => onDelete(task.id!)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      }
    >
      <Checkbox
        edge="start"
        checked={task.completed}
        onChange={() => onToggleComplete(task)}
      />
      {isEditing ? (
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            margin="dense"
            multiline
            rows={2}
            placeholder="Description"
          />
        </Box>
      ) : (
        <ListItemText
          primary={
            <Typography
              component="span"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </Typography>
          }
          secondary={task.description}
        />
      )}
    </ListItem>
  );
}; 