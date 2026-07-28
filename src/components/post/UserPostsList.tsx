import { type UserPost } from "../../types/post";
import UserPostCard from "./UserPostCard";

type UserPostsListProps = {
  posts: UserPost[];
  onDeletePost: (postId: string) => void;
};

const UserPostsList = ({ posts, onDeletePost }: UserPostsListProps) => {
  return (
    <ul className="w-full sm:w-3/4 lg:w-3/5 max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8 sm:px-6 list-none">
      {posts.map((post) => (
        <UserPostCard key={post._id} post={post} onDeletePost={onDeletePost} />
      ))}
    </ul>
  );
};

export default UserPostsList;
