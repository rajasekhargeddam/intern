import { useState } from "react";
import type { User } from "../../types/auth";
import EditProfile from "../EditProfile";
import { useNavigate } from "react-router-dom";
import { deleteAdminUser } from "../../services/admin";

type userProfileProps = {
  user: User;
  mode: "self" | "admin";
};

const UserProfileUi = ({ user, mode }: userProfileProps) => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { username, profilePicture, firstname, lastname, bio } = user;

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

      // Navigate back to users list
      navigate("/admin");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex justify-center md:justify-start md:w-1/3">
          <img
            src={profilePicture}
            alt="profile"
            className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-light">{username}</h1>

            {mode === "self" && (
              <EditProfile
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                user={user}
                mode={mode}
              />
            )}
          </div>

          {firstname && (
            <h2 className="mt-6 font-semibold text-lg">{`${firstname.toLowerCase()} ${lastname ? lastname.toLowerCase() : ""}`}</h2>
          )}

          {bio && (
            <p className="mt-2 text-gray-700 leading-7 max-w-lg">{bio}</p>
          )}
        </div>
      </div>

      {mode === "admin" && (
        <div className="mt-5">
          <EditProfile
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            user={user}
            mode={mode}
          />
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg border border-red-600 px-5 py-2 font-medium text-red-600 transition-colors duration-200 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete User"}
          </button>
        </div>
      )}
      <div className="border-t mt-12"></div>
    </div>
  );
};

export default UserProfileUi;
