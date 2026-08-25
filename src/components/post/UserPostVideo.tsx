import type { Video } from "../../types";

interface Props {
  video: Video | null | undefined;
}

const UserPostVideo = ({ video }: Props) => {
  if (!video?.url) return null;

  return (
    <div className="w-full rounded-lg overflow-hidden bg-black">
      <video
        src={video.url}
        controls
        preload="metadata"
        className="w-full h-full"
        style={{ maxHeight: "360px" }}
      />
    </div>
  );
};

export default UserPostVideo;
