/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useDocument } from "../../../application/hooks/document-hook";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../../util/date-format-util";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useInvitation } from "../../../application/hooks/invitation-hook";
import { socket } from "../../../config/socket";

function DocumentEditorPage() {
  const { documentId } = useParams();
  const { document, getDocument, updateDocument } = useDocument();
  const [content, setContent] = useState("");
  const [inviteeUsername, setInviteeUsername] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");
  const { sendInvite, inviteError, inviteSuccess } = useInvitation();

  useEffect(() => {
    if (documentId) {
      socket.emit("room:join", documentId);
      getDocument(documentId);
    }
  }, [documentId]);

  useEffect(() => {
    if (document) {
      setContent(document.content);
      console.log("yes document edited");
    }
  }, [document]);

  const onDocumentEdit = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (documentId) {
      await updateDocument(documentId, {
        content: e.target.value,
        name: document!.name,
      });
    }
  };

  const onInvite = () => {
    if (documentId) {
      sendInvite(documentId, {
        username: inviteeUsername,
        message: invitationMessage,
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 space-y-6">
      {document ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800">{document.name}</h1>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-600">
            <div>
              <dt className="font-medium">Creator Username</dt>
              <dd>{document.creator.username}</dd>
            </div>
            <div>
              <dt className="font-medium">Creator Name</dt>
              <dd>{document.creator.name}</dd>
            </div>
            <div>
              <dt className="font-medium">Created At</dt>
              <dd>{formatDateTime(document.createdAt)}</dd>
            </div>
            <div>
              <dt className="font-medium">Updated At</dt>
              <dd>{formatDateTime(document.updatedAt)}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading document...</p>
      )}

      <textarea
        value={content}
        onChange={onDocumentEdit}
        className="w-full min-h-[400px] p-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Edit document content..."
      />

      <div className="mb-20 mt-10 flex flex-col space-y-5">
        <InputField
          value={inviteeUsername}
          onValueChange={setInviteeUsername}
          placeholder="Enter invitee username"
          label="Invitee your friend"
          paddingY="py-3"
          paddingX="px-3"
        />

        <InputField
          value={invitationMessage}
          onValueChange={setInvitationMessage}
          placeholder="Write a message here..."
          label="Attach a message"
          paddingY="py-3"
          paddingX="px-3"
        />

        <div className="flex justify-end">
          <PrimaryButton
            text="Invite"
            onClick={onInvite}
            width="w-1/2"
            height="h-10"
          />
        </div>
        {inviteError ? <h1 className="text-red-600">{inviteError}</h1> : null}
        {inviteSuccess ? (
          <h1 className="text-green-600">Invitation sent successfully.</h1>
        ) : null}
      </div>
    </div>
  );
}

export default DocumentEditorPage;
