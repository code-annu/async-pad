import { User } from "../data/model/user-model";
import { Docfile } from "../data/model/docfile-model";
import {
  UserDocfilesResponseDTO,
  UserProfileResponseDTO,
} from "../dto/user-dto";
import { DocfileResponseDTO } from "../dto/docfile-dto";
import { Invitation } from "../data/model/invitation-model";

export function mapToUserProfileResponse(
  user: User,
  docfiles: Docfile[],
  invitations: Invitation[] | null
): UserProfileResponseDTO {
  const userResponse: UserProfileResponseDTO = {
    id: user._id.toString(),
    username: user.username,
    name: user.name,
    bio: user.bio,
    documents: docfiles.map((docfile) => {
      return { id: docfile._id.toString(), name: docfile.name };
    }),
    invitations: invitations
      ? invitations.map((invitation) => {
          return { id: invitation._id.toString(), message: invitation.message };
        })
      : null,
  };

  return userResponse;
}

export function mapToUserDocfilesResponse(
  user: User,
  docfilesResponse: DocfileResponseDTO[]
): UserDocfilesResponseDTO {
  const userDocfilesResponseDTO: UserDocfilesResponseDTO = {
    username: user.username,
    name: user.name,
    docfiles: docfilesResponse,
  };

  return userDocfilesResponseDTO;
}
