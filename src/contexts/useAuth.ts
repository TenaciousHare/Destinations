import { createContext, useContext } from "react";
import type { User } from "firebase/auth";

export interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth musi być użyty wewnątrz AuthProvider");
  }
  return ctx;
};
