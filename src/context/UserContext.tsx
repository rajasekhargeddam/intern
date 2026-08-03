import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

interface UserContextType {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => void;
  userConnectionRemoved: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  userConnectionRemoved: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User | null) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const userConnectionRemoved = () => {
    if (user) {
      setUser({
        ...user,
        connectionsCount: user.connectionsCount ? user.connectionsCount - 1 : 0,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, userConnectionRemoved }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;
