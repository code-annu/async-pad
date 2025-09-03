import type { UserRegister } from "../../domain/model/user-model";
import { useApp } from "../context/AppContext";
import { userRegisterUseCase } from "../usecase/auth/user-register-usecase";
import { userLoginUseCase } from "../usecase/auth/user-login-usecase";

export function useAuth() {
  const { user, setUser } = useApp();
  const register = async (userData: UserRegister) => {
    const registeredUser = await userRegisterUseCase(userData);
    console.log(registeredUser);
    setUser(registeredUser);
  };

  const login = async (username: string, password: string) => {
    const loggedUser = await userLoginUseCase(username, password);
    console.log(loggedUser);
    setUser(loggedUser);
  };

  return { user, setUser, register, login };
}
