import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import { AsyncPadDocumentOutput } from "../../dto/asyncpad-document-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class GetAsyncPadDocumentUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(
    userId: string,
    documentId: string
  ): Promise<AsyncPadDocumentOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const document = await this.asyncPadRepository.findById(documentId);

    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    if (document.ownerId !== userId) {
      throw new ForbiddenError("You are not allowed to access this document");
    }

    return {
      id: document.id,
      title: document.title,
      currentContent: document.currentContent,
      owner: user,
      currentVersion: document.currentVersion,
      isPrivate: document.isPrivate,
      isDeleted: document.isDeleted,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
