import { useEffect } from "react";
import { useInvitation } from "../../../application/hooks/invitation-hook";
import InvitationCard from "../../components/invitation/InvitationCard";

function InvitationPage() {
  const { getMyInvitations, invitations } = useInvitation();

  useEffect(() => {
    getMyInvitations();
  }, []);

  return (
    <div className="flex flex-row flex-wrap space-x-50 space-y-10">
      {invitations.map((invitation) => (
        <InvitationCard
          invitation={invitation}
          onAccept={(id: string) => {}}
          onReject={(id: string) => {}}
        />
      ))}

      
    </div>
  );
}

export default InvitationPage;
