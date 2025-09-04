import { useApp } from "../../../application/context/AppContext";
import type { Invitation } from "../../../domain/model/invitation-model";

interface InvitationCardProps {
  invitation: Invitation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

function InvitationCard(props: InvitationCardProps) {
  const { user } = useApp();
  const { invitation, onAccept, onReject } = props;
  const isInvitee = user ? user.username == invitation.invitee.username : false;
  const showActions = isInvitee && invitation.status === "pending";
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="px-6 py-4">
        <h2 className="font-semibold text-xl text-gray-800">
          Invitation from {invitation.inviter.name} (@
          {invitation.inviter.username})
        </h2>
        <p className="text-gray-600 mt-2">{invitation.message}</p>
        <p className="text-sm text-gray-500 mt-2">
          Status:{" "}
          <span
            className={`font-medium ${
              invitation.status === "pending"
                ? "text-yellow-600"
                : invitation.status === "accepted"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {invitation.status}
          </span>
        </p>
        <div className="mt-3">
          <span className="text-sm font-medium text-gray-700">Document:</span>{" "}
          <a
            href={`/docs/${invitation.docfile.id}`}
            className="text-blue-500 hover:underline"
            download={invitation.docfile.name}
          >
            {invitation.docfile.name}
          </a>
        </div>
      </div>

      {showActions && (
        <div className="px-6 py-4 bg-gray-100 flex justify-end space-x-3">
          <button
            onClick={() => onAccept(invitation.docfile.id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(invitation.docfile.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default InvitationCard;
