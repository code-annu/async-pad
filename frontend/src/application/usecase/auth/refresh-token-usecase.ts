import type { User } from "../../../domain/model/user-model";
import { AuthRepository } from "../../../infrastructure/repository/auth-repository";

export async function refreshTokenUsecase(token: string): Promise<User> {
  const authRepository = new AuthRepository();
  return await authRepository.refreshToken(token);
}
