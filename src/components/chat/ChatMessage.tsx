import type { Message } from "../../types";

const ChatMessage = ({ msg, userId }: { msg: Message; userId: string }) => {
  return (
    <div
      className={`w-fit rounded-lg px-4 py-2 ${
        msg.sender === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
      }`}
    >
      {msg.text}
    </div>
  );
};

export default ChatMessage;
