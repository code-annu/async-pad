import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { User } from "../../domain/model/user-model";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AppContext.Provider>
  );
}
