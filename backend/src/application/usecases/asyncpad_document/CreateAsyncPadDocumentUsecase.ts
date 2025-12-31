import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IAsyncPadRepository } from "../../../domain/repository/IAsyncPadRepository";
import {
  AsyncPadDocumentCreateInput,
  AsyncPadDocumentOutput,
} from "../../dto/asyncpad-document-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class CreateAsyncPadDocumentUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IAsyncPadRepository)
    private asyncPadRepository: IAsyncPadRepository
  ) {}

  async execute(
    input: AsyncPadDocumentCreateInput
  ): Promise<AsyncPadDocumentOutput> {
    const user = await this.userRepository.findById(input.ownerId);

    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const createdDocument = await this.asyncPadRepository.create({
      title: input.title,
      currentContent: input.currentContent,
      ownerId: input.ownerId,
    });

    return {
      id: createdDocument.id,
      title: createdDocument.title,
      currentContent: createdDocument.currentContent,
      owner: user,
      currentVersion: createdDocument.currentVersion,
      isPrivate: createdDocument.isPrivate,
      isDeleted: createdDocument.isDeleted,
      createdAt: createdDocument.createdAt,
      updatedAt: createdDocument.updatedAt,
    };
  }
}
