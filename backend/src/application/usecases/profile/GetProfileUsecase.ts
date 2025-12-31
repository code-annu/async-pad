import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class GetProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<ProfileOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account has been deleted");
    }

    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      avatarUrl: user.avatarUrl,
      about: user.about,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
