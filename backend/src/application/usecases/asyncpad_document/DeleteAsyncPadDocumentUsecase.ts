import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import { AsyncPadDocumentOutput } from "../../dto/asyncpad-document-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class DeleteAsyncPadDocumentUsecase {
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
      throw new ForbiddenError("You are not allowed to delete this document");
    }

    const deletedDocument = await this.asyncPadRepository.delete(documentId);

    return {
      id: deletedDocument.id,
      title: deletedDocument.title,
      currentContent: deletedDocument.currentContent,
      owner: user,
      currentVersion: deletedDocument.currentVersion,
      isPrivate: deletedDocument.isPrivate,
      isDeleted: deletedDocument.isDeleted,
      createdAt: deletedDocument.createdAt,
      updatedAt: deletedDocument.updatedAt,
    };
  }
}
