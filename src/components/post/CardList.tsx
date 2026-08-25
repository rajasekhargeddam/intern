import type { Post } from "../../types";
import Card from "./Card";

type CardListProps = {
  posts: Post[];
};

const CardList = ({ posts }: CardListProps) => {
  return (
    <ul className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default CardList;