import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import {
  CollaborationSendInput,
  CollaborationOutput,
} from "../../dto/collaboration-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { ConflictError } from "../../../domain/error/ConflictError";

@injectable()
export class SendCollaborationInvitationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepository: ICollaborationRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(input: CollaborationSendInput): Promise<CollaborationOutput> {
    const { documentId, username, senderId, role } = input;

    const sender = await this.userRepository.findById(senderId);
    if (!sender || sender.isDeleted) {
      throw new NotFoundError("Sender not found or account may be deleted");
    }

    const invitee = await this.userRepository.findByUsername(username);
    if (!invitee || invitee.isDeleted) {
      throw new NotFoundError(
        "User to invite not found or account may be deleted"
      );
    }

    const document = await this.asyncPadRepository.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found or may be deleted");
    }

    if (document.ownerId !== senderId) {
      throw new ForbiddenError("Only the owner can send invitations");
    }

    if (document.ownerId === invitee.id) {
      throw new ConflictError("Owner cannot invite themselves");
    }
    const existingCollaboration =
      await this.collaborationRepository.findByDocumentIdAndUserId(
        documentId,
        invitee.id
      );

    if (existingCollaboration) {
      throw new ConflictError("User is already invited to this document");
    }

    const collaboration = await this.collaborationRepository.create({
      documentId,
      userId: invitee.id,
      senderId,
      role,
    });

    return {
      id: collaboration.id,
      document,
      user: invitee,
      sender: sender,
      role: collaboration.role,
      status: collaboration.status,
      acceptedAt: collaboration.acceptedAt,
      createdAt: collaboration.createdAt,
      updatedAt: collaboration.updatedAt,
    };
  }
}
