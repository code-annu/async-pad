import { User } from "../../domain/entities/user-entity";

export interface AsyncPadDocumentCreateInput {
  title: string;
  currentContent: string;
  ownerId: string;
}

export interface AsyncPadDocumentUpdateInput {
  title?: string;
  currentContent?: string;
}

export interface AsyncPadDocumentOutput {
  id: string;
  title: string;
  currentContent: string;
  owner: User;
  currentVersion: number;
  isPrivate: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
