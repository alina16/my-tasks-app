import React, { useEffect, useState, useId } from 'react';
import { Container } from '@material-ui/core';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskForm, TaskStatus } from 'components/taskForm';
import { TaskCard } from 'components/taskCard';

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export interface ITask {
    name: string;
    description: string;
    deadline: Date;
    images: string[];  
    status: ITaskStatus;
    id: string;
};

export type ITaskStatus = TaskStatus.TODO | TaskStatus.IN_PROGRESS | TaskStatus.DONE;

const StyledAddButton = styled(Button)(() => ({
    position: 'absolute',
    top: '10px',
    right: '24px',
    zIndex: '1',
    cursor: 'pointer',
}));

export const TASKS_KEY = 'tasks';

export const TasksList = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editItemId, setEditItemId] = useState<string>('');
    
    useEffect(() => {
        const tasksData = localStorage.getItem(TASKS_KEY);
        if(tasksData) {
            setTasks(JSON.parse(tasksData));
        }
    }, []);

    useEffect(() => {
        if(editItemId) {
            setOpenDialog(true)
        }
    }, [editItemId]);

    const handleRemoveTask = (taskId: string) => {
        const newTasks = tasks.filter(({ id }) => id !== taskId);

        setTasks(newTasks);
        localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
    }

    const getTasksItemsByStatus = (status: ITaskStatus) => 
        tasks.filter((task) => task.status === status).map(((task) => (
                <TaskCard 
                    key={task.id}
                    task={task} 
                    handleRemove={() => handleRemoveTask(task.id)}
                    handleEdit={() => setEditItemId(task.id)} 
                />
            )
        ));

    const handleAddTask = (task: ITask) => {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
        setOpenDialog(false);
    }

    const handleEditTask = (newTask: ITask) => {
        const newTasks = tasks.map((task) => task.id === editItemId ? newTask : task);
        setTasks(newTasks);
        localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
        setOpenDialog(false);
        setEditItemId('');
    }

    const taskFormProps = {
        handleSubmit: editItemId ? handleEditTask : handleAddTask,
        title: `${editItemId ? 'Edit' : 'Add new'} task`,
        ...editItemId && ({ task: tasks.find(({ id }) => id === editItemId) }),
    };
        
    return (
        <Container>
            <StyledAddButton variant="contained" onClick={() => setOpenDialog(true)}>Add task</StyledAddButton>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>{TaskStatus.TODO}</Typography>
                    <List>{getTasksItemsByStatus(TaskStatus.TODO)}</List>
                </Grid>
                <Grid item xs={4}>
                    <Typography>{TaskStatus.IN_PROGRESS}</Typography>
                    <List>{getTasksItemsByStatus(TaskStatus.IN_PROGRESS)}</List>
                </Grid>
                <Grid item xs={4}>
                    <Typography>{TaskStatus.DONE}</Typography>
                    <List>{getTasksItemsByStatus(TaskStatus.DONE)}</List>
                </Grid>
            </Grid>
            <Modal
                data-testid='addTaskModal'
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <TaskForm {...taskFormProps} />
                </Box>
            </Modal>
      </Container>
    );
}