import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DateTimePicker } from '../DateTimePicker';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('DateTimePicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label when provided', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
        label="Interview Date & Time"
      />
    );

    expect(screen.getByText('Interview Date & Time')).toBeInTheDocument();
  });

  it('shows required indicator when required is true', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
        label="Interview Date & Time"
        required={true}
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange when date is selected', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '2024-12-25T14:30' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
        error="Please select a valid date"
      />
    );

    expect(screen.getByText('Please select a valid date')).toBeInTheDocument();
  });

  it('displays description when provided', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
        description="Choose when the interview will take place"
      />
    );

    expect(screen.getByText('Choose when the interview will take place')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <DateTimePicker
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows business hours warning for non-business hours', () => {
    // Mock a date outside business hours (7 AM)
    const earlyMorningDate = new Date();
    earlyMorningDate.setHours(7, 0, 0, 0);

    render(
      <DateTimePicker
        onChange={mockOnChange}
        value={earlyMorningDate.toISOString()}
      />
    );

    expect(screen.getByText('recruiterInterviews.validation.scheduledAt.businessHours')).toBeInTheDocument();
  });
});
