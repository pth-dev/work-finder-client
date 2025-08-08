import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  updateInterviewStatus,
  bulkUpdateInterviewStatus,
  createInterview,
  updateInterview,
  deleteInterview,
  rescheduleInterview,
  sendInterviewReminder,
} from "../api";
import { interviewKeys } from "./useInterviews";
import { InterviewStatus, CreateInterviewRequest, UpdateInterviewRequest } from "../types";

// Update interview status
export const useUpdateInterviewStatus = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ interviewId, status }: { interviewId: number; status: InterviewStatus }) =>
      updateInterviewStatus(interviewId, status),
    onSuccess: (data, variables) => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.stats() });
      
      toast.success(
        t("recruiterInterviews.messages.statusUpdated", {
          status: t(`recruiterInterviews.status.${variables.status}`),
        })
      );
    },
    onError: (error) => {
      console.error("Failed to update interview status:", error);
      toast.error(t("recruiterInterviews.errors.updateStatusFailed"));
    },
  });
};

// Bulk update interview status
export const useBulkUpdateInterviews = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ interviewIds, status }: { interviewIds: number[]; status: InterviewStatus }) =>
      bulkUpdateInterviewStatus(interviewIds, status),
    onSuccess: (data, variables) => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.stats() });
      
      toast.success(
        t("recruiterInterviews.messages.bulkUpdateSuccess", {
          count: variables.interviewIds.length,
          status: t(`recruiterInterviews.status.${variables.status}`),
        })
      );
    },
    onError: (error) => {
      console.error("Failed to bulk update interviews:", error);
      toast.error(t("recruiterInterviews.errors.bulkUpdateFailed"));
    },
  });
};

// Create interview
export const useCreateInterview = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: CreateInterviewRequest) => createInterview(data),
    onSuccess: () => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.stats() });
      
      toast.success(t("recruiterInterviews.messages.interviewCreated"));
    },
    onError: (error) => {
      console.error("Failed to create interview:", error);
      toast.error(t("recruiterInterviews.errors.createFailed"));
    },
  });
};

// Update interview
export const useUpdateInterview = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ interviewId, data }: { interviewId: number; data: UpdateInterviewRequest }) =>
      updateInterview(interviewId, data),
    onSuccess: (data) => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.detail(data.interview_id) });
      
      toast.success(t("recruiterInterviews.messages.interviewUpdated"));
    },
    onError: (error) => {
      console.error("Failed to update interview:", error);
      toast.error(t("recruiterInterviews.errors.updateFailed"));
    },
  });
};

// Delete interview
export const useDeleteInterview = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (interviewId: number) => deleteInterview(interviewId),
    onSuccess: () => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.stats() });
      
      toast.success(t("recruiterInterviews.messages.interviewDeleted"));
    },
    onError: (error) => {
      console.error("Failed to delete interview:", error);
      toast.error(t("recruiterInterviews.errors.deleteFailed"));
    },
  });
};

// Reschedule interview
export const useRescheduleInterview = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ 
      interviewId, 
      scheduledAt, 
      notes 
    }: { 
      interviewId: number; 
      scheduledAt: string; 
      notes?: string; 
    }) => rescheduleInterview(interviewId, scheduledAt, notes),
    onSuccess: (data) => {
      // Invalidate and refetch interviews
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() });
      queryClient.invalidateQueries({ queryKey: interviewKeys.detail(data.interview_id) });
      
      toast.success(t("recruiterInterviews.messages.interviewRescheduled"));
    },
    onError: (error) => {
      console.error("Failed to reschedule interview:", error);
      toast.error(t("recruiterInterviews.errors.rescheduleFailed"));
    },
  });
};

// Send interview reminder
export const useSendInterviewReminder = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (interviewId: number) => sendInterviewReminder(interviewId),
    onSuccess: () => {
      toast.success(t("recruiterInterviews.messages.reminderSent"));
    },
    onError: (error) => {
      console.error("Failed to send reminder:", error);
      toast.error(t("recruiterInterviews.errors.reminderFailed"));
    },
  });
};
