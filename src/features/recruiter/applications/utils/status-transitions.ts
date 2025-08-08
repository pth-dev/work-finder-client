import { ApplicationStatus } from "../types";

/**
 * Định nghĩa các transition hợp lệ theo business logic
 */
export const RECRUITER_STATUS_TRANSITIONS: Record<
  ApplicationStatus,
  ApplicationStatus[]
> = {
  [ApplicationStatus.PENDING]: [
    ApplicationStatus.REVIEWING,
    ApplicationStatus.REJECTED,
  ],
  [ApplicationStatus.REVIEWING]: [
    ApplicationStatus.INTERVIEWED,
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
  ],
  [ApplicationStatus.INTERVIEWED]: [
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
  ],
  [ApplicationStatus.ACCEPTED]: [], // Final state
  [ApplicationStatus.REJECTED]: [], // Final state
  [ApplicationStatus.WITHDRAWN]: [], // Final state - can't transition from this
};

/**
 * All valid transitions (including system/applicant transitions)
 * This matches backend logic and includes WITHDRAWN transitions
 */
export const ALL_STATUS_TRANSITIONS: Record<
  ApplicationStatus,
  ApplicationStatus[]
> = {
  [ApplicationStatus.PENDING]: [
    ApplicationStatus.REVIEWING,
    ApplicationStatus.REJECTED,
    ApplicationStatus.WITHDRAWN, // System/applicant can withdraw
  ],
  [ApplicationStatus.REVIEWING]: [
    ApplicationStatus.INTERVIEWED,
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
    ApplicationStatus.WITHDRAWN, // System/applicant can withdraw
  ],
  [ApplicationStatus.INTERVIEWED]: [
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
    ApplicationStatus.WITHDRAWN, // System/applicant can withdraw
  ],
  [ApplicationStatus.ACCEPTED]: [], // Final state
  [ApplicationStatus.REJECTED]: [], // Final state
  [ApplicationStatus.WITHDRAWN]: [], // Final state
};

/**
 * Lấy danh sách các trạng thái hợp lệ mà recruiter có thể chuyển đến
 * Excludes WITHDRAWN as only applicant/system can trigger this
 */
export const getValidNextStatuses = (
  currentStatus: ApplicationStatus
): ApplicationStatus[] => {
  return RECRUITER_STATUS_TRANSITIONS[currentStatus] || [];
};

/**
 * Lấy tất cả transitions hợp lệ (bao gồm system/applicant transitions)
 * Used for validation purposes
 */
export const getAllValidNextStatuses = (
  currentStatus: ApplicationStatus
): ApplicationStatus[] => {
  return ALL_STATUS_TRANSITIONS[currentStatus] || [];
};

/**
 * Kiểm tra xem recruiter có thể chuyển từ trạng thái này sang trạng thái khác không
 */
export const canTransitionTo = (
  fromStatus: ApplicationStatus,
  toStatus: ApplicationStatus
): boolean => {
  const validStatuses = getValidNextStatuses(fromStatus);
  return validStatuses.includes(toStatus);
};

/**
 * Kiểm tra xem có thể chuyển từ trạng thái này sang trạng thái khác không (all actors)
 * Used for system validation
 */
export const canSystemTransitionTo = (
  fromStatus: ApplicationStatus,
  toStatus: ApplicationStatus
): boolean => {
  const validStatuses = getAllValidNextStatuses(fromStatus);
  return validStatuses.includes(toStatus);
};

/**
 * Lấy các options cho Select dropdown với logic business
 * - Bao gồm current status (để hiển thị)
 * - Chỉ enable các status mà recruiter có thể chuyển đến
 * - WITHDRAWN chỉ hiển thị nếu đó là current status (read-only)
 */
export const getStatusSelectOptions = (currentStatus: ApplicationStatus) => {
  const allStatuses = Object.values(ApplicationStatus);
  const validNextStatuses = getValidNextStatuses(currentStatus);

  return allStatuses.map((status) => ({
    value: status,
    label: status,
    disabled: status !== currentStatus && !validNextStatuses.includes(status),
    isCurrent: status === currentStatus,
    isWithdrawn: status === ApplicationStatus.WITHDRAWN,
  }));
};

/**
 * Lấy chỉ các status có thể chuyển đến (không bao gồm current)
 * Dùng cho dropdown actions
 */
export const getAvailableTransitions = (currentStatus: ApplicationStatus) => {
  return getValidNextStatuses(currentStatus).map((status) => ({
    value: status,
    label: status,
  }));
};
