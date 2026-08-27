import { useState, useEffect, type FormEvent, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { SignupRequest } from "../types";
import { UserContext } from "../context/UserContext";
import { sendOtp, signupUser } from "../services/auth";
import { notifySuccess } from "../utils/toast";

const RESEND_COOLDOWN_SECONDS = 30;

const SignUp = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => {
      setCooldown((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    setError(null);
    setOtpMessage(null);

    if (!email.trim()) {
      setError("Please enter your email before requesting OTP");
      return;
    }

    if (cooldown > 0) {
      return;
    }

    setIsSendingOtp(true);

    try {
      const data = await sendOtp(email.trim());
      // Old OTP is replaced on the backend; clear typed OTP so user enters the new one.
      setOtp("");
      setOtpMessage(data.message || "OTP sent to email");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      notifySuccess(data.message || "OTP sent to email");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send OTP";
      setError(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!username || !email || !password || !otp) {
      setError("Please fill in all fields including OTP");
      setIsLoading(false);
      return;
    }

    if (otp.trim().length !== 6) {
      setError("Please enter the 6-digit OTP");
      setIsLoading(false);
      return;
    }

    const signupData: SignupRequest = {
      username,
      email,
      password,
      otp: otp.trim(),
    };

    try {
      if (password !== confirmPassword) {
        throw new Error("Password didn't match");
      }

      const resData = await signupUser(signupData);

      notifySuccess("Profile created successfully");
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setOtp("");
      setOtpMessage(null);
      setCooldown(0);
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

  const canSendOtp = !isLoading && !isSendingOtp && cooldown === 0;
  const canSubmit =
    !isLoading && !isSendingOtp && otp.trim().length === 6;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-center text-xl font-bold text-slate-900">
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter Unique Username"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                disabled={isLoading || isSendingOtp}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                  disabled={isLoading || isSendingOtp}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!canSendOtp}
                  className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  {isSendingOtp
                    ? "Sending..."
                    : cooldown > 0
                      ? `Resend in ${cooldown}s`
                      : otpMessage
                        ? "Resend OTP"
                        : "Send OTP"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) => {
                  const nextValue = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  setOtp(nextValue);
                }}
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                disabled={isLoading || isSendingOtp}
              />
              {otpMessage && (
                <p className="mt-1 text-sm font-medium text-green-700">
                  {otpMessage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type={toggleShowPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                disabled={isLoading || isSendingOtp}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                  disabled={isLoading || isSendingOtp}
                />
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-3 outline-none"
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
              disabled={!canSubmit}
              className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {error && (
            <div className="mt-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-slate-600">
            Have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:underline"
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
