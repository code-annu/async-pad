import { AsyncPadDocument } from "../../domain/entities/async-pad-document-entity";
import { AsyncPadDocumentDoc } from "../model/async-pad-document-model";

export class AsyncPadDocumentMapper {
  static toDomain(doc: AsyncPadDocumentDoc): AsyncPadDocument {
    return {
      id: doc._id.toString(),
      title: doc.title,
      currentContent: doc.currentContent,
      ownerId: doc.ownerId.toString(),
      isPrivate: doc.isPrivate,
      isDeleted: doc.isDeleted,
      currentVersion: doc.currentVersion,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
