import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import type { User } from "../../types/auth";
import { UserContext } from "../../context/UserContext";
import { deleteAdminUser } from "../../services/admin";
import EditProfile from "./EditProfile";
import RelationshipButton from "./RelationshipButton";
import ConnectionsDialog from "../connections/ConnectionsDialog";

type ProfileHeaderProps = {
  user: User;
  mode: "self" | "admin" | "user";
  onUpdateUser?: Dispatch<SetStateAction<User | null>> | undefined;
};

const ProfileHeader = ({ user, mode, onUpdateUser }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserContext);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConnections, setOpenConnections] = useState(false);

  if (!loggedInUser) {
    return null;
  }

  const {
    username,
    profilePicture,
    firstname,
    lastname,
    bio,
    role,
    connectionsCount,
    relationship,
  } = user;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      if (!user._id) {
        alert("User ID is missing.");
        return;
      }

      await deleteAdminUser(user._id);

      alert("User deleted successfully.");
      navigate("/admin");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center relative">
      <img
        src={profilePicture}
        alt="profile"
        className="w-44 h-44 md:w-40 md:h-40 rounded-full object-cover border"
      />

      <div className="flex-1">
        <h1 className="text-3xl font-light pb-0 mb-0">{username}</h1>

        {firstname && (
          <h2 className="mt-6 font-semibold text-lg">{`${firstname.toLowerCase()} ${lastname ? lastname.toLowerCase() : ""}`}</h2>
        )}

        <div className="flex justify-center items-center gap-4 mt-3">
          <span
            onClick={() => setOpenConnections(true)}
            className="text-sm font-medium text-blue-600 cursor-pointer"
          >
            <span className="font-semibold">{connectionsCount || 0}</span>{" "}
            Connections
          </span>

          <ConnectionsDialog
            userId={user._id}
            open={openConnections}
            onOpenChange={setOpenConnections}
          />

          {relationship && user._id !== loggedInUser._id && (
            <RelationshipButton
              relationship={relationship}
              profileUserId={user._id}
            />
          )}
        </div>

        {bio && (
          <p className="mt-2 text-gray-700 leading-7 max-w-lg">{bio}</p>
        )}

        {mode !== "user" && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {!(mode === "admin" && role === "admin") && (
              <EditProfile
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                user={user}
                mode={mode}
                onUpdateUser={onUpdateUser}
              />
            )}

            {mode === "admin" && role === "user" && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                title="Delete User"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 shadow-sm transition-all duration-200 cursor-pointer hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : (
                  <MdDeleteOutline className="text-xl" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
