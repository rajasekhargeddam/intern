import { useState, type FormEvent , useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import type { SignupRequest } from "../types";
import { UserContext } from "../context/UserContext";
import { signupUser } from "../services/auth";
import { notifySuccess } from "../utils/toast";

const SignUp = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const signupData: SignupRequest = {username, email, password };

    try {
      if (password !== confirmPassword) {
        throw new Error("Password didn't match");
      }

      const resData = await signupUser(signupData);

      notifySuccess("Profile created successfully")
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      login(resData.user);
      navigate("/", {
        replace: true,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during signup";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-xl font-bold text-slate-900 mb-2 text-center">
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter Unique Username"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={toggleShowPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="flex gap-2">
                <input
                  id="confirmPassword"
                  type={toggleShowPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 outline-none px-3"
                  onClick={() => {
                    setToggleShowPassword((value) => !value);
                  }}
                >
                  {toggleShowPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {error && (
            <div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <p className="text-center text-slate-600 text-sm mt-6">
            Have an account?{" "}
            <Link
              to="/auth/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
