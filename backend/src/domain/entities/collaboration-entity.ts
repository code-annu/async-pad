export enum CollaborationRole {
  VIEWER = "viewer",
  EDITOR = "editor",
}

export enum CollaborationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface Collaboration {
  id: string;
  documentId: string;
  userId: string;
  senderId: string;
  role: CollaborationRole;
  status: CollaborationStatus;
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollaborationCreate {
  documentId: string;
  userId: string;
  senderId: string;
  role: CollaborationRole;
}

export interface CollaborationUpdate {
  status?: CollaborationStatus;
  role?: CollaborationRole;
}
