import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm, TaskStatus } from '..';

const mockedSubmit= jest.fn();

describe("TaskForm", () => {
    describe("NameInput", () => {
        it('should render name input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const nameInput = screen.getByLabelText(/name/i);
            expect(nameInput).toBeInTheDocument();
        });
    
        it('should be able to type into name input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const nameInput = screen.getByTestId(/nameInput/i) as HTMLInputElement;
            fireEvent.click(nameInput)
            fireEvent.change(nameInput, { target: { value: "New value" } })
            expect(nameInput.value).toBe("New value");
        });
    });

    describe("DescriptionInput", () => {
        it('should render description input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const descriptionInput = screen.getByLabelText(/description/i);
            expect(descriptionInput).toBeInTheDocument();
        });
    
        it('should be able to type into description input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const descriptionInput = screen.getByTestId(/descriptionInput/i) as HTMLInputElement;
            fireEvent.click(descriptionInput)
            fireEvent.change(descriptionInput, { target: { value: "New value" } })
            expect(descriptionInput.value).toBe("New value");
        });
    });

    describe("StatusInput", () => {
        it('should render status input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const statusInput = screen.getByTestId(/statusInput/);
            expect(statusInput).toBeInTheDocument();
        });
    
        it('should be able to select status', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const statusInput = screen.getByTestId(/statusInput/i) as HTMLInputElement;
            fireEvent.click(statusInput)
            fireEvent.change(statusInput, { target: { value: TaskStatus.DONE } })
            expect(statusInput.value).toBe(TaskStatus.DONE);
        });
    });


    describe("DeadlineInput", () => {
        it('should render deadline input', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const deadlineInput = screen.getByPlaceholderText('mm/dd/yyyy');
            expect(deadlineInput).toBeInTheDocument();
        });
    
        it('should be able to select deadline time', () => {
            render(<TaskForm handleSubmit={mockedSubmit} title='' />);
            const deadlineInput = screen.getByPlaceholderText('mm/dd/yyyy') as HTMLInputElement;
            fireEvent.click(deadlineInput)
            fireEvent.change(deadlineInput, { target: { value: '08/11/2022'} });
            expect(deadlineInput.value).toBe('08/11/2022');
        });
    });
});