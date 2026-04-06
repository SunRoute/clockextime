import { apiFetch } from "./client";

export const getPendingOvertimeRequest = () => {
  return apiFetch("/api/overtime/pending");
};

export const manageOvertimeRequest = (id, status) => {
  return apiFetch(`/api/overtime/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};
