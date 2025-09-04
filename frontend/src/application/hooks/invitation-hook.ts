import { useState } from "react";
import type {
  Invitation,
  InvitationSend,
} from "../../domain/model/invitation-model";
import { inviteUserUsecase } from "../usecase/invitation/invite-user-usecase";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { getMyInvitationsUsecase } from "../usecase/invitation/get-my-invitations-usecase";

export function useInvitation() {
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const sendInvite = async (
    documentId: string,
    invitationData: InvitationSend
  ) => {
    try {
      await inviteUserUsecase(documentId, invitationData);
      setInviteSuccess(true);
    } catch (e) {
      if (e instanceof CustomError) {
        if (e.errorType == ErrorType.NOT_FOUND) {
          setInviteError("Username not found!");
          return;
        }
      }
      setInviteError((e as Error).message);
    }
  };

  const getMyInvitations = async () => {
    const invitations = await getMyInvitationsUsecase();
    setInvitations(invitations);
  };

  return {
    inviteSuccess,
    inviteError,
    setInviteSuccess,
    setInviteError,
    sendInvite,
    invitations,
    getMyInvitations,
  };
}
