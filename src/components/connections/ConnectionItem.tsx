import { useNavigate } from "react-router-dom";

import type { UserConnection } from "../../types";
import { CiCircleRemove } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConnection } from "../../services/connections";
import { notifySuccess } from "../../utils/toast";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

interface ConnectionItemProps {
  connection: UserConnection;
  profileUserId: string;
  onClose: () => void;
}

const ConnectionItem = ({
  connection,
  profileUserId,
  onClose,
}: ConnectionItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, userConnectionRemoved } = useContext(UserContext);
  const { username, firstname, lastname, profilePicture } = connection.user;

  const handleClick = () => {
    onClose();
    navigate(`/user/${connection.user._id}`);
  };

  const mutation = useMutation({
    mutationFn: deleteConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["connections", profileUserId],
      });
      if (user?._id === profileUserId) {
        userConnectionRemoved();
      }
      notifySuccess("Connection removed successfully.");
    },
  });

  return (
    <div className="w-full flex justify-between items-center gap-3 rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50 cursor-pointer"
      >
        <img
          src={profilePicture}
          alt={username}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate font-medium text-gray-900">
            {firstname && firstname} {lastname && lastname}
          </p>

          <p className="truncate text-sm text-gray-500">@{username}</p>
        </div>
      </button>
      <button
        onClick={() => mutation.mutate(connection._id)}
        className="rounded-full text-2xl p-2 transition hover:bg-gray-100"
      >
        <CiCircleRemove />
      </button>
    </div>
  );
};

export default ConnectionItem;
