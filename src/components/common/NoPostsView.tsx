import noPostsImage from "../../assets/images/no-posts.svg";

const NoPostsView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img
        src={noPostsImage}
        alt="No posts found"
        className="mx-auto my-8 w-64 h-64 object-contain"
      />
      <h2 className="text-center text-2xl font-semibold text-gray-700">
        No posts found
      </h2>
      <p className="text-center text-gray-500 mt-2">
        Try to search with different keywords or check back later for new posts.
      </p>
    </div>
  );
};

export default NoPostsView;
