import {
  CollaborationCreate,
  Collaboration,
  CollaborationUpdate,
} from "../entities/collaboration-entity";

export interface ICollaborationRepository {
  create(collaboration: CollaborationCreate): Promise<Collaboration>;
  update(id: string, updates: CollaborationUpdate): Promise<Collaboration>;
  delete(id: string): Promise<Collaboration>;
  findById(id: string): Promise<Collaboration | null>;
  findByDocumentId(documentId: string): Promise<Collaboration[]>;
  findByUserId(userId: string): Promise<Collaboration[]>;
  findByDocumentIdAndUserId(
    documentId: string,
    userId: string
  ): Promise<Collaboration | null>;
}
