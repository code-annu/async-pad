import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import { AsyncPadDocumentOutput } from "../../dto/asyncpad-document-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class GetUserAsyncPadDocumentsUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(userId: string): Promise<AsyncPadDocumentOutput[]> {
    const user = await this.userRepository.findById(userId);

    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const documents = await this.asyncPadRepository.findManyByOwnerId(userId);
    const notDeletedDocuments = documents.filter(
      (document) => !document.isDeleted
    );

    return notDeletedDocuments.map((document) => ({
      id: document.id,
      title: document.title,
      currentContent: document.currentContent,
      owner: user,
      currentVersion: document.currentVersion,
      isPrivate: document.isPrivate,
      isDeleted: document.isDeleted,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    }));
  }
}
