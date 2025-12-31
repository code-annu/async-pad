import { AsyncPadDocumentOutput } from "../../application/dto/asyncpad-document-dto";

export abstract class AsyncPadDocumentResponseMapper {
  static mapToDocumentDetailResponse(
    document: AsyncPadDocumentOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: {
        id: document.id,
        title: document.title,
        currentContent: document.currentContent,
        owner: {
          id: document.owner.id,
          username: document.owner.username,
          avatarUrl: document.owner.avatarUrl,
        },
        currentVersion: document.currentVersion,
        isPrivate: document.isPrivate,
        isDeleted: document.isDeleted,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
    };
  }

  static mapToDocumentListResponse(
    documents: AsyncPadDocumentOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: documents.map((document) => ({
        id: document.id,
        title: document.title,
        owner: {
          id: document.owner.id,
          username: document.owner.username,
          avatarUrl: document.owner.avatarUrl,
        },
        isPrivate: document.isPrivate,
        isDeleted: document.isDeleted,
      })),
    };
  }
}
