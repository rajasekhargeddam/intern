import { useState, type FormEvent } from "react";
import { IoSend } from "react-icons/io5";

type CommentInputProps = {
  placeholder?: string;
  buttonText?: string;
  isLoading?: boolean;
  onSubmit: (content: string) => Promise<void> | void;
};

const CommentInput = ({
  placeholder = "Write a comment...",
  isLoading = false,
  onSubmit,
}: CommentInputProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const value = content.trim();

    if (!value) return;

    await onSubmit(value);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 py-3">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/067/451/114/small/avatar-default-user-profile-icon-gender-neutral-silhouette-simple-flat-profile-picture-symbol-user-account-dp-sign-best-for-social-media-icons-web-and-app-design-illustration-vector.jpg"
        alt="profile"
        className="h-8 w-8 rounded-full object-cover"
      />

      <div className="flex-1 border-b border-slate-300 transition-colors focus-within:border-blue-600">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          maxLength={1000}
          className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-slate-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50 disabled:text-slate-300 disabled:hover:bg-transparent"
      >
        <IoSend size={20} />
      </button>
    </form>
  );
};

export default CommentInput;
