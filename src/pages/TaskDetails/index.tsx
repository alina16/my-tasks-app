import { TaskForm } from 'components/taskForm';
import { ITask, TASKS_KEY } from 'pages/TasksList';
import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'

export const TaskDetails = () => {
    const params = useParams();
    const [task, setTask] = useState<ITask>()

    useEffect(() => {
        const tasks = localStorage.getItem(TASKS_KEY);
    
        if(tasks && params?.id) {
            const task = (JSON.parse(tasks) as ITask[]).find(({ id }) => id === params.id);

            if(task) {
                setTask(task);
            }        
        }
    }, [params?.id]);

    return (
        <Container>
            <TaskForm task={task} disabled={true} />
        </Container>
    );
}