import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoCreateOutline } from "react-icons/io5";

import PostForm, { type PostFormData } from "./PostForm";
import { createPost } from "../../services/posts";
import { notifyError, notifySuccess } from "../../utils/toast";

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      notifySuccess("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });

  const handleSubmit = ({ content, images, video }: PostFormData) => {
    const formData = new FormData();
    formData.append("content", content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (video) {
      formData.append("video", video);
    }

    mutation.mutate(formData);
  };

  return (
    <Root>
      <Trigger asChild>
        <button className="flex cursor-pointer items-center gap-1 rounded-md border px-4 py-1.5 transition hover:shadow-md">
          <IoCreateOutline />
          <span className="hidden sm:inline">Create Post</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Title className="text-xl font-semibold text-slate-900">
              Create Post
            </Title>
            <Close asChild>
              <button className="rounded-full bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200">
                ✕
              </button>
            </Close>
          </div>

          <PostForm
            mode="create"
            loading={mutation.isPending}
            onSubmit={handleSubmit}
          />
        </Content>
      </Portal>
    </Root>
  );
}

export default CreatePost;
