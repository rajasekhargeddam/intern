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

export interface Author {
  _id: string;
  username: string;
  email: string;
}

export interface UserPost {
  _id: string;
  author: Author;
  content: string;
  hashtags: string[];
  images: string[];
  links: string[];
  createdAt: string;
  updatedAt: string;
}