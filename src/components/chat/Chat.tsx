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
import OnlineAvatar from "./OnlineAvatar";

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
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading conversation...
      </div>
    );
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-3 py-2.5">
        <button
          onClick={() => navigate("/chat")}
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 sm:hidden"
          aria-label="Back to conversations"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <OnlineAvatar
          src={chatData?.targetUser.profilePicture}
          alt={chatData?.targetUser.username ?? "User"}
          isOnline={chatData?.targetUser.isOnline}
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-slate-900">
            {chatData?.targetUser.username}
          </p>
          <UserPresenceStatus
            isOnline={chatData?.targetUser.isOnline}
            lastSeen={chatData?.targetUser.lastSeen}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-3 py-3 sm:px-4">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
          {chatData?.messages.map((msg) => (
            <ChatMessage key={msg._id} msg={msg} userId={userId!} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-white px-3 py-2 sm:px-4">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="max-h-24 min-h-10 min-w-0 flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm leading-5 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          />

          <button
            onClick={sendMessageHandler}
            className="h-10 shrink-0 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
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
