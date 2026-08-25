import { type UserPost } from "../../types";
import { timeAgo } from "../../utils/dateConversions";
import UserPostImages from "./UserPostImages.tsx";
import UserPostVideo from "./UserPostVideo.tsx";
import PostContent from "../PostContent";
import MoreOptionsDropdown from "./MoreOptionsDropdown.tsx";
import { toggleLike } from "../../services/posts.ts";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
    video,
    likesCount,
    isLiked,
    commentsCount,
  } = post;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [likesNum, setLikesNum] = useState(likesCount);
  const [isLike, setIsLike] = useState(isLiked);

  const onDeleteHandler = () => {
    onDeletePost(_id);
  };

  const ontoggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await toggleLike(_id);
      setIsLike(data.liked);
      setLikesNum((count: number) => (data.liked ? count + 1 : count - 1));
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex flex-col gap-3 px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3 pr-8">
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${author._id}`);
          }}
          className="flex min-w-0 cursor-pointer items-center gap-2"
        >
          <img
            src={author.profilePicture}
            alt="pic"
            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
          />
          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            {author.username}
          </p>
        </div>
        <p className="shrink-0 text-xs text-slate-500">{timeAgo(createdAt)}</p>
        {createdAt !== updatedAt && (
          <p className="shrink-0 text-xs text-slate-500">(Edited)</p>
        )}
      </div>

      <PostContent content={content} />

      <div onClick={(e) => e.stopPropagation()} className="w-full">
        <UserPostImages images={images} />
        <UserPostVideo video={video} />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 cursor-pointer text-lg text-slate-500"
      >
        <MoreOptionsDropdown post={post} onDeleteHandler={onDeleteHandler} />
      </div>

      <div className="mt-1 border-t border-slate-200">
        <div className="flex items-center gap-1">
          <button className="group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
            <FaRegCommentDots className="text-base" />
            <span className="font-medium">{commentsCount}</span>
            <span>comments</span>
          </button>

          <button
            onClick={ontoggleLike}
            className="group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:bg-blue-50"
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
