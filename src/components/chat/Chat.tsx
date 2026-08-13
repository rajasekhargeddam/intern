import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EmptyChat from "./EmptyChat";
import FailedView from "../common/FailedView";
import { useContext, useEffect, useState } from "react";
import socketConnection from "../../utils/socket";
import { UserContext } from "../../context/UserContext";
import { getUserChat } from "../../services/chat";
import type { Chat as ChatType } from "../../types";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const { userId: targetUserId } = useParams();

  const { user } = useContext(UserContext);
  const userId = user?._id;

  const queryClient = useQueryClient();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = socketConnection();

    socket.emit("join", {
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", ({ userId, targetUserId, text }) => {
      queryClient.setQueryData<ChatType>(["chat", targetUserId], (oldChat) => {
        if (!oldChat) return oldChat;

        return {
          ...oldChat,
          messages: [
            ...oldChat.messages,
            {
              _id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              sender: userId,
              text,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, queryClient]);

  const sendMessageHandler = () => {
    if (!newMessage.trim() || !userId || !targetUserId) return;

    const socket = socketConnection();

    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const {
    data: chatData,
    isLoading,
    isError,
  } = useQuery<ChatType>({
    queryKey: ["chat", targetUserId],
    queryFn: () => getUserChat(targetUserId!),
    enabled: !!targetUserId,
  });

  if (!userId || !targetUserId) {
    return <EmptyChat />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 font-semibold">
        {chatData?.targetUser.username}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {chatData?.messages.map((msg) => (
          <ChatMessage key={msg._id} msg={msg} userId={userId} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-4 flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-5 rounded-lg"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
