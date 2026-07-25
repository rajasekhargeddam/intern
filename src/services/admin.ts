import { BASE_URL } from "../constants";
import type { User } from "../types/auth";

export const fetchAdminUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/admin/users`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user accounts");
  }

  return data.data || [];
};

export const fetchAdminUserById = async (userId: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/admin/user/${userId}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user.");
  }

  return data.user;
};

export const createAdminUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/admin/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const updateAdminUser = async (userId: string, formData: FormData) => {
  const response = await fetch(`${BASE_URL}/admin/user/${userId}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user.");
  }

  return data;
};

export const deleteAdminUser = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/admin/user/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user.");
  }

  return data;
};
