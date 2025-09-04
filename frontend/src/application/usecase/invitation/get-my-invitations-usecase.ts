import type { Invitation } from "../../../domain/model/invitation-model";
import { InvitationRepository } from "../../../infrastructure/repository/invitation-repository";

export async function getMyInvitationsUsecase(): Promise<Invitation[]> {
  const invitationRepository = new InvitationRepository();
  return await invitationRepository.getUserInvitations();
}
