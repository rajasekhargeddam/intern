import { BASE_URL } from "../constants";
import type { User } from "../types";

export interface FetchUserFeedResponse {
  users: User[];
  hasMore: boolean;
  nextOffset: number;
}

export const fetchUserFeed = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<FetchUserFeedResponse> => {
  const response = await fetch(
    `${BASE_URL}/users/feed?limit=10&offset=${pageParam}`,
    {
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data;
};
