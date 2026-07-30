import { BASE_URL } from "../constants";

export const fetchProfile = async () => {
  const response = await fetch(`${BASE_URL}/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data?.user;
};

export const fetchLikedPosts = async () => {
  const response = await fetch(`${BASE_URL}/profile/likes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data.posts || [];
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
  return data.user;
};
