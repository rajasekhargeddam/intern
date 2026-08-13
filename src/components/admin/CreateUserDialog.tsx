import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { SignupRequest } from "../../types";
import { createAdminUser } from "../../services/admin";

function CreateUserDialog() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    if (!username || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      setIsLoading(true);
      const userData: SignupRequest = { username, email, password };

      await createAdminUser(userData);

      alert("User Created successfully...");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Root>
      <Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
          <FaUserPlus />
          Create User
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <Title className="text-xl font-semibold">Create User</Title>

            <Close asChild>
              <button className="rounded-lg p-2 hover:bg-slate-100">
                <IoClose size={20} />
              </button>
            </Close>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}

export default CreateUserDialog;
