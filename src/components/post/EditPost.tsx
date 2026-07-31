import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import PostForm, { type PostFormData } from "./PostForm";
import { updatePost } from "../../services/posts";
import { notifySuccess } from "../../utils/toast";
import type { UserPost } from "../../types/post";
import type { Dispatch, SetStateAction } from "react";

interface EditPostProps {
  post: UserPost;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

function EditPost({ post, open, onOpenChange }: EditPostProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      notifySuccess("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
    },
  });

  const handleSubmit = ({ content }: PostFormData) => {
    mutation.mutate({
      postId: post._id,
      content,
    });
  };

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Title className="text-xl font-semibold text-slate-900">
              Edit Post
            </Title>
            <Close asChild>
              <button className="rounded-full bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200">
                ✕
              </button>
            </Close>
          </div>

          <PostForm
            mode="edit"
            initialContent={post.content}
            loading={mutation.isPending}
            onSubmit={handleSubmit}
          />
        </Content>
      </Portal>
    </Root>
  );
}

export default EditPost;
