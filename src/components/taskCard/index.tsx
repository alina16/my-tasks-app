import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITask } from 'pages/TasksList';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export interface ITaskCardProps {
    task: ITask;
    handleEdit: () => void;
    handleRemove: () => void;
}

const StyledEditButton = styled(EditIcon)(() => ({
    display: 'inline-block',
    marginLeft: '10px',
    position: 'relative',
    top: '5px',
    cursor: 'pointer',
}));
const StyledRemoveButton = styled(DeleteIcon)(()=> ({
    display: 'inline-block',
    marginLeft: '10px',
    position: 'relative',
    top: '5px',
    cursor: 'pointer',
}));

const StyledCard = styled(Card)(() => ({
    marginBottom: '10px',

    '& img': {
        width: '50px',
        display: 'inline-flex',
        margin: '10px',
    }
}))

const StyledLink = styled(Link)(() => ({
    textDecoration: 'none',
}))

export const TaskCard = ({ task: { name, description, deadline, images, id }, handleEdit, handleRemove }: ITaskCardProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popopverId = open ? 'simple-popover' : undefined;
    const deadlineDate =  typeof deadline === 'string' ? new Date(deadline) : deadline;

    return (
        <StyledCard sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-describedby={popopverId} onClick={handleClick} aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<StyledLink data-testid='taskCardName' href={`/tasks/${id}`}>{name}</StyledLink>}
                subheader={deadlineDate.toLocaleDateString()}
            />
                  <Popover
                    id={popopverId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <Typography style={{ margin: '10px' }}>
                        Edit task
                        <StyledEditButton data-testid='editButton' onClick={handleEdit} />
                    </Typography>
                    <Typography style={{ margin: '10px' }}>
                        Remove task
                        <StyledRemoveButton data-testid='removeButton' onClick={handleRemove} />
                    </Typography>
                </Popover>
            {
                images.map(image => (
                    <CardMedia
                        key={image}
                        component="img"
                        height="50"
                        width="50"
                        image={image}
                        alt="task image"
                    />
                ))
            }
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                        {description}
                </Typography>
            </CardContent>
      </StyledCard>
    );
}