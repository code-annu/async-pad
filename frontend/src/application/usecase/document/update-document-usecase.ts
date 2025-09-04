import type {
  Document,
  DocumentUpdate,
} from "../../../domain/model/document-model";
import { DocumentRepository } from "../../../infrastructure/repository/document-repository";

export async function updateDocumentUsecase(
  id: string,
  updates: DocumentUpdate
): Promise<Document> {
  const documentRepository = new DocumentRepository();
  return await documentRepository.updateDocument(id, updates);
}
