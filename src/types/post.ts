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
  likesCount: number;
  isLiked: boolean;
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
