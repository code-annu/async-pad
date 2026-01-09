import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import { CollaborationOutput } from "../../dto/collaboration-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class GetUserCollaborationsUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepository: ICollaborationRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(userId: string): Promise<CollaborationOutput[]> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or may be deleted");
    }

    const collaborations = await this.collaborationRepository.findByUserId(
      userId
    );

    const output: CollaborationOutput[] = [];

    for (const collaboration of collaborations) {
      const invitee = await this.userRepository.findById(collaboration.userId);
      const sender = await this.userRepository.findById(collaboration.senderId);
      const document = await this.asyncPadRepository.findById(
        collaboration.documentId
      );

      if (invitee && sender && document) {
        output.push({
          id: collaboration.id,
          document,
          user: invitee,
          sender,
          role: collaboration.role,
          status: collaboration.status,
          acceptedAt: collaboration.acceptedAt,
          createdAt: collaboration.createdAt,
          updatedAt: collaboration.updatedAt,
        });
      }
    }

    return output;
  }
}
