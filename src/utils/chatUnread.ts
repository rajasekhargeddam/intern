import type { QueryClient } from "@tanstack/react-query";

import type { Chat } from "../types";

export const clearChatUnreadInCache = (
  queryClient: QueryClient,
  targetUserId: string,
) => {
  queryClient.setQueryData<Chat[]>(["chatUsers"], (oldData) => {
    if (!oldData) return oldData;

    return oldData.map((chat) =>
      chat.targetUser._id.toString() === targetUserId.toString()
        ? { ...chat, unreadCount: 0 }
        : chat,
    );
  });
};
