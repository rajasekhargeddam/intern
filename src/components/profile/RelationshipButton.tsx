import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptConnectionRequest, sendConnectionRequest } from "../../services/connections";
import type { Relationship } from "../../types";

interface RelationshipButtonProps {
  relationship: Relationship;
  profileUserId: string;
  invalidateQueryKeys?: readonly (readonly unknown[])[];
}

const RelationshipButton = ({
  relationship,
  profileUserId,
  invalidateQueryKeys = [],
}: RelationshipButtonProps) => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["profile", profileUserId],
    });

    invalidateQueryKeys.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  };

  const sendRequestMutation = useMutation({
    mutationFn: sendConnectionRequest,
    onSuccess: invalidateQueries,
  });

  const acceptRequestMutation = useMutation({
    mutationFn: acceptConnectionRequest,
    onSuccess: invalidateQueries,
  });

  switch (relationship.status) {
    case "none":
      return (
        <button
          onClick={() => sendRequestMutation.mutate(profileUserId)}
          disabled={sendRequestMutation.isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sendRequestMutation.isPending ? "Sending..." : "Connect"}
        </button>
      );

    case "pending_sent":
      return (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
        >
          Pending
        </button>
      );

    case "pending_received":
      return (
        <button
          onClick={() =>
            acceptRequestMutation.mutate(relationship.requestId!)
          }
          disabled={acceptRequestMutation.isPending}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {acceptRequestMutation.isPending
            ? "Accepting..."
            : "Accept Request"}
        </button>
      );

    case "connected":
      return null;

    default:
      return null;
  }
};

export default RelationshipButton;