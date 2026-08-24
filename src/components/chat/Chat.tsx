import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import EmptyChat from "./EmptyChat";
import FailedView from "../common/FailedView";
import { useContext, useEffect, useRef, useState } from "react";
import { getSocket } from "../../utils/socket";
import { UserContext } from "../../context/UserContext";
import { getUserChat } from "../../services/chat";
import type { Chat as ChatType } from "../../types";
import ChatMessage from "./ChatMessage";
import UserPresenceStatus from "./UserPresenceStatus";

const Chat = () => {
  const { userId: targetUserId } = useParams();

  const { user } = useContext(UserContext);
  const userId = user?._id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<ReturnType<typeof getSocket> | null>(null);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = getSocket();
    socketRef.current = socket;

    socket.emit("join", {
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", (newChat) => {
      console.log(newChat);
      queryClient.setQueryData<ChatType>(["chat", targetUserId], (oldChat) => {
        if (!oldChat) return oldChat;

        return {
          ...oldChat,
          messages: [...oldChat.messages, newChat],
        };
      });

      queryClient.invalidateQueries({ queryKey: ["chatUsers"] });
    });

    return () => {
      socket.emit("leave", {
        userId,
        targetUserId,
      });
      socket.off("receiveMessage");
      socketRef.current = null;
    };
  }, [userId, targetUserId, queryClient]);
  
  const {
    data: chatData,
    isLoading,
    isError,
  } = useQuery<ChatType>({
    queryKey: ["chat", targetUserId],
    queryFn: () => getUserChat(targetUserId!),
    enabled: !!targetUserId,
  });

  useEffect(() => {
    if (!chatData) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData?.messages.length, targetUserId]);

  const sendMessageHandler = () => {
    if (!newMessage.trim() || !userId || !targetUserId) return;

    socketRef?.current?.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

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
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      {/* Chat Header */}
      <div className="border-b w-full p-4 font-semibold flex items-center shrink-0 bg-white">
        <button
          onClick={() => navigate("/chat")}
          className="p-2 rounded-md hover:bg-slate-100"
          aria-label="Back to conversations"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <div className="min-w-0">
          <p className="truncate">{chatData?.targetUser.username}</p>
          <UserPresenceStatus
            isOnline={chatData?.targetUser.isOnline}
            lastSeen={chatData?.targetUser.lastSeen}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto space-y-3 pb-10">
          {chatData?.messages.map((msg) => (
            <ChatMessage key={msg._id} msg={msg} userId={userId!} />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="mt-auto border-t w-full p-3 bg-white shrink-0">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="flex-1 min-w-0 resize-none rounded-xl border px-4 py-2 outline-none focus:ring-1 focus:ring-blue-300 max-h-18 overflow-y-auto leading-6"
          />

          <button
            onClick={sendMessageHandler}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
