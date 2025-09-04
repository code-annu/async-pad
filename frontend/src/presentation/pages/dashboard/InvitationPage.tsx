/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useInvitation } from "../../../application/hooks/invitation-hook";
import InvitationCard from "../../components/invitation/InvitationCard";

function InvitationPage() {
  const { getMyInvitations, invitations, respondToInvitation } =
    useInvitation();

  useEffect(() => {
    getMyInvitations();
  }, []);

  return (
    <div className="flex flex-row flex-wrap space-x-50 space-y-10">
      {invitations.map((invitation) => (
        <InvitationCard
          key={invitation.id}
          invitation={invitation}
          onAccept={(id: string) => {
            respondToInvitation(id, true);
          }}
          onReject={(id: string) => {
            respondToInvitation(id, false);
          }}
        />
      ))}
    </div>
  );
}

export default InvitationPage;
