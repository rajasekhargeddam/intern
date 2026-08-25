import type { Comment } from "../../types";
import CommentItem from "./CommentItem";

type CommentListProps = {
  comments: Comment[];
  postId: string;
  showEmptyMessage?: boolean;
};

const CommentList = ({
  comments,
  postId,
  showEmptyMessage = true,
}: CommentListProps) => {
  if (comments.length === 0 && showEmptyMessage) {
    return (
      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  if (comments.length === 0) {
    return null;
  }

  return (
    <ul className="mt-4 flex flex-col gap-2">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))}
    </ul>
  );
};

export default CommentList;
