export interface Relationship {
  requestId: null | string;
  status: "none" | "pending_sent" | "pending_received" | "connected";
}

export interface User {
  _id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  profilePicture: string;
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

export interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt?: string;
}

export interface Chat {
  _id: string;
  targetUser: User;
  messages: Message[];
  lastMessage?: Message;
  updatedAt?: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  content: string;
  images: string[];
}

export interface Images {
  url: string;
}

export interface Video {
  url: string;
  publicId?: string;
}

export interface UserPost {
  _id: string;
  author: User;
  content: string;
  hashtags: string[];
  images: Images[];
  video?: Video | null;
  links: string[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsCount: number;
}

export interface Comment {
  _id: string;
  content: string;

  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };

  parentComment?: string | null;

  replyCount: number;

  createdAt: string;

  replies?: Comment[];
}
