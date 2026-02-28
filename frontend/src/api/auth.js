import { apiFetch } from "./fetch";

export const loginRequest = (credentials) => {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const firstChangePasswordRequest = (data) => {
  return apiFetch("/api/auth/first-change-password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
