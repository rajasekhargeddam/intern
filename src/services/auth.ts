import { BASE_URL } from "../constants";
import type { AuthSuccessResponse, LoginRequest, SignupRequest } from "../types";

export const loginUser = async (loginData: LoginRequest): Promise<AuthSuccessResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginData),
  });

  const data: AuthSuccessResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const signupUser = async (signupData: SignupRequest): Promise<AuthSuccessResponse> => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(signupData),
  });

  const data: AuthSuccessResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const logoutUser = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
