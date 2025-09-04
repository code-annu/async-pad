import {
  type Invitation,
  type InvitationSend,
} from "../model/invitation-model";

export interface IInvitationRepository {
  sendInvitation(
    documentId: string,
    invitationData: InvitationSend
  ): Promise<Invitation>;

  getUserInvitations(): Promise<Invitation[]>;

  respondToInvitation(
    invitationId: string,
    accepted: boolean
  ): Promise<Invitation>;
}
