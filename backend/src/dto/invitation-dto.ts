export interface InvitationCreateDTO {
  inviterId: string;
  inviteeUsername: string;
  docfileId: string;
  message: string;
}

export interface InvitationResponseDTO {
  id: string;
  inviter: { username: string; name: string };
  invitee: { username: string; name: string };
  message: string;
  status: string;
  docfile: {
    id: string;
    title: string;
    // creator: { username: string; name: string };
  };
}
