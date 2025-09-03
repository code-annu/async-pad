import { DocumentRepository } from "../../../infrastructure/repository/document-repository";
import {type  Document } from "../../../domain/model/document-model";

export async function getUserDocumentsUsecase(
  username: string
): Promise<Document[]> {
  const documentRepository = new DocumentRepository();
  return documentRepository.getUserDocuments(username);
}
