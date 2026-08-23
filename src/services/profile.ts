import { BASE_URL } from "../constants";
import type { FetchPostsResponse } from "./posts";

export const fetchProfile = async () => {
  const response = await fetch(`${BASE_URL}/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data?.user;
};

export const fetchLikedPosts = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const response = await fetch(
    `${BASE_URL}/profile/likes?limit=5&offset=${pageParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch liked posts");
  }

  return data;
};

export const fetchSavedPosts = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const response = await fetch(
    `${BASE_URL}/profile/saves?limit=5&offset=${pageParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch saved posts");
  }

  return data;
};

export const getUserDetails = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user details");
  }

  return data.user;
};

export const getNotificationCount = async () => {
  const response = await fetch(`${BASE_URL}/profile/notification/count`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notification count");
  }

  return data;
};
