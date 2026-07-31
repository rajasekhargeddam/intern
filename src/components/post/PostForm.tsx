import { useState } from "react";
import ImageUploader from "./ImageUploader";
import PostContentInput from "./PostContentInput";

export interface PostFormData {
  content: string;
  images: File[];
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
  const [errMsg, setErrMsg] = useState("");

  // Sync state if initialContent changes

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
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const onclickHandler = () => {
    setErrMsg("");

    if (!content.trim() && mode === "create" && images.length === 0) {
      setErrMsg("Please add some content or upload at least one image.");
      return;
    }

    onSubmit({ content, images });
    if (mode === "create") {
      setContent("");
      setImages([]);
    }
  };

  return (
    <div className="mt-5 space-y-4">
      {/* Matches original prop signature (content, onChange) */}
      <PostContentInput content={content} onChange={setContent} />

      {/* Conditionally render image uploader in create mode */}
      {mode === "create" && (
        <ImageUploader
          images={images}
          onChangeImages={handleImageSelection}
          removeImage={handleRemoveImage}
        />
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
