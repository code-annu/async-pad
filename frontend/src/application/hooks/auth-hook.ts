import type { UserRegister } from "../../domain/model/user-model";
import { useApp } from "../context/AppContext";
import { userRegisterUseCase } from "../usecase/auth/user-register-usecase";
import { userLoginUseCase } from "../usecase/auth/user-login-usecase";
import { StorageUtil } from "../../util/storage-util";
import { refreshTokenUsecase } from "../usecase/auth/refresh-token-usecase";

export function useAuth() {
  const { user, setUser } = useApp();
  const register = async (userData: UserRegister) => {
    const user = await userRegisterUseCase(userData);
    console.log(user);
    setUser(user);
    StorageUtil.saveAccessToken(user.accessToken);
    StorageUtil.saveRefreshToken(user.refreshToken);
  };

  const login = async (username: string, password: string) => {
    const user = await userLoginUseCase(username, password);
    console.log(user);
    setUser(user);
    StorageUtil.saveAccessToken(user.accessToken);
    StorageUtil.saveRefreshToken(user.refreshToken);
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshToken = StorageUtil.getRefreshToken();
    if (refreshToken) {
      const user = await refreshTokenUsecase(refreshToken);
      setUser(user);
      StorageUtil.saveAccessToken(user.accessToken);
      StorageUtil.saveRefreshToken(user.refreshToken);
      return true;
    }

    return false;
  };

  return { user, setUser, register, login, refreshToken };
}
