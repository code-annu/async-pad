import { UserRepository } from "../data/repository/user-repository";
import { CustomError } from "../error/custom-error";
import { ErrorType } from "../error/error-type";
import { DocfileRepository } from "../data/repository/docfile-repository";
import {
  UserDocfilesResponseDTO,
  UserProfileResponseDTO,
} from "../dto/user-dto";
import {
  mapToUserDocfilesResponse,
  mapToUserProfileResponse,
} from "../mapper/user-mapper";
import { DocfileResponseDTO } from "../dto/docfile-dto";
import { mapToDocfileResponseDTO } from "../mapper/docfile-mapper";

export class UserService {
  private userRepository = new UserRepository();
  private docfileRepository = new DocfileRepository();

  async getUserProfile(username: string): Promise<UserProfileResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) throw new CustomError("User not found", ErrorType.NOT_FOUND);

    const docfiles = await this.docfileRepository.listDocfilesByIds(
      user.docfileIds
    );

    return mapToUserProfileResponse(user, docfiles);
  }

  async getUserDocfiles(username: string): Promise<UserDocfilesResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) throw new CustomError("User not found", ErrorType.NOT_FOUND);

    const docfiles = await this.docfileRepository.listDocfilesByIds(
      user.docfileIds
    );

    const docfilesResponse: DocfileResponseDTO[] = [];
    for (const docfile of docfiles) {
      const creator = await this.userRepository.getUserById(docfile.creatorId);
      const editors = await this.userRepository.listUsersByIds(
        docfile.editorIds
      );
      if (creator && editors)
        docfilesResponse.push(
          mapToDocfileResponseDTO(docfile, creator, editors)
        );
    }

    return mapToUserDocfilesResponse(user, docfilesResponse);
  }
}
