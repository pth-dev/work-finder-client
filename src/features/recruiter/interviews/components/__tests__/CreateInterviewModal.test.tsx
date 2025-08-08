import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateInterviewModal } from "../CreateInterviewModal";
import { ApiApplication } from "../../../applications/types";
import { ApplicationStatus } from "../../../applications/types";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      if (params) {
        return key.replace(
          /\{\{(\w+)\}\}/g,
          (match, param) => params[param] || match
        );
      }
      return key;
    },
  }),
}));

// Mock the interview mutations hook
vi.mock("../../hooks/useInterviewMutations", () => ({
  useCreateInterview: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

// Mock child components
vi.mock("../CreateInterviewForm", () => ({
  CreateInterviewForm: ({ onSubmit, onCancel }: any) => (
    <div data-testid="create-interview-form">
      <button
        onClick={() =>
          onSubmit({
            interview_type: "video",
            scheduled_at: "2024-12-25T14:30:00Z",
            duration_minutes: 60,
          })
        }
      >
        Submit
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

const mockApplication: ApiApplication = {
  application_id: 1,
  job_post: {
    job_id: 1,
    job_title: "Software Engineer",
    company: {
      company_id: 1,
      company_name: "Test Company",
    },
  },
  resume: {
    resume_id: 1,
    user: {
      user_id: 1,
      full_name: "John Doe",
      email: "john@example.com",
    },
  },
  status: ApplicationStatus.REVIEWING,
  applied_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

describe("CreateInterviewModal", () => {
  const mockOnClose = vi.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    mockOnClose.mockClear();
  });

  const renderModal = (isOpen = true) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <CreateInterviewModal
          isOpen={isOpen}
          onClose={mockOnClose}
          application={mockApplication}
        />
      </QueryClientProvider>
    );
  };

  it("renders modal when open", () => {
    renderModal(true);

    expect(
      screen.getByText("recruiterInterviews.createModal.title")
    ).toBeInTheDocument();
    expect(screen.getByTestId("create-interview-form")).toBeInTheDocument();
  });

  it("does not render modal when closed", () => {
    renderModal(false);

    expect(
      screen.queryByText("recruiterInterviews.createModal.title")
    ).not.toBeInTheDocument();
  });

  it("displays candidate name and job title in subtitle", () => {
    renderModal(true);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    renderModal(true);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("handles form submission", async () => {
    renderModal(true);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("resets form when modal is closed and reopened", () => {
    const { rerender } = renderModal(true);

    // Close modal
    rerender(
      <QueryClientProvider client={queryClient}>
        <CreateInterviewModal
          isOpen={false}
          onClose={mockOnClose}
          application={mockApplication}
        />
      </QueryClientProvider>
    );

    // Reopen modal
    rerender(
      <QueryClientProvider client={queryClient}>
        <CreateInterviewModal
          isOpen={true}
          onClose={mockOnClose}
          application={mockApplication}
        />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("create-interview-form")).toBeInTheDocument();
  });
});
