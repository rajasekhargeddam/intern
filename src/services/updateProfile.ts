import { BASE_URL } from "../constants";
import type { User } from "../types/auth";

export const updateProfile = async (
  formData: FormData
): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/profile/edit`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to update profile");
    }

    return data?.user || data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default updateProfile;