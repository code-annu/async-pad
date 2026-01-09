const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IAsyncPadRepository: Symbol.for("IAsyncPadRepository"),
  ICollaborationRepository: Symbol.for("ICollaborationRepository"),

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

  // Collaboration Use Cases
  GetCollaborationUsecase: Symbol.for("GetCollaborationUsecase"),
  GetUserCollaborationsUsecase: Symbol.for("GetUserCollaborationsUsecase"),
  UpdateCollaborationUsecase: Symbol.for("UpdateCollaborationUsecase"),
  UpdateCollaborationStatusUsecase: Symbol.for(
    "UpdateCollaborationStatusUsecase"
  ),
  SendCollaborationInvitationUsecase: Symbol.for(
    "SendCollaborationInvitationUsecase"
  ),
  ReactCollaborationInvitationUsecase: Symbol.for(
    "ReactCollaborationInvitationUsecase"
  ),
  GetDocumentCollaborationsUsecase: Symbol.for(
    "GetDocumentCollaborationsUsecase"
  ),
  CollaborationController: Symbol.for("CollaborationController"),
};

export { TYPES };
