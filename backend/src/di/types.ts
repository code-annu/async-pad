const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IAsyncPadRepository: Symbol.for("IAsyncPadRepository"),

  // Use Cases
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  AsyncPadDocumentController: Symbol.for("AsyncPadDocumentController"),

  // Use Cases
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),

  // AsyncPad Document Use Cases
  CreateAsyncPadDocumentUsecase: Symbol.for("CreateAsyncPadDocumentUsecase"),
  GetAsyncPadDocumentUsecase: Symbol.for("GetAsyncPadDocumentUsecase"),
  UpdateAsyncPadDocumentUsecase: Symbol.for("UpdateAsyncPadDocumentUsecase"),
  DeleteAsyncPadDocumentUsecase: Symbol.for("DeleteAsyncPadDocumentUsecase"),
  GetUserAsyncPadDocumentsUsecase: Symbol.for(
    "GetUserAsyncPadDocumentsUsecase"
  ),
};

export { TYPES };
