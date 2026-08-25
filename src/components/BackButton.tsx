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
    className="mx-3 mb-2 flex items-center gap-1 rounded-md p-1.5 text-slate-700 hover:bg-gray-100"
    >
      <IoArrowBack size={18} /> <span className="text-sm font-semibold">Back</span>
    </button>
  );
}

export default BackButton;
