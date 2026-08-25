import UserFeedCardShimmer from "./UserFeedCardShimmer";

const UserFeedShimmer = () => {
  return (
    <ul className="mx-auto flex w-full max-w-3xl list-none flex-col gap-3 px-4 py-4 sm:px-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <UserFeedCardShimmer key={index} />
      ))}
    </ul>
  );
};

export default UserFeedShimmer;
