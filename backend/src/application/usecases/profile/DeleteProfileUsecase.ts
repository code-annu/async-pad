import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<ProfileOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isDeleted) {
      throw new NotFoundError("User account has been deleted");
    }

    const deletedUser = await this.userRepository.delete(userId);

    return {
      id: deletedUser.id,
      username: deletedUser.username,
      fullname: deletedUser.fullname,
      avatarUrl: deletedUser.avatarUrl,
      about: deletedUser.about,
      isDeleted: deletedUser.isDeleted,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt,
    };
  }
}
