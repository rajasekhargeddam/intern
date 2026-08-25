import noPostsImage from "../../assets/images/no-posts.svg";

const NoPostsView = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <img
        src={noPostsImage}
        alt="No posts found"
        className="mx-auto h-32 w-32 object-contain"
      />
      <h2 className="mt-3 text-center text-lg font-semibold text-gray-700">
        No posts found
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Try to search with different keywords or check back later for new posts.
      </p>
    </div>
  );
};

export default NoPostsView;
