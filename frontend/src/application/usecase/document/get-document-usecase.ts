import type { Document } from "../../../domain/model/document-model";
import { DocumentRepository } from "../../../infrastructure/repository/document-repository";

export async function getDocumentUsecase(id: string): Promise<Document> {
  const documentRepository = new DocumentRepository();
  return await documentRepository.getDocument(id);
}
