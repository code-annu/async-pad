import { type Document, type DocumentCreate } from "../model/document-model";

export interface IDocumentRepository {
  createDocument(documentData: DocumentCreate): Promise<Document>;
  getUserDocuments(username: string): Promise<Document[]>;
}
