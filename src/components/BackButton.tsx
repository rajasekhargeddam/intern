import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

type BackButtonProps = {
  path?: string;
};

function BackButton({ path }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (path) {
      navigate(path);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-1 mb-4 mx-5 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <IoArrowBack size={22} /> <h1 className="text-xl font-semibold">Back</h1>
    </button>
  );
}

export default BackButton;
