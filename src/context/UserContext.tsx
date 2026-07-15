import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

interface UserContextType {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User | null) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;
