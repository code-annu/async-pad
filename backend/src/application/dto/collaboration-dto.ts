import { AsyncPadDocument } from "../../domain/entities/async-pad-document-entity";
import {
  CollaborationRole,
  CollaborationStatus,
} from "../../domain/entities/collaboration-entity";
import { User } from "../../domain/entities/user-entity";

export interface CollaborationSendInput {
  documentId: string;
  username: string;
  senderId: string;
  role: CollaborationRole;
}

export interface CollaborationUpdateInput {
  userId: string;
  id: string;
  role?: CollaborationRole;
}

export interface CollaborationStatusUpdateInput {
  userId: string;
  id: string;
  accepted: boolean;
}

export interface CollaborationOutput {
  id: string;
  document: AsyncPadDocument;
  user: User;
  sender: User;
  role: CollaborationRole;
  status: CollaborationStatus;
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
