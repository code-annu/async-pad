import type { DocumentResponse } from "../response/document-response";
import { type Document } from "../../domain/model/document-model";

export function mapToDocument(documentResponse: DocumentResponse): Document {
  const { id, name, content, creator, createdAt, updatedAt } = documentResponse;
  const document: Document = {
    id: id,
    creator: creator,
    name: name,
    content: content,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
  return document;
}
