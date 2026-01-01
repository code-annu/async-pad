import { deleteRequest } from "../../services/api/delete-client";
import { getRequest } from "../../services/api/get-client";
import { patchRequest } from "../../services/api/patch-client";
import { postRequest } from "../../services/api/post-client";
import type {
  AsyncPadDocument,
  AsyncPadDocumentCreate,
  AsyncPadDocumentListResponse,
  AsyncPadDocumentResponse,
  AsyncPadDocumentSummary,
  AsyncPadDocumentUpdate,
} from "./types";

export abstract class DocumentApi {
  static async createDocument(
    document: AsyncPadDocumentCreate
  ): Promise<AsyncPadDocument> {
    const res = await postRequest<AsyncPadDocumentResponse>(
      "/documents",
      document
    );
    return res.data;
  }

  static async getDocumentList(): Promise<AsyncPadDocumentSummary[]> {
    const res = await getRequest<AsyncPadDocumentListResponse>("/documents");
    return res.data;
  }

  static async getDocumentById(id: string): Promise<AsyncPadDocument> {
    const res = await getRequest<AsyncPadDocumentResponse>(`/documents/${id}`);
    return res.data;
  }

  static async updateDocument(
    id: string,
    document: AsyncPadDocumentUpdate
  ): Promise<AsyncPadDocument> {
    const res = await patchRequest<AsyncPadDocumentResponse>(
      `/documents/${id}`,
      document
    );
    return res.data;
  }

  static async deleteDocument(id: string): Promise<AsyncPadDocument> {
    const res = await deleteRequest<AsyncPadDocumentResponse>(
      `/documents/${id}`
    );
    return res.data;
  }
}
