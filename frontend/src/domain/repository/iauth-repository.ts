import type { UserRegister, User } from "../model/user-model";

export interface IAuthRepository {
  registerUser(userData: UserRegister): Promise<User>;
  loginUser(username: string, password: string): Promise<User>;
}
