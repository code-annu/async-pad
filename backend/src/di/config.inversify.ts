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
import { ProfileController } from "../api/controller/ProfileController";
import { AsyncPadDocumentController } from "../api/controller/AsyncPadDocumentController";
import { DeleteProfileUsecase } from "../application/usecases/profile/DeleteProfileUsecase";
import { GetProfileUsecase } from "../application/usecases/profile/GetProfileUsecase";
import { UpdateProfileUsecase } from "../application/usecases/profile/UpdateProfileUsecase";
import { CreateAsyncPadDocumentUsecase } from "../application/usecases/asyncpad_document/CreateAsyncPadDocumentUsecase";
import { GetAsyncPadDocumentUsecase } from "../application/usecases/asyncpad_document/GetAsyncPadDocumentUsecase";
import { UpdateAsyncPadDocumentUsecase } from "../application/usecases/asyncpad_document/UpdateAsyncPadDocumentUsecase";
import { DeleteAsyncPadDocumentUsecase } from "../application/usecases/asyncpad_document/DeleteAsyncPadDocumentUsecase";
import { GetUserAsyncPadDocumentsUsecase } from "../application/usecases/asyncpad_document/GetUserAsyncPadDocumentsUsecase";
import { IAsyncPadRepository } from "../domain/repository/IAsyncPadRepository";
import { AsyncPadRepository } from "../infrastructure/repository/AsyncPadRepository";
import { SendCollaborationInvitationUsecase } from "../application/usecases/collaboration/SendCollaborationInvitationUsecase";
import { ReactCollaborationInvitationUsecase } from "../application/usecases/collaboration/ReactCollaborationInvitationUsecase";
import { UpdateCollaborationUsecase } from "../application/usecases/collaboration/UpdateCollaborationUsecase";
import { GetCollaborationUsecase } from "../application/usecases/collaboration/GetCollaborationUsecase";
import { GetUserCollaborationsUsecase } from "../application/usecases/collaboration/GetUserCollaborationsUsecase";
import { GetDocumentCollaborationsUsecase } from "../application/usecases/collaboration/GetDocumentCollaborationsUsecase";
import { CollaborationController } from "../api/controller/CollaborationController";
import { ICollaborationRepository } from "../domain/repository/ICollaborationRepository";
import { CollaborationRepository } from "../infrastructure/repository/CollaborationRepository";

const container = new Container();

// Use Cases
container.bind<SignupUsecase>(TYPES.SignupUsecase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUsecase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUsecase)
  .to(RefreshTokenUsecase);

container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUsecase)
  .to(UpdateProfileUsecase);
container
  .bind<GetProfileUsecase>(TYPES.GetProfileUsecase)
  .to(GetProfileUsecase);
container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUsecase)
  .to(DeleteProfileUsecase);

// AsyncPad Document Use Cases
container
  .bind<CreateAsyncPadDocumentUsecase>(TYPES.CreateAsyncPadDocumentUsecase)
  .to(CreateAsyncPadDocumentUsecase);
container
  .bind<GetAsyncPadDocumentUsecase>(TYPES.GetAsyncPadDocumentUsecase)
  .to(GetAsyncPadDocumentUsecase);
container
  .bind<UpdateAsyncPadDocumentUsecase>(TYPES.UpdateAsyncPadDocumentUsecase)
  .to(UpdateAsyncPadDocumentUsecase);
container
  .bind<DeleteAsyncPadDocumentUsecase>(TYPES.DeleteAsyncPadDocumentUsecase)
  .to(DeleteAsyncPadDocumentUsecase);
container
  .bind<GetUserAsyncPadDocumentsUsecase>(TYPES.GetUserAsyncPadDocumentsUsecase)
  .to(GetUserAsyncPadDocumentsUsecase);

// Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);
container
  .bind<IAsyncPadRepository>(TYPES.IAsyncPadRepository)
  .to(AsyncPadRepository);

container
  .bind<ICollaborationRepository>(TYPES.ICollaborationRepository)
  .to(CollaborationRepository);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);
container
  .bind<AsyncPadDocumentController>(TYPES.AsyncPadDocumentController)
  .to(AsyncPadDocumentController);
container
  .bind<CollaborationController>(TYPES.CollaborationController)
  .to(CollaborationController);

container
  .bind<SendCollaborationInvitationUsecase>(
    TYPES.SendCollaborationInvitationUsecase
  )
  .to(SendCollaborationInvitationUsecase);
container
  .bind<ReactCollaborationInvitationUsecase>(
    TYPES.ReactCollaborationInvitationUsecase
  )
  .to(ReactCollaborationInvitationUsecase);
container
  .bind<UpdateCollaborationUsecase>(TYPES.UpdateCollaborationUsecase)
  .to(UpdateCollaborationUsecase);
container
  .bind<GetCollaborationUsecase>(TYPES.GetCollaborationUsecase)
  .to(GetCollaborationUsecase);
container
  .bind<GetUserCollaborationsUsecase>(TYPES.GetUserCollaborationsUsecase)
  .to(GetUserCollaborationsUsecase);
container
  .bind<GetDocumentCollaborationsUsecase>(
    TYPES.GetDocumentCollaborationsUsecase
  )
  .to(GetDocumentCollaborationsUsecase);

export { container };
