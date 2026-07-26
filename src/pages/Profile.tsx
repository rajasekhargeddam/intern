import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserProfile from "../components/profile/UserProfileUi";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return <UserProfile user={user} mode="self" />;
};

export default Profile;
