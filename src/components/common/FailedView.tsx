import failedImage from "../../assets/images/failed.svg";

const FailedView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img
        src={failedImage}
        alt="Failed to load posts"
        className="mx-auto my-8 w-64 h-64 object-contain"
      />
      <h2 className="text-center text-2xl font-semibold text-gray-700">
        Failed to load posts
      </h2>
    </div>
  );
};

export default FailedView;
