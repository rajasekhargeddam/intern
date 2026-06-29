import { useNavigate } from "react-router-dom";
import { LOGOUT_API } from "../constants/api";

type HeaderProps = {
  username: string;
};

const Header = ({ username }: HeaderProps) => {
  const navigate = useNavigate();

  const onlogout = async () => {
    try {
      const response = await fetch(LOGOUT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      navigate("/auth/login", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="py-4 px-8 m-4 w-full flex justify-between shadow-sm sticky top-0 z-50 bg-white rounded-2xl">
      <p className="text-2xl">{username}</p>
      <button
        type="button"
        className="border rounded-md py-2 px-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => onlogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
