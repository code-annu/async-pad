import type { Invitation } from "../../domain/model/invitation-model";
import type { InvitationResponse } from "../response/invitation-response";

export function mapToInvitation(
  invitationResponse: InvitationResponse
): Invitation {
  const invitation: Invitation = {
    ...invitationResponse,
  };
  return invitation;
}
