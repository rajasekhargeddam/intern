import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";

import { getSocket } from "../utils/socket";

/**
 * Refreshes the chat list when another user sends a message.
 * Skips refresh if that conversation is already open (open chat marks itself read).
 */
const useNewChatMessage = () => {
  const queryClient = useQueryClient();
  const openChatMatch = useMatch("/chat/:userId");
  const openChatUserId = openChatMatch?.params.userId;

  useEffect(() => {
    const socket = getSocket();

    const onNewChatMessage = ({ senderId }: { senderId?: string }) => {
      if (
        openChatUserId &&
        senderId &&
        senderId.toString() === openChatUserId.toString()
      ) {
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["chatUsers"] });
      queryClient.invalidateQueries({ queryKey: ["chatConnectionUsers"] });
    };

    socket.on("newChatMessage", onNewChatMessage);

    return () => {
      socket.off("newChatMessage", onNewChatMessage);
    };
  }, [openChatUserId, queryClient]);
};

export default useNewChatMessage;
