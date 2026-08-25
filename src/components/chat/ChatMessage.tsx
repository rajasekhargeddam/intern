import type { Message } from "../../types";
import { formatExactTime } from "../../utils/dateConversions";

const ChatMessage = ({ msg, userId }: { msg: Message; userId: string }) => {
  const isMe = msg.sender === userId;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[75%] overflow-hidden rounded-2xl px-3 py-1.5 text-sm wrap-break-word ${
          isMe
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md bg-white text-slate-900 ring-1 ring-slate-200"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{msg.text}</div>
        <div
          className={`mt-0.5 text-right text-[10px] ${
            isMe ? "text-white/70" : "text-slate-400"
          }`}
        >
          {msg.createdAt
            ? formatExactTime(msg.createdAt, { includeDate: true })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
