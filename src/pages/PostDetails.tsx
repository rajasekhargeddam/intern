import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import UserPostCard from "../components/post/UserPostCard";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";
import FailedView from "../components/common/FailedView";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";

import { fetchPostById } from "../services/posts";
import { createComment, fetchComments } from "../services/comments";

import type { Comment } from "../types";

const PostDetails = () => {
  const { postId } = useParams();
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

  const handleAddComment = async (content: string) => {
    if (!postId) return;

    addCommentMutation.mutate({
      postId,
      content,
    });
  };

  if (isLoading) {
    return <UserPostsShimmer />;
  }

  if (isError || !post) {
    return <FailedView />;
  }

  return (
    <div className="w-full sm:w-3/4 lg:w-3/5 max-w-6xl mx-auto px-4 py-8 sm:px-6">
      <UserPostCard post={post} onDeletePost={() => {}} />

      <div className="mt-6">
        <CommentInput
          onSubmit={handleAddComment}
          isLoading={addCommentMutation.isPending}
        />
      </div>

      {isCommentsError ? (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          Failed to load comments. Please refresh the page.
        </div>
      ) : (
        <CommentList comments={comments} postId={postId!} />
      )}
    </div>
  );
};

export default PostDetails;
