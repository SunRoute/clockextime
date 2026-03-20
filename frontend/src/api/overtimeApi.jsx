import { apiFetch } from "./client";

export const getMyOvertimeRequest = () => {
  return apiFetch("/api/overtime/mine");
};

export const JustifyOvertimeRequest = (id, reason) => {
  return apiFetch(`/api/overtime/${id}/reason`, {
    method: "PUT",
    body: JSON.stringify({ reason }),
  });
};
