import { useNavigate } from "react-router-dom";
import { type UserPost } from "../../types";
import UserPostCard from "./UserPostCard";
import NoPostsView from "../common/NoPostsView";

type UserPostsListProps = {
  posts: UserPost[];
  onDeletePost: (postId: string) => void;
};

const UserPostsList = ({ posts, onDeletePost }: UserPostsListProps) => {
  const navigate = useNavigate();
  return posts.length === 0 ? (
    <NoPostsView />
  ) : (
    <ul className="mx-auto flex w-full max-w-3xl list-none flex-col gap-4 px-4 py-4 sm:px-6">
      {posts.map((post) => (
        <li
          key={post._id}
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <UserPostCard post={post} onDeletePost={onDeletePost} />
        </li>
      ))}
    </ul>
  );
};

export default UserPostsList;
