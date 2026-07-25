import { BASE_URL } from "../constants";

export const fetchProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/profile/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data?.user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
