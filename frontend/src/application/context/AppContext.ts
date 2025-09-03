import { createContext, useContext } from "react";
import type { User } from "../../domain/model/user-model";

export interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useApp(): AppContextType {
  return useContext(AppContext)!;
}
