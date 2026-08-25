import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import UserPostCard from "../components/post/UserPostCard";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";
import FailedView from "../components/common/FailedView";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";

import { fetchPostById } from "../services/posts";
import { createComment, fetchComments } from "../services/comments";
import useDeletePostMutation from "../hooks/useDeletePostMutation";
import { notifyError, notifySuccess } from "../utils/toast";

import type { Comment } from "../types";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId!),
    enabled: !!postId,
  });

  const {
    data: comments = [],
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId!),
    enabled: !!postId,
  });

  const addCommentMutation = useMutation({
    mutationFn: createComment,

    onSuccess: (data) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (old = []) => [
        data.comment,
        ...old,
      ]);
    },
  });

  const handleAddComment = (content: string) => {
    if (!postId) return;

    addCommentMutation.mutate({
      postId,
      content,
    });
  };

  const deletePostMutation = useDeletePostMutation([
    ["post", postId],
    ["posts"],
    ["liked-posts"],
    ["saved-posts"],
  ]);

  const onDeletePost = (id: string) => {
    deletePostMutation.mutate(id, {
      onSuccess: (message) => {
        notifySuccess(message);
        navigate("/");
      },
      onError: (error) => {
        notifyError(
          error instanceof Error ? error.message : "failed to delete Post",
        );
      },
    });
  };

  if (isLoading) {
    return <UserPostsShimmer />;
  }

  if (isError || !post) {
    return <FailedView />;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <UserPostCard post={post} onDeletePost={onDeletePost} />
      </div>

      <div className="mt-4">
        <CommentInput
          onSubmit={handleAddComment}
          isLoading={addCommentMutation.isPending}
        />
      </div>

      {isCommentsError ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load comments. Please refresh the page.
        </div>
      ) : (
        <CommentList comments={comments} postId={postId!} />
      )}
    </div>
  );
};

export default PostDetails;
