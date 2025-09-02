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
import { InvitationRepository } from "../data/repository/invitation-repository";

export class UserService {
  private userRepository = new UserRepository();
  private docfileRepository = new DocfileRepository();
  private invitationRepository = new InvitationRepository();

  async getUserProfile(
    username: string,
    includeInvitations: boolean = false
  ): Promise<UserProfileResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) throw new CustomError("User not found", ErrorType.NOT_FOUND);

    const docfiles = await this.docfileRepository.listDocfilesByIds(
      user.docfileIds
    );

    let invitations = null;
    if (includeInvitations)
      invitations = await this.invitationRepository.listInvitationsByIds(
        user.invitationIds
      );
    return mapToUserProfileResponse(user, docfiles, invitations);
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

  // async getUserInvitations(userId: string) {}
}
