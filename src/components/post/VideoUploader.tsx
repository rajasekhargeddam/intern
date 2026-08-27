import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi";

type VideoUploaderProps = {
  video: File | null;
  onVideoSelect: (file: File | null, error?: string) => void;
  removeVideo: () => void;
  disabled?: boolean;
};

const validateVideo = (file: File): { valid: boolean; error: string } => {
  // Check file size (20 MB max)
  const maxSize = 20 * 1024 * 1024;
  if (file.size >= maxSize) {
    return { valid: false, error: "Video must be less than 20 MB." };
  }

  // Check file type
  const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only MP4, WebM and MOV videos are allowed." };
  }

  return { valid: true, error: "" };
};

const checkVideoDuration = (
  file: File,
  onVideoSelect: (file: File | null, error?: string) => void
): void => {
  const video = document.createElement("video");
  const url = URL.createObjectURL(file);

  video.onloadedmetadata = () => {
    URL.revokeObjectURL(url);

    if (video.duration >= 30) {
      onVideoSelect(null, "Video must be less than 30 seconds.");
    } else {
      onVideoSelect(file);
    }
  };

  video.onerror = () => {
    URL.revokeObjectURL(url);
    onVideoSelect(null, "Unable to read video file.");
  };

  video.src = url;
};

function VideoUploader({
  video,
  onVideoSelect,
  removeVideo,
  disabled = false,
}: VideoUploaderProps) {
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    // Validate file size and type
    const validation = validateVideo(file);
    if (!validation.valid) {
      onVideoSelect(null, validation.error);
      event.target.value = "";
      return;
    }

    // Validate duration using HTML5 video API
    checkVideoDuration(file, onVideoSelect);
    event.target.value = "";
  };

  const videoPreviewUrl = video ? URL.createObjectURL(video) : null;

  return (
    <div className="mt-4 flex flex-col gap-3">
      <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <HiOutlineVideoCamera size={16} aria-hidden className="text-slate-500" />
        Upload Video
      </label>

      <input
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleVideoChange}
        disabled={disabled || !!video}
        className={`w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm ${
          disabled || !!video ? "cursor-not-allowed opacity-50" : ""
        }`}
      />

      <p className="text-xs text-slate-500">Maximum 1 video (less than 20 MB, less than 30 seconds)</p>

      {video && videoPreviewUrl && (
        <div className="relative overflow-hidden rounded-xl border">
          <video
            src={videoPreviewUrl}
            controls
            className="w-full rounded-lg bg-black"
            style={{ maxHeight: "300px" }}
          />

          <button
            type="button"
            onClick={() => {
              removeVideo();
              URL.revokeObjectURL(videoPreviewUrl);
            }}
            className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white hover:bg-red-600"
          >
            <MdDeleteOutline />
          </button>

          <div className="truncate bg-white p-2 text-xs">
            {video.name}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUploader;
