import React, { useState, useEffect, useId, useMemo } from 'react';
import { ITask, ITaskStatus } from 'pages/TasksList';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';

export const enum TaskStatus {
    TODO = 'Todo',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done', 
};

export interface ITaskFormProps {
    task?: ITask;
    title?: string;
    handleSubmit?: (data: ITask) => void;
    disabled?: boolean;
}

const inputStyle = {
    width: '100%',
    marginBottom: '15px',
};

const StyledTextField = styled(TextField)(() => (inputStyle));
const StyledSelect = styled(Select)(() => (inputStyle));
const StyledButton = styled(Button)(() => ({
    display: 'flex',
    margin: '10px auto',
}))

const ImageSrc = styled('span')({
    width: '50px',
    height: '50px',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    marginRight: '10px',
});

export const TaskForm = ({ task, title = '', handleSubmit, disabled = false }: ITaskFormProps) => {
    const initialTask = {
        name: '',
        description: '',
        deadline: new Date(),
        images: [],
        status: TaskStatus.TODO,
        id: useId(),
    };
    const [taskData, setTaskData] = useState<ITask>(initialTask);
    
    const handleChangeDeadline = (newValue: Dayjs | null) => {
        setTaskData({
            ...taskData,
            deadline: dayjs(newValue).toDate(),
        })
    };

    useEffect(() => {
        if(task) {
            setTaskData(task);
        }
    }, [task]);

    const handleChangeStatus = (event: SelectChangeEvent<unknown>) => {
        setTaskData({
            ...taskData,
            status: event.target.value as ITaskStatus,
        })
    };

    const handleChangeTaskData = (e: React.SyntheticEvent<EventTarget>, field: string) => {
        e.stopPropagation();
        setTaskData({
            ...taskData,
            [field]: (e.target as HTMLInputElement).value,
        })
    }

    const handleChangeImages = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        const files = (e.target as HTMLInputElement).files;

        if(files){
            setTaskData({
                ...taskData,
                images: [ ...taskData.images, URL.createObjectURL(files[0])],
            });
        }
    }

    return (
        <>
            <Typography variant="h6" gutterBottom> {title} </Typography>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if(handleSubmit) {
                        handleSubmit(taskData)
                    }
                }}
            >
                <StyledTextField 
                    inputProps={{ "data-testid": 'nameInput' }}
                    disabled={disabled}
                    value={taskData.name}
                    onChange={(e) => handleChangeTaskData(e, 'name')} 
                    label="Name" 
                    required 
                />
                <StyledTextField 
                    inputProps={{ "data-testid": 'descriptionInput' }}
                    disabled={disabled}
                    value={taskData.description} 
                    onChange={(e) => handleChangeTaskData(e, 'description')} 
                    label="Description" 
                    required 
                />
                <StyledSelect
                    inputProps={{ "data-testid": 'statusInput' }}
                    disabled={disabled}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={taskData.status}
                    label="Status"
                    onChange={handleChangeStatus}
                >
                    <MenuItem value={TaskStatus.TODO}>{TaskStatus.TODO}</MenuItem>
                    <MenuItem value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</MenuItem>
                    <MenuItem value={TaskStatus.DONE}>{TaskStatus.DONE}</MenuItem>
                </StyledSelect>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'Deadline'}}
                >
                    <DesktopDatePicker
                        disabled={disabled}
                        label="Deadline"
                        inputFormat="MM/DD/YYYY"
                        value={task?.deadline}
                        data-testId="deadlineInput"
                        onChange={handleChangeDeadline}
                        renderInput={(params) => <StyledTextField inputProps={{"data-testid": 'deadlineInput'}} disabled={disabled} required {...params} />}
                    />
                </LocalizationProvider>
                {!disabled && <Button variant="contained" component="label">
                    Upload
                    <input disabled={disabled} hidden accept="image/*" onChange={handleChangeImages} multiple type="file" />
                </Button>}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 100, width: '100%', margin: '10px 0' }}>
                    {taskData.images.map(image =>  <ImageSrc key={image} style={{ backgroundImage: `url(${image})` }} />)}
                </Box>
                {!disabled && <StyledButton variant="contained" type="submit">Submit</StyledButton>}
            </form>
      </>
    )
}