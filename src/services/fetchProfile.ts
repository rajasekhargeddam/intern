import { GET_PROFILE_API } from "../constants/api";

export const fetchProfile = async () => {
  try {
    const response = await fetch(GET_PROFILE_API, {
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
