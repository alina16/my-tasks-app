import { render, screen, fireEvent } from '@testing-library/react';
import { TasksList } from '..';

describe("TasksList", () => {
    it('should render addTaskButton', () => {
        render(<TasksList />);
        const addButton = screen.getByText(/Add task/i);
        expect(addButton).toBeInTheDocument();
    });

    it('should render addTask modal after add task button is clicked', async() => {
        render(<TasksList />);
        const addButton = screen.getByText(/Add task/i);
        fireEvent.click(addButton);
        const addTaskModal = await screen.findByTestId(/addTaskModal/i);
        expect(addTaskModal).toBeInTheDocument();
    });
});