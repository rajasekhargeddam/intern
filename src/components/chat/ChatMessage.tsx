import type { Message } from "../../types";
import { timeAgo } from "../../utils/dateConversions";

const ChatMessage = ({ msg, userId }: { msg: Message; userId: string }) => {
  const isMe = msg.sender === userId;

  return (
    <div className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] wrap-break-word px-3 py-1 shadow-sm text-sm ${
          isMe
            ? "bg-blue-600 text-white rounded-bl-md rounded-tl-md rounded-tr-md"
            : "bg-gray-100 text-slate-900 rounded-br-md rounded-tr-md rounded-tl-md"
        }`}
      >
        <div className="whitespace-pre-wrap">{msg.text}</div>
        <div className="text-[11px] opacity-70 mt-1 text-right">
          {msg.createdAt ? timeAgo(msg.createdAt) : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
