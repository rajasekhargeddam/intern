import { fetchProfile } from "../services/profile";

export const AuthLoader = () => {
  const userData = fetchProfile();

  return userData;
};

export default AuthLoader;