import { type UserPost } from "../../types/post";
import { timeAgo } from "../../utils/dateConvertions.ts";
import UserPostImages from "./UserPostImages.tsx";
import PostContent from "../PostContent";

type UserPostsProps = {
  post: UserPost;
};

const UserPostCard = ({ post }: UserPostsProps) => {
  const { author, content, createdAt, images } = post;

  return (
    <li className="w-full bg-white rounded-lg border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/067/451/114/small/avatar-default-user-profile-icon-gender-neutral-silhouette-simple-flat-profile-picture-symbol-user-account-dp-sign-best-for-social-media-icons-web-and-app-design-illustration-vector.jpg"
              alt="pic"
              className="w-10 h-11 rounded-full border border-slate-200 object-cover"
            />
            <p className="font-semibold text-slate-900 truncate text-base sm:text-lg">
              {author.username}
            </p>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            {timeAgo(createdAt)}
          </p>
        </div>

        <PostContent content={content} />

        <div className="w-full">
          <UserPostImages images={images} />
        </div>
      </div>
    </li>
  );
};

export default UserPostCard;
