import UserPostsCardShimmer from "./UserPostsCardShimmer";

const UserPostsShimmer = () => {
  return (
    <ul className="w-full sm:w-3/4 lg:w-3/5 max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8 sm:px-6 list-none">
      {Array.from({ length: 10 }).map((_, index) => (
        <UserPostsCardShimmer key={index} />
      ))}
    </ul>
  );
};

export default UserPostsShimmer;
