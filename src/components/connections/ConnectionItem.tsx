import { useNavigate } from "react-router-dom";

import type { UserConnection } from "../../types/auth";

interface ConnectionItemProps {
  connection: UserConnection;
  onClose: () => void;
}

const ConnectionItem = ({ connection, onClose }: ConnectionItemProps) => {
  const navigate = useNavigate();
  const { username, firstname, lastname, profilePicture } = connection;

  const handleClick = () => {
    onClose();
    navigate(`/user/${connection._id}`);
  };

  return (
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
  );
};

export default ConnectionItem;
