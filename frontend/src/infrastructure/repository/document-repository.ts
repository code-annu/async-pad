import {
  type Document,
  type DocumentCreate,
} from "../../domain/model/document-model";
import { type IDocumentRepository } from "../../domain/repository/idocument-repository";
import { getRequest } from "../datasource/api/get-client";
import { postRequest } from "../datasource/api/post-client";
import { mapToDocument } from "../mapper/document-mapper";
import type { DocumentResponse } from "../response/document-response";

export class DocumentRepository implements IDocumentRepository {
  async createDocument(documentData: DocumentCreate): Promise<Document> {
    const documentResponse = await postRequest<DocumentResponse>(
      "/documents",
      documentData
    );
    return mapToDocument(documentResponse);
  }

  async getUserDocuments(username: string): Promise<Document[]> {
    const documentsResponse = await getRequest<{
      docfiles: DocumentResponse[];
    }>(`/users/${username}/documents`);

    console.log("docs from repo: ", documentsResponse);
    const documents = documentsResponse.docfiles.map((documentResponse) =>
      mapToDocument(documentResponse)
    );

    return documents;
  }
}
