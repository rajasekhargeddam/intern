import failedImage from "../../assets/images/failed.svg";

type FailedViewProps = {
  message?: string;
};

const FailedView = ({ message = "Failed to load posts" }: FailedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <img
        src={failedImage}
        alt={message}
        className="mx-auto h-32 w-32 object-contain"
      />
      <h2 className="mt-3 text-center text-lg font-semibold text-gray-700">
        {message}
      </h2>
    </div>
  );
};

export default FailedView;
