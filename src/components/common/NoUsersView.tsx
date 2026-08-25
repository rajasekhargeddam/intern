import noPostsImage from "../../assets/images/no-posts.svg";

const NoUsersView = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <img
        src={noPostsImage}
        alt="No users found"
        className="mx-auto h-32 w-32 object-contain"
      />
      <h2 className="mt-3 text-center text-lg font-semibold text-gray-700">
        No users to discover
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        You&apos;re connected with everyone here. Check back later for new
        people.
      </p>
    </div>
  );
};

export default NoUsersView;
