import UserFeedCardShimmer from "./UserFeedCardShimmer";

const UserFeedShimmer = () => {
  return (
    <ul className="mx-auto flex w-full max-w-6xl list-none flex-col gap-6 px-4 py-8 sm:w-3/4 sm:px-6 lg:w-3/5">
      {Array.from({ length: 6 }).map((_, index) => (
        <UserFeedCardShimmer key={index} />
      ))}
    </ul>
  );
};

export default UserFeedShimmer;
