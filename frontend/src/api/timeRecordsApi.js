import { apiFetch } from "./client";

export const clockInRequest = () => {
  return apiFetch("/api/time-record/clock-in", {
    method: "POST",
  });
};

export const clockOutRequest = () => {
  return apiFetch("/api/time-record/clock-out", {
    method: "POST",
  });
};

export const getMyTimeRecordsRequest = () => {
  return apiFetch("/api/time-record/mine");
};
