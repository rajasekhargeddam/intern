import UserPostsCardShimmer from "./UserPostsCardShimmer";

const UserPostsShimmer = () => {
  return (
    <ul className="mx-auto flex w-full max-w-3xl list-none flex-col gap-4 px-4 py-4 sm:px-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <UserPostsCardShimmer key={index} />
      ))}
    </ul>
  );
};

export default UserPostsShimmer;
