import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

import ImageUploader from "./ImageUploader";
import PostContentInput from "./PostContentInput";
import { createPost } from "../../services/posts";
import { notifySuccess } from "../../utils/toast";

function CreatePostForm() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    if (selectedImages.length > 4) {
      setErrMsg("You can upload a maximum of 4 images.");
      return;
    }

    setErrMsg("");
    setImages(selectedImages);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const resetForm = () => {
    setContent("");
    setImages([]);
    setErrMsg("");
  };

  const onClickPostBtn = async () => {
    setErrMsg("");

    if (!content.trim() && images.length === 0) {
      setErrMsg("Please add some content or upload at least one image.");
      return;
    }

    setIsPosting(true);

    const formData = new FormData();

    formData.append("content", content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await createPost(formData);

      notifySuccess("Post created successfully");

      resetForm();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";

      setErrMsg(errorMessage);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Root>
      <Trigger asChild>
        <button className="flex cursor-pointer items-center gap-1 rounded-md border px-4 py-1 transition-all duration-300 hover:shadow-xl">
          <IoCreateOutline />
          <span className="hidden sm:block">Create Post</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black/50" />

        <Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-5 shadow-2xl sm:p-7 max-h-[90vh] overflow-y-auto scrollbar-thin">
          <div className="flex justify-end">
            <Close asChild>
              <button className="rounded-2xl bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200">
                ✕
              </button>
            </Close>
          </div>

          <Title className="mb-4 text-center text-xl font-semibold text-slate-900">
            Create Your Post
          </Title>

          <PostContentInput content={content} onChange={setContent} />

          <ImageUploader
            images={images}
            onChangeImages={handleImageSelection}
            removeImage={handleRemoveImage}
          />

          {errMsg && <p className="mt-4 text-sm text-red-500">{errMsg}</p>}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={isPosting}
              onClick={onClickPostBtn}
              className={`rounded-lg px-5 py-3 font-semibold text-white transition ${
                isPosting
                  ? "cursor-not-allowed bg-blue-900"
                  : "cursor-pointer bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isPosting ? "Posting..." : "POST"}
            </button>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}

export default CreatePostForm;
