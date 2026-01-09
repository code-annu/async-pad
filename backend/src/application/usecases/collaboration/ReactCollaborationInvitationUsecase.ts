import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import {
  CollaborationStatusUpdateInput,
  CollaborationOutput,
} from "../../dto/collaboration-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { ConflictError } from "../../../domain/error/ConflictError";
import { CollaborationStatus } from "../../../domain/entities/collaboration-entity";

@injectable()
export class ReactCollaborationInvitationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepository: ICollaborationRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(
    input: CollaborationStatusUpdateInput
  ): Promise<CollaborationOutput> {
    const { id, userId, accepted } = input;

    const user = await this.userRepository.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const collaboration = await this.collaborationRepository.findById(id);
    if (!collaboration) {
      throw new NotFoundError("Collaboration not found or may be deleted");
    }

    if (collaboration.userId !== userId) {
      throw new ForbiddenError(
        "You are not authorized to react to this invitation"
      );
    }

    if (collaboration.status !== CollaborationStatus.PENDING) {
      throw new ConflictError("Collaboration is already accepted or rejected");
    }

    const updatedCollaboration = await this.collaborationRepository.update(id, {
      status: accepted
        ? CollaborationStatus.ACCEPTED
        : CollaborationStatus.REJECTED,
    });

    const sender = await this.userRepository.findById(collaboration.senderId);
    if (!sender) {
      throw new NotFoundError("Sender not found or account may be deleted");
    }

    const document = await this.asyncPadRepository.findById(
      collaboration.documentId
    );
    if (!document) {
      throw new NotFoundError("Document not found or may be deleted");
    }

    return {
      id: updatedCollaboration.id,
      document,
      user,
      sender,
      role: updatedCollaboration.role,
      status: updatedCollaboration.status,
      acceptedAt: updatedCollaboration.acceptedAt,
      createdAt: updatedCollaboration.createdAt,
      updatedAt: updatedCollaboration.updatedAt,
    };
  }
}
