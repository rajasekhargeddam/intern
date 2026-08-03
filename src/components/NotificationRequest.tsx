import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  acceptConnectionRequest,
  deleteConnection,
} from "../services/connections";
import type { ConnectionRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface NotificationRequestProps {
  request: ConnectionRequest;
}

const NotificationRequest = ({ request }: NotificationRequestProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const acceptMutation = useMutation({
    mutationFn: acceptConnectionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: deleteConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    },
  });

  const { sender } = request;

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      <button
        onClick={() => navigate(`/user/${sender._id}`)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={sender.profilePicture}
          alt={sender.firstname}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div className="text-left">
          <h2 className="font-semibold text-gray-900">
            {sender.firstname} {sender.lastname}
          </h2>

          <p className="text-sm text-gray-500">@{sender.username}</p>
        </div>
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => acceptMutation.mutate(request._id)}
          disabled={acceptMutation.isPending}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60 cursor-pointer"
        >
          {acceptMutation.isPending ? "Accepting..." : "Accept"}
        </button>

        <button
          onClick={() => rejectMutation.mutate(request._id)}
          disabled={rejectMutation.isPending}
          className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 cursor-pointer"
        >
          {rejectMutation.isPending ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default NotificationRequest;
