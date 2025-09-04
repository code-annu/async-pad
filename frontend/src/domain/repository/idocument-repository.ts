import {
  type Document,
  type DocumentCreate,
  type DocumentUpdate,
} from "../model/document-model";

export interface IDocumentRepository {
  createDocument(documentData: DocumentCreate): Promise<Document>;
  getUserDocuments(username: string): Promise<Document[]>;
  getDocument(id: string): Promise<Document>;
  updateDocument(
    id: string,
    updates: DocumentUpdate
  ): Promise<Document>;
}
