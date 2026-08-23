import { BASE_URL } from "../constants";
import type { FetchPostsResponse } from "./posts";
import type { FetchUserFeedResponse } from "./users";

export const fetchSearchPosts = async ({
  query,
  pageParam = 0,
}: {
  query: string;
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const params = new URLSearchParams({
    q: query,
    limit: "10",
    offset: String(pageParam),
  });

  const response = await fetch(`${BASE_URL}/search/posts?${params}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to search posts");
  }

  return data;
};

export const fetchSearchUsers = async ({
  query,
  pageParam = 0,
}: {
  query: string;
  pageParam: number;
}): Promise<FetchUserFeedResponse> => {
  const params = new URLSearchParams({
    q: query,
    limit: "10",
    offset: String(pageParam),
  });

  const response = await fetch(`${BASE_URL}/search/users?${params}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to search users");
  }

  return data;
};

export interface FetchSearchTagsResponse {
  tags: { tag: string; postsCount: number }[];
  hasMore: boolean;
  nextOffset: number;
}

export const fetchSearchTags = async ({
  query,
  pageParam = 0,
}: {
  query: string;
  pageParam: number;
}): Promise<FetchSearchTagsResponse> => {
  const params = new URLSearchParams({
    q: query,
    limit: "20",
    offset: String(pageParam),
  });

  const response = await fetch(`${BASE_URL}/search/tags?${params}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to search tags");
  }

  return data;
};

export const fetchSearchTagPosts = async ({
  tag,
  pageParam = 0,
}: {
  tag: string;
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const params = new URLSearchParams({
    limit: "10",
    offset: String(pageParam),
  });

  const response = await fetch(
    `${BASE_URL}/search/tags/${encodeURIComponent(tag)}/posts?${params}`,
    {
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tag posts");
  }

  return data;
};

