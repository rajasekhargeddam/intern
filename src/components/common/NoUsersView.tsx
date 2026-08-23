import noPostsImage from "../../assets/images/no-posts.svg";

const NoUsersView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img
        src={noPostsImage}
        alt="No users found"
        className="mx-auto my-8 h-64 w-64 object-contain"
      />
      <h2 className="text-center text-2xl font-semibold text-gray-700">
        No users to discover
      </h2>
      <p className="mt-2 text-center text-gray-500">
        You&apos;re connected with everyone here. Check back later for new
        people.
      </p>
    </div>
  );
};

export default NoUsersView;
