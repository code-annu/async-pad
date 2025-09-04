import { User } from "../data/model/user-model";
import { InvitationResponseDTO } from "../dto/invitation-dto";
import { Invitation } from "../data/model/invitation-model";
import { Docfile } from "../data/model/docfile-model";

export function mapToInvitationResponseDTO(
  invitation: Invitation,
  inviter: User,
  invitee: User,
  docfile: Docfile
): InvitationResponseDTO {
  const invitationResponseDTO: InvitationResponseDTO = {
    id: invitation._id.toString(),
    inviter: {
      username: inviter.username,
      name: inviter.name,
    },
    invitee: {
      username: invitee.username,
      name: invitee.name,
    },
    docfile: {
      id: docfile._id.toString(),
      name: docfile.name,
    },
    message: invitation.message,
    status: invitation.status,
  };

  return invitationResponseDTO;
}
