"use client";
// This is a client-side context provider for user data in a React application.

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import type { UserWithoutPassword } from "@/types/user";

type UserContextType = {
  user: UserWithoutPassword | null;
  setUser: Dispatch<SetStateAction<UserWithoutPassword | null>>;
};

type UserProviderProps = {
  initialUser?: UserWithoutPassword | null;
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  initialUser = null,
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
