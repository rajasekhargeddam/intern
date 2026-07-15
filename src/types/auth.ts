export interface User {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  profilePicture?: string;
  bio?: string;
  gender?: string;
  role?: string;
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
