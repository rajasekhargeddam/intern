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
    <ul className="w-full sm:w-3/4 lg:w-3/5 max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8 sm:px-6 list-none">
      {posts.map((post) => (
        <li
          key={post._id}
          className="w-full bg-white rounded-lg border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden"
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <UserPostCard post={post} onDeletePost={onDeletePost} />
        </li>
      ))}
    </ul>
  );
};

export default UserPostsList;
