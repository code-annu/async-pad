import { injectable, inject } from "inversify";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import {
  CollaborationUpdateInput,
  CollaborationOutput,
} from "../../dto/collaboration-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ConflictError } from "../../../domain/error/ConflictError";
import { TYPES } from "../../../di/types";

@injectable()
export class UpdateCollaborationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepository: ICollaborationRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(input: CollaborationUpdateInput): Promise<CollaborationOutput> {
    const { id, userId, role } = input;

    const user = await this.userRepository.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or may be deleted");
    }

    const collaboration = await this.collaborationRepository.findById(id);
    if (!collaboration) {
      throw new NotFoundError("Collaboration not found or may be deleted");
    }

    if (collaboration.senderId !== userId) {
      throw new ConflictError("Only the sender can update the collaboration");
    }

    const updatedCollaboration = await this.collaborationRepository.update(id, {
      role,
    });

    const invitee = await this.userRepository.findById(collaboration.userId);
    if (!invitee) {
      throw new NotFoundError("Invitee not found or may be deleted");
    }

    const document = await this.asyncPadRepository.findById(
      collaboration.documentId
    );
    if (!document) {
      throw new NotFoundError("Document not found");
    }

    return {
      id: updatedCollaboration.id,
      document,
      user: invitee,
      sender: user,
      role: updatedCollaboration.role,
      status: updatedCollaboration.status,
      acceptedAt: updatedCollaboration.acceptedAt,
      createdAt: updatedCollaboration.createdAt,
      updatedAt: updatedCollaboration.updatedAt,
    };
  }
}
