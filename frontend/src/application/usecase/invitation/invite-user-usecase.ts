import type {
  Invitation,
  InvitationSend,
} from "../../../domain/model/invitation-model";
import { InvitationRepository } from "../../../infrastructure/repository/invitation-repository";

export async function inviteUserUsecase(
  documentId: string,
  invitationData: InvitationSend
): Promise<Invitation> {
  const invitationRepository = new InvitationRepository();
  return await invitationRepository.sendInvitation(documentId, invitationData);
}
