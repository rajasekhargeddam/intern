import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types/auth";
import ProfileHeader from "./ProfileHeader";

type userProfileProps = {
  user: User;
  mode: "self" | "admin" | "user";
  onUpdateUser?: Dispatch<SetStateAction<User | null>> | undefined;
};

const UserProfileUi = ({ user, mode, onUpdateUser }: userProfileProps) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 m-auto flex flex-col justify-center">
      <ProfileHeader user={user} mode={mode} onUpdateUser={onUpdateUser} />
      <div className="border-t mt-12"></div>
    </div>
  );
};

export default UserProfileUi;
