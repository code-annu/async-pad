import type { UserRegister, User } from "../../domain/model/user-model";
import type { IAuthRepository } from "../../domain/repository/iauth-repository";
import { postRequest } from "../datasource/api/post-client";
import { mapToUser } from "../mapper/user-mapper";
import type { AuthResponse } from "../response/auth-response";

export class AuthRepository implements IAuthRepository {
  async registerUser(userData: UserRegister): Promise<User> {
    const authResponse = await postRequest<AuthResponse>(
      "/auth/register",
      userData
    );

    return mapToUser(authResponse);
  }

  async loginUser(username: string, password: string): Promise<User> {
    const authResponse = await postRequest<AuthResponse>("/auth/login", {
      username: username,
      password: password,
    });

    return mapToUser(authResponse);
  }

  async refreshToken(token: string): Promise<User> {
    const authResponse = await postRequest<AuthResponse>(
      "/auth/refresh-token",
      { refreshToken: token }
    );
    return mapToUser(authResponse);
  }
}
