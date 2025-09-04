import type {
  InvitationSend,
  Invitation,
} from "../../domain/model/invitation-model";
import type { IInvitationRepository } from "../../domain/repository/iinvitation-repository";
import { getRequest } from "../datasource/api/get-client";
import { patchRequest } from "../datasource/api/patch-client";
import { postRequest } from "../datasource/api/post-client";
import { mapToInvitation } from "../mapper/invitation-mapper";
import type { InvitationResponse } from "../response/invitation-response";

export class InvitationRepository implements IInvitationRepository {
  async sendInvitation(
    documentId: string,
    invitationData: InvitationSend
  ): Promise<Invitation> {
    const invitationResponse = await postRequest<InvitationResponse>(
      `/documents/${documentId}/invite`,
      invitationData
    );
    return mapToInvitation(invitationResponse);
  }

  async getUserInvitations(): Promise<Invitation[]> {
    const invitationsResponse = await getRequest<InvitationResponse[]>(
      `/invitations`
    );
    console.log(invitationsResponse);
    const invitations = invitationsResponse.map((invitationResponse) =>
      mapToInvitation(invitationResponse)
    );
    return invitations;
  }

  async respondToInvitation(
    invitationId: string,
    accepted: boolean
  ): Promise<Invitation> {
    const invitationResponse = await patchRequest<InvitationResponse>(
      `/invitations/${invitationId}/respond`,
      { accepted: accepted }
    );

    return mapToInvitation(invitationResponse);
  }
}
