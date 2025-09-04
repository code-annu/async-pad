export interface Invitation {
  id: string;
  inviter: { username: string; name: string };
  invitee: { username: string; name: string };
  message: string;
  status: string;
  docfile: { id: string; name: string };
}

export interface InvitationSend {
  username: string;
  message: string;
}
