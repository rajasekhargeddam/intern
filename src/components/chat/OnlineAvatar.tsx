type OnlineAvatarProps = {
  src?: string;
  alt: string;
  isOnline?: boolean;
};

const OnlineAvatar = ({ src, alt, isOnline }: OnlineAvatarProps) => {
  return (
    <div className="relative shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-12 h-12 rounded-full object-cover"
      />
      {isOnline && (
        <span
          className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white"
          aria-label="Online"
        />
      )}
    </div>
  );
};

export default OnlineAvatar;
