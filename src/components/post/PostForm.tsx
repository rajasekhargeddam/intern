import { useState } from "react";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import PostContentInput from "./PostContentInput";

export interface PostFormData {
  content: string;
  images: File[];
  video: File | null;
}

interface PostFormProps {
  mode: "create" | "edit";
  initialContent?: string;
  loading: boolean;
  onSubmit: (data: PostFormData) => void;
}

function PostForm({
  mode,
  initialContent = "",
  loading,
  onSubmit,
}: PostFormProps) {
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    // If video is already selected, don't allow images
    if (video) {
      setErrMsg("A post cannot contain both images and a video.");
      event.target.value = "";
      return;
    }

    const selectedImages = Array.from(event.target.files);
    if (selectedImages.length > 4) {
      setErrMsg("You can upload a maximum of 4 images.");
      event.target.value = "";
      return;
    }

    setErrMsg("");
    setImages(selectedImages);
  };

  const handleVideoSelection = (file: File | null, error: string = "") => {
    if (error) {
      setErrMsg(error);
      return;
    }

    // If images are already selected, don't allow video
    if (file && images.length > 0) {
      setErrMsg("A post cannot contain both images and a video.");
      return;
    }

    setErrMsg("");
    setVideo(file);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRemoveVideo = () => {
    setVideo(null);
  };

  const onclickHandler = () => {
    setErrMsg("");

    if (!content.trim() && mode === "create" && images.length === 0 && !video) {
      setErrMsg("Please add some content or upload at least one image/video.");
      return;
    }

    onSubmit({ content, images, video });
    if (mode === "create") {
      setContent("");
      setImages([]);
      setVideo(null);
    }
  };

  return (
    <div className="mt-5 space-y-4">
      <PostContentInput content={content} onChange={setContent} />

      {mode === "create" && (
        <>
          <ImageUploader
            images={images}
            onChangeImages={handleImageSelection}
            removeImage={handleRemoveImage}
            disabled={!!video}
          />

          <VideoUploader
            video={video}
            onVideoSelect={handleVideoSelection}
            removeVideo={handleRemoveVideo}
            disabled={images.length > 0}
          />
        </>
      )}

      {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onclickHandler}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : mode === "create" ? "Post" : "save"}
        </button>
      </div>
    </div>
  );
}

export default PostForm;
