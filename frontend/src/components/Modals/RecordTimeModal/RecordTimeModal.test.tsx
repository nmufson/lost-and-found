import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecordTimeModal from './RecordTimeModal';
import formatTime from '../../../utils/formatTime';
import '@testing-library/jest-dom';

describe('RecordTimeModal', () => {
  const mockHandleSubmitScore = vi.fn();
  const defaultProps = {
    handleSubmitScore: mockHandleSubmitScore,
    time: 1234,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with correct time', () => {
    render(<RecordTimeModal {...defaultProps} />);

    expect(screen.getByText('You Found Everyone!')).toBeInTheDocument();
    expect(screen.getByText(formatTime(1234))).toBeInTheDocument();
  });

  it('disables submit button when username is invalid', () => {
    render(<RecordTimeModal {...defaultProps} />);
    const submitButton = screen.getByText('Submit Score');

    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when username is valid', async () => {
    render(<RecordTimeModal {...defaultProps} />);

    const input = screen.getByPlaceholderText('username');
    await userEvent.type(input, 'validUsername');

    const submitButton = screen.getByText('Submit Score');
    expect(submitButton).toBeEnabled();
  });

  it('shows error message for invalid username', async () => {
    render(<RecordTimeModal {...defaultProps} />);

    const input = screen.getByPlaceholderText('username');
    await userEvent.type(input, 'a');

    expect(screen.getByText(/username must be at least/i)).toBeInTheDocument();
  });

  it('calls handleSubmitScore with username when submitted', async () => {
    render(<RecordTimeModal {...defaultProps} />);

    const input = screen.getByPlaceholderText('username');
    await userEvent.type(input, 'validUsername');

    const submitButton = screen.getByText('Submit Score');
    await userEvent.click(submitButton);

    expect(mockHandleSubmitScore).toHaveBeenCalledWith('validUsername');
  });
});
