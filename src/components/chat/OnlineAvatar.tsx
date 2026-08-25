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
        className="h-10 w-10 rounded-full object-cover"
      />
      {isOnline && (
        <span
          className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"
          aria-label="Online"
        />
      )}
    </div>
  );
};

export default OnlineAvatar;
