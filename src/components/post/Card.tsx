import type { Post } from "../../types";

type CardProps = {
  post: Post;
};

const Card = ({ post }: CardProps) => {
  const { title, body } = post;

  return (
    <li className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-200">
      <h1 className="text-slate-900 text-xl font-bold mb-2">{title}</h1>
      <p className="text-slate-600">{body}</p>
    </li>
  );
};

export default Card;
