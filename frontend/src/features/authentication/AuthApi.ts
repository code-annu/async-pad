import { postRequest } from "../../services/api/post-client";
import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  SignupCredentials,
} from "./types";

export abstract class AuthApi {
  static async signup(credentials: SignupCredentials): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/signup",
      credentials
    );
    return response.data;
  }

  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  }

  static async refreshToken(token: string): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/refresh-token",
      { token }
    );
    return response.data;
  }
}
