import type { Post } from "../types/post";
import Card from "./Card";

type CardListProps = {
  posts: Post[];
};

const CardList = ({ posts }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 py-8 mx-auto max-w-6xl list-none">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default CardList;