import type { Post } from "../../types";

type CardProps = {
  post: Post;
};

const Card = ({ post }: CardProps) => {
  const { title, body } = post;

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h1 className="mb-1 text-base font-semibold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">{body}</p>
    </li>
  );
};

export default Card;
