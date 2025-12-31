import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import {
  AsyncPadDocumentUpdateInput,
  AsyncPadDocumentOutput,
} from "../../dto/asyncpad-document-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class UpdateAsyncPadDocumentUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(
    userId: string,
    documentId: string,
    input: AsyncPadDocumentUpdateInput
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
      throw new ForbiddenError("You are not allowed to update this document");
    }

    const updatedDocument = await this.asyncPadRepository.update(
      documentId,
      input
    );

    return {
      id: updatedDocument.id,
      title: updatedDocument.title,
      currentContent: updatedDocument.currentContent,
      owner: user,
      currentVersion: updatedDocument.currentVersion,
      isPrivate: updatedDocument.isPrivate,
      isDeleted: updatedDocument.isDeleted,
      createdAt: updatedDocument.createdAt,
      updatedAt: updatedDocument.updatedAt,
    };
  }
}
