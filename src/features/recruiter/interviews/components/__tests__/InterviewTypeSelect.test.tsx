import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { InterviewTypeSelect } from "../InterviewTypeSelect";
import { InterviewType } from "../../types";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("InterviewTypeSelect", () => {
  const mockOnValueChange = vi.fn();

  beforeEach(() => {
    mockOnValueChange.mockClear();
  });

  it("renders with placeholder when no value is selected", () => {
    render(
      <InterviewTypeSelect
        onValueChange={mockOnValueChange}
        placeholder="Select interview type"
      />
    );

    expect(screen.getByText("Select interview type")).toBeInTheDocument();
  });

  it("displays selected value with icon", () => {
    render(
      <InterviewTypeSelect
        value={InterviewType.VIDEO}
        onValueChange={mockOnValueChange}
      />
    );

    expect(
      screen.getByText("recruiterInterviews.type.video")
    ).toBeInTheDocument();
  });

  it("calls onValueChange when option is selected", () => {
    render(
      <InterviewTypeSelect
        onValueChange={mockOnValueChange}
        placeholder="Select interview type"
      />
    );

    // Open the select
    fireEvent.click(screen.getByRole("combobox"));

    // Click on phone option
    fireEvent.click(screen.getByText("recruiterInterviews.type.phone"));

    expect(mockOnValueChange).toHaveBeenCalledWith(InterviewType.PHONE);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <InterviewTypeSelect onValueChange={mockOnValueChange} disabled={true} />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("renders all interview type options", () => {
    render(<InterviewTypeSelect onValueChange={mockOnValueChange} />);

    // Open the select
    fireEvent.click(screen.getByRole("combobox"));

    // Check all options are present (only 3 basic types)
    expect(
      screen.getByText("recruiterInterviews.type.phone")
    ).toBeInTheDocument();
    expect(
      screen.getByText("recruiterInterviews.type.video")
    ).toBeInTheDocument();
    expect(
      screen.getByText("recruiterInterviews.type.in_person")
    ).toBeInTheDocument();
  });
});
