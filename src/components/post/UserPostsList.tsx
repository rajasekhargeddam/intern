import { type UserPost } from "../../types/post";
import UserPostCard from "./UserPostCard";

type UserPostsListProps = {
  posts: UserPost[];
};

const UserPostsList = ({ posts }: UserPostsListProps) => {
  return (
    <ul className="w-full sm:w-3/4 lg:w-3/5 max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8 sm:px-6 list-none">
      {posts.map((post) => (
        <UserPostCard key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default UserPostsList;
