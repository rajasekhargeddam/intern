import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "../utils/socket";
import type { Chat, User } from "../types";

type PresencePayload = {
  userId: string;
  lastSeen?: string;
};

const updateCachedPresence = (
  queryClient: ReturnType<typeof useQueryClient>,
  userId: string,
  isOnline: boolean,
  lastSeen?: string | null,
) => {
  const matches = (id: string | undefined) =>
    id?.toString() === userId.toString();

  queryClient.setQueryData<Chat[]>(["chatUsers"], (oldData) => {
    if (!oldData) return oldData;

    return oldData.map((chat) =>
      matches(chat.targetUser?._id)
        ? {
            ...chat,
            targetUser: {
              ...chat.targetUser,
              isOnline,
              lastSeen: isOnline ? chat.targetUser.lastSeen : lastSeen,
            },
          }
        : chat,
    );
  });

  queryClient.setQueryData<User[]>(["chatConnectionUsers"], (oldData) => {
    if (!oldData) return oldData;

    return oldData.map((user) =>
      matches(user._id)
        ? {
            ...user,
            isOnline,
            lastSeen: isOnline ? user.lastSeen : lastSeen,
          }
        : user,
    );
  });

  queryClient.setQueriesData<Chat>({ queryKey: ["chat"] }, (oldData) => {
    if (!oldData?.targetUser || !matches(oldData.targetUser._id)) {
      return oldData;
    }

    return {
      ...oldData,
      targetUser: {
        ...oldData.targetUser,
        isOnline,
        lastSeen: isOnline ? oldData.targetUser.lastSeen : lastSeen,
      },
    };
  });
};

const useChatPresence = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const onUserOnline = ({ userId }: PresencePayload) => {
      updateCachedPresence(queryClient, userId, true);
    };

    const onUserOffline = ({ userId, lastSeen }: PresencePayload) => {
      updateCachedPresence(queryClient, userId, false, lastSeen ?? null);
    };

    socket.on("userOnline", onUserOnline);
    socket.on("userOffline", onUserOffline);

    return () => {
      socket.off("userOnline", onUserOnline);
      socket.off("userOffline", onUserOffline);
    };
  }, [queryClient]);
};

export default useChatPresence;
