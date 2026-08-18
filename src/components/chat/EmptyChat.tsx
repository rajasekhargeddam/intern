const EmptyChat = () => {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4 h-20 w-20 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.83L3 20l1.17-3.83A7.967 7.967 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        <h2 className="text-2xl font-semibold text-slate-700">
          Select a user to start chatting
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Conversations will appear here — keep it friendly.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;