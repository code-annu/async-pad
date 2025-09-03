import type { DocumentCreate } from "../../../domain/model/document-model";
import { type Document } from "../../../domain/model/document-model";
import { DocumentRepository } from "../../../infrastructure/repository/document-repository";

export async function createDocumentUsecase(
  documentData: DocumentCreate
): Promise<Document> {
  const documentRepository = new DocumentRepository();
  return await documentRepository.createDocument(documentData);
}
