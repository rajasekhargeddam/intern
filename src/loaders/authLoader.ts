import { fetchProfile } from "../services/profile";

export const AuthLoader = async () => {
  try {
    return await fetchProfile();
  } catch {
    return null;
  }
};

export default AuthLoader;
