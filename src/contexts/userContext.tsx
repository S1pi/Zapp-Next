"use client";
// This is a client-side context provider for user data in a React application.

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import type { UserSessionData, UserWithoutPassword } from "@/types/user";

type UserSessionContextType = {
  userSession: UserSessionData | null;
  setUserSession: Dispatch<SetStateAction<UserSessionData | null>>;
};

type UserSessionProviderProps = {
  initialSession?: UserSessionData | null;
  children: React.ReactNode;
};

const UserSessionContext = createContext<UserSessionContextType | null>(null);

export const UserSessionProvider = ({
  initialSession = null,
  children,
}: UserSessionProviderProps) => {
  const [userSession, setUserSession] = useState<UserSessionData | null>(
    initialSession
  );

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useAdminSession = () => {
  const context = useContext(UserSessionContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
