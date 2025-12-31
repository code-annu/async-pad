const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),

  // Use Cases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),

  // Use Cases
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
};

export { TYPES };
