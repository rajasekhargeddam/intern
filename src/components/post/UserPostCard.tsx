import { type UserPost } from "../../types/post";
import { timeAgo } from "../../utils/dateConvertions.ts";
import UserPostImages from "./UserPostImages.tsx";
import PostContent from "../PostContent";
import MoreOptionsDropdown from "./MoreOptionsDropdown.tsx";
import { deletePost, toggleLike } from "../../services/posts.ts";
import { notifyError, notifySuccess } from "../../utils/toast.ts";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UserPostsProps = {
  post: UserPost;
  onDeletePost: (postId: string) => void;
};

const UserPostCard = ({ post, onDeletePost }: UserPostsProps) => {
  const {
    _id,
    author,
    content,
    createdAt,
    updatedAt,
    images,
    likesCount,
    isLiked,
    commentsCount,
  } = post;
  const navigate = useNavigate();

  const [likesNum, setLikesNum] = useState(likesCount);
  const [isLike, setIsLike] = useState(isLiked);

  const onDeleteHandler = async () => {
    try {
      const data = await deletePost(_id);
      notifySuccess(data);
      onDeletePost(_id);
    } catch (err) {
      notifyError(err instanceof Error ? err.message : "failed to delete Post");
    }
  };

  const ontoggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await toggleLike(_id);
      setIsLike(data.liked);
      setLikesNum((count) => (data.liked ? count + 1 : count - 1));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-2 pt-4 sm:px-6 sm:pt-6 relative">
      <div className="flex items-center gap-5">
        <div
          onClick={() => {
            navigate(`/user/${author._id}`);
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img
            src={author.profilePicture}
            alt="pic"
            className="w-10 h-11 rounded-full border border-slate-200 object-cover"
          />
          <p className="font-semibold text-slate-900 truncate text-base sm:text-lg">
            {author.username}
          </p>
        </div>
        <p className="text-xs text-slate-500 sm:text-sm">
          {timeAgo(createdAt)}
        </p>
        {createdAt !== updatedAt && (
          <p className="text-xs text-slate-500 sm:text-sm">(Edited)</p>
        )}
      </div>

      <PostContent content={content} />

      <div onClick={(e) => e.stopPropagation()} className="w-full">
        <UserPostImages images={images} />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute text-lg top-5 right-5 cursor-pointer"
      >
        <MoreOptionsDropdown post={post} onDeleteHandler={onDeleteHandler} />
      </div>

      <div className="border-t border-slate-200 mt-2">
        <div className="flex items-center justify-start gap-3">
          <button className="group flex items-center justify-center gap-2 rounded-lg py-2 px-5 cursor-pointer transition-colors hover:bg-blue-50">
            <span className="text-sm font-medium text-slate-600 group-hover:text-blue-500">
              {commentsCount}
            </span>
            <FaRegCommentDots className="text-lg text-slate-600 transition-colors group-hover:text-blue-500" />{" "}
            <span>comments</span>
          </button>

          <button
            onClick={ontoggleLike}
            className="group flex items-center justify-center gap-2 rounded-lg py-2 px-2 cursor-pointer transition-colors hover:bg-blue-50"
          >
            {isLike ? (
              <FaHeart className="text-lg text-blue-600" />
            ) : (
              <FiHeart className="text-lg text-slate-600 transition-colors group-hover:text-blue-600" />
            )}
            <span className="text-sm font-medium text-slate-600">
              {likesNum}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
