import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Comment } from "../../types/post";
import { timeAgo } from "../../utils/dateConvertions";
import { createReply, fetchReplies } from "../../services/comments";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

type CommentItemProps = {
  postId: string;
  comment: Comment;
};

const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const queryClient = useQueryClient();
  const displayName = comment.user.username;

  const profileImage =
    comment.user.profilePicture ||
    "https://static.vecteezy.com/system/resources/thumbnails/067/451/114/small/avatar-default-user-profile-icon-gender-neutral-silhouette-simple-flat-profile-picture-symbol-user-account-dp-sign-best-for-social-media-icons-web-and-app-design-illustration-vector.jpg";

  const { data: fetchedReplies = [], isLoading: isRepliesLoading } = useQuery<
    Comment[],
    Error
  >({
    queryKey: ["replies", comment._id],
    queryFn: () => fetchReplies(comment._id),
    enabled: showReplies,
  });

  const replyMutation = useMutation({
    mutationFn: (content: string) =>
      createReply({
        postId,
        commentId: comment._id,
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["replies", comment._id],
      });

      if (comment.parentComment) {
        queryClient.invalidateQueries({
          queryKey: ["replies", comment.parentComment],
        });
      }

      setShowReplies(true);
      setIsReplying(false);
    },
  });

  const handleReplySubmit = (content: string) => {
    replyMutation.mutate(content);
  };

  // Fix: Combine the database count with our runtime cache count
  const hasReplies = comment.replyCount > 0 || fetchedReplies.length > 0;
  const totalRepliesCount = Math.max(comment.replyCount, fetchedReplies.length);

  return (
    <li className="py-4">
      <div className="flex gap-2.5">
        <img
          src={profileImage}
          alt={displayName}
          className="h-8 w-8 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {displayName}
            </h3>
            <span className="text-xs text-slate-500">
              {timeAgo(comment.createdAt)}
            </span>
          </div>

          <p className="mt-1 whitespace-pre-wrap text-[15px] leading-6 text-slate-700">
            {comment.content}
          </p>

          <div className="mt-2 flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsReplying((prev) => !prev)}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Reply
            </button>

            {hasReplies && (
              <button
                type="button"
                onClick={() => setShowReplies((prev) => !prev)}
                className="font-medium text-slate-500 hover:text-slate-700"
              >
                {showReplies ? "Hide" : "View"} {totalRepliesCount} replies
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-3">
              <CommentInput
                placeholder="Write a reply..."
                onSubmit={handleReplySubmit}
                isLoading={replyMutation.isPending}
              />
            </div>
          )}

          {showReplies && (
            <div className="ml-5 mt-3 border-l border-slate-200 pl-4">
              {isRepliesLoading ? (
                <div className="text-sm text-slate-500">Loading replies...</div>
              ) : (
                <CommentList
                  comments={fetchedReplies}
                  postId={postId}
                  showEmptyMessage={false}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
