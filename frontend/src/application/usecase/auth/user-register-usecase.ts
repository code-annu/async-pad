import { type UserRegister, type User } from "../../../domain/model/user-model";
import { AuthRepository } from "../../../infrastructure/repository/auth-repository";

export async function userRegisterUseCase(
  userData: UserRegister
): Promise<User> {
  const authRepository = new AuthRepository();
  return await authRepository.registerUser(userData);
}
