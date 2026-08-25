import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../types";
import ProfileHeader from "./ProfileHeader";

type userProfileProps = {
  user: User;
  mode: "self" | "admin" | "user";
  onUpdateUser?: Dispatch<SetStateAction<User | null>> | undefined;
};

const UserProfileUi = ({ user, mode, onUpdateUser }: userProfileProps) => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 py-6 sm:px-6">
      <ProfileHeader user={user} mode={mode} onUpdateUser={onUpdateUser} />
      <div className="mt-6 border-t"></div>
    </div>
  );
};

export default UserProfileUi;
