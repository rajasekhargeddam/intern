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
