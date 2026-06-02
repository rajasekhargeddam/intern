import type { Post } from "../types/post";

type CardProps = {
  post: Post;
};

const Card = ({ post }: CardProps) => {
  const { title, body } = post;
  return (
    <div className="bg-slate-800 shadow-md rounded-lg border-slate-700 p-4 hover:scale-95 transition-transform duration-300 cursor-pointer">
      <h1 className="text-slate-50 text-xl font-bold mb-2">{title}</h1>
      <p className="text-slate-300">{body}</p>
    </div>
  );
};

export default Card;
