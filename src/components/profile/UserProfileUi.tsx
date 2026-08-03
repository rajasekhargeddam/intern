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
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center px-4 py-6 sm:px-6 sm:py-10">
      <ProfileHeader user={user} mode={mode} onUpdateUser={onUpdateUser} />
      <div className="mt-12 border-t"></div>
    </div>
  );
};

export default UserProfileUi;
