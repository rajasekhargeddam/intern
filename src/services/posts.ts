import { BASE_URL, STATIC_POSTS_API_URL } from "../constants";
import type { Post, UserPost } from "../types/post";

export const fetchPosts = async (
  searchQuery: string,
  currentPage: number,
  postsPerPage: number,
): Promise<{ posts: Post[]; hasNextPage: boolean }> => {
  const offset = (currentPage - 1) * postsPerPage;
  const url = `${STATIC_POSTS_API_URL}?q=${searchQuery}&_start=${offset}&_limit=${postsPerPage + 1}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Post[] = await response.json();

  return {
    posts: data.slice(0, postsPerPage),
    hasNextPage: data.length > postsPerPage,
  };
};

export const fetchUserPosts = async (): Promise<UserPost[]> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  const data = await response.json();
  return data.posts || [];
};

export const createPost = async (formData: FormData) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create post.");
  }

  return data;
};
