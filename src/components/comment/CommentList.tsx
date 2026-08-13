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
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  if (comments.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))}
    </ul>
  );
};

export default CommentList;
