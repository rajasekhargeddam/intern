import { fetchProfile } from "../services/fetchProfile";

export const AuthLoader = () => {
  const userData = fetchProfile();

  return userData;
};

export default AuthLoader;