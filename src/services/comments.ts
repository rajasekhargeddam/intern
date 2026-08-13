import { BASE_URL } from "../constants";
import type { Comment } from "../types";
import { notifySuccess } from "../utils/toast";

type CreateCommentPayload = {
  postId: string;
  content: string;
};

type CreateReplyPayload = {
  postId: string;
  commentId: string;
  content: string;
};

export const createComment = async ({
  postId,
  content,
}: CreateCommentPayload): Promise<{
  success: boolean;
  message: string;
  comment: Comment;
}> => {
  const response = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
};

export const createReply = async ({
  postId,
  commentId,
  content,
}: CreateReplyPayload): Promise<{
  success: boolean;
  message: string;
  comment: Comment;
}> => {
  console.log(postId, commentId);
  const response = await fetch(
    `${BASE_URL}/comments/${postId}/${commentId}/replies`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add reply");
  }

  return response.json();
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments/${postId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await response.json();

  return data.comments;
};

export const fetchReplies = async (commentId: string): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments/replies/${commentId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch replies");
  }

  const data = await response.json();

  return data.replies;
};

export const deleteComment = async (commentId: string) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete replies");
  }

  const data = await response.json();

  notifySuccess("Comment deleted successfully");
  return data;
};
