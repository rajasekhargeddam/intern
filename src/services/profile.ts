import { GET_PROFILE_API } from "../constants/api";

const fetchProfile = async () => {
  try {
    const response = await fetch(GET_PROFILE_API, {
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch Profile Data");
    }

    return data.user;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An error occurred during loading profile";
    console.log(errorMessage);
  }
};

export default fetchProfile;
