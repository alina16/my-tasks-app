import { render, screen, fireEvent } from '@testing-library/react';
// import React, { useState } from 'react';
import { TaskStatus } from 'components/taskForm';
import { TaskCard } from '..';

const mockedTask = {
    name: 'mockedName', 
    description: '', 
    deadline: new Date(), 
    images: [], 
    id: 'id',
    status: TaskStatus.DONE,
};
const mockedHandleFunc = jest.fn();

describe("TaskCard", () => {  

    describe("editButton", () => {
        it('editButton should be rendered', async() => {
            render(<TaskCard task={mockedTask} handleEdit={mockedHandleFunc} handleRemove={mockedHandleFunc} />);
            const moreIcon = screen.getByTestId(/MoreVertIcon/i);
            fireEvent.click(moreIcon);
            const editButton = await screen.findByTestId(/editButton/i) as HTMLInputElement;
    
            expect(editButton).toBeInTheDocument();
        });

        it('editButton should be clickable', async() => {
            render(<TaskCard task={mockedTask} handleEdit={mockedHandleFunc} handleRemove={mockedHandleFunc} />);
            const moreIcon = screen.getByTestId(/MoreVertIcon/i);
            fireEvent.click(moreIcon);
            const editButton = await screen.findByTestId(/editButton/i) as HTMLInputElement;
            fireEvent.click(editButton);
            
            expect(mockedHandleFunc).toHaveBeenCalled();
        });
    })

    describe("removeButton", () => {
        it('removeButton should be rendered', async() => {
            render(<TaskCard task={mockedTask} handleEdit={mockedHandleFunc} handleRemove={mockedHandleFunc} />);
            const moreIcon = screen.getByTestId(/MoreVertIcon/i);
            fireEvent.click(moreIcon);
            const removeButton = await screen.findByTestId(/removeButton/i) as HTMLInputElement;
    
            expect(removeButton).toBeInTheDocument();
        });

        it('removeButton should be clickable', async() => {
            render(<TaskCard task={mockedTask} handleEdit={mockedHandleFunc} handleRemove={mockedHandleFunc} />);
            const moreIcon = screen.getByTestId(/MoreVertIcon/i);
            fireEvent.click(moreIcon);
            const removeButton = await screen.findByTestId(/removeButton/i) as HTMLInputElement;
            fireEvent.click(removeButton);
            
            expect(mockedHandleFunc).toHaveBeenCalled();
        });
    })
});