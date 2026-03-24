import { apiFetch } from "./client";

export const getUsersRequest = () => {
  return apiFetch("/api/user");
};

export const createUserRequest = (data) => {
  return apiFetch("/api/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateUserRequest = (id, data) => {
  return apiFetch(`/api/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const toggleUserRequest = (id) => {
  return apiFetch(`/api/user/${id}/toggle`, {
    method: "PUT",
  });
};

export const resetPasswordRequest = (id) => {
  return apiFetch(`/api/user/${id}/reset-password`, {
    method: "PUT",
  });
};
