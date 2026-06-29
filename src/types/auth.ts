export interface User {
  id: string;
  username: string;
  email: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSuccessResponse {
  user: User;
  success: boolean;
  message: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}
