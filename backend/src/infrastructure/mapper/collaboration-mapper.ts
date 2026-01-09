import { Collaboration } from "../../domain/entities/collaboration-entity";
import { CollaborationDoc } from "../model/collaboration-model";

export class CollaborationMapper {
  static toDomain(doc: CollaborationDoc): Collaboration {
    return {
      id: doc._id.toString(),
      documentId: doc.documentId.toString(),
      userId: doc.userId.toString(),
      senderId: doc.senderId.toString(),
      role: doc.role,
      status: doc.status,
      acceptedAt: doc.acceptedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
