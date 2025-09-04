import type { Invitation } from "../../../domain/model/invitation-model";
import { InvitationRepository } from "../../../infrastructure/repository/invitation-repository";

export async function respondToInvitationUsecase(
  invitationId: string,
  accepted: boolean
): Promise<Invitation> {
  const invitationRepository = new InvitationRepository();
  return invitationRepository.respondToInvitation(invitationId, accepted);
}
