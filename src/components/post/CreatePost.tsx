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
        <button className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
          <IoCreateOutline className="text-base" />
          <span className="hidden sm:inline">Create Post</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
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
