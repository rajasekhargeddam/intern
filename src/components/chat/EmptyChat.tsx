import { HiOutlineChatAlt2 } from "react-icons/hi";

const EmptyChat = () => {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <HiOutlineChatAlt2
          size={56}
          aria-hidden
          className="mx-auto mb-3 text-slate-300"
        />

        <h2 className="text-lg font-semibold text-slate-700">
          Select a user to start chatting
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Conversations will appear here.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
