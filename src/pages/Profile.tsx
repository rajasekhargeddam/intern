import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserProfileUi from "../components/profile/UserProfileUi";
import UserPosts from "./UserPosts";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserProfileUi user={user} mode="self" />
      <UserPosts id={user._id} />
    </>
  );
};

export default Profile;
