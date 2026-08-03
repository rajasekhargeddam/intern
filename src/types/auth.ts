export interface Relationship {
  requestId: null | string;
  status: "none" | "pending_sent" | "pending_received" | "connected";
}

export interface User {
  id?: string;
  _id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  profilePicture?: string;
  bio?: string;
  gender?: string;
  role?: string;
  relationship?: Relationship;
  connectionsCount?: number;
}

export interface ConnectionRequest {
  _id: string;
  sender: User;
  receiver?: string;
  status?: "pending";
  createdAt?: string;
  updatedAt?: string;
}

export interface UserConnection {
  _id: string;
  user: User;
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
