import failedImage from "../../assets/images/failed.svg";

type FailedViewProps = {
  message?: string;
};

const FailedView = ({ message = "Failed to load posts" }: FailedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img
        src={failedImage}
        alt={message}
        className="mx-auto my-8 w-64 h-64 object-contain"
      />
      <h2 className="text-center text-2xl font-semibold text-gray-700">
        {message}
      </h2>
    </div>
  );
};

export default FailedView;
