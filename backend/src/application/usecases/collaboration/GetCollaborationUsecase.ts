import { injectable, inject } from "inversify";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import { CollaborationOutput } from "../../dto/collaboration-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { TYPES } from "../../../di/types";

@injectable()
export class GetCollaborationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepository: ICollaborationRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(id: string): Promise<CollaborationOutput> {
    const collaboration = await this.collaborationRepository.findById(id);

    if (!collaboration) {
      throw new NotFoundError("Collaboration not found");
    }

    const invitee = await this.userRepository.findById(collaboration.userId);
    const sender = await this.userRepository.findById(collaboration.senderId);
    const document = await this.asyncPadRepository.findById(
      collaboration.documentId
    );

    if (!invitee) {
      throw new NotFoundError("Invitee not found");
    }
    if (!sender) {
      throw new NotFoundError("Sender not found");
    }
    if (!document) {
      throw new NotFoundError("Document not found");
    }

    return {
      id: collaboration.id,
      document,
      user: invitee,
      sender,
      role: collaboration.role,
      status: collaboration.status,
      acceptedAt: collaboration.acceptedAt,
      createdAt: collaboration.createdAt,
      updatedAt: collaboration.updatedAt,
    };
  }
}
