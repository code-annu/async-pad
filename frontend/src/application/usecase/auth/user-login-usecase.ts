import {  type User } from "../../../domain/model/user-model";
import { AuthRepository } from "../../../infrastructure/repository/auth-repository";

export async function userLoginUseCase(
  username: string,
  password: string
): Promise<User> {
  const authRepository = new AuthRepository();
  return await authRepository.loginUser(username, password);
}
