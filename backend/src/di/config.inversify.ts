import { Container } from "inversify";
import { TYPES } from "./types";
import { SignupUsecase } from "../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecases/auth/RefreshTokenUsecase";
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { AuthController } from "../api/controller/AuthController";

const container = new Container();

// Use Cases
container.bind<SignupUsecase>(TYPES.SignupUsecase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUsecase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUsecase)
  .to(RefreshTokenUsecase);

// Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };
