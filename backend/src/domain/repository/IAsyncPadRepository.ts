import {
  AsyncPadDocumentCreate,
  AsyncPadDocument,
  AsyncPadDocumentUpdate,
} from "../entities/async-pad-document-entity";

export interface IAsyncPadRepository {
  create(document: AsyncPadDocumentCreate): Promise<AsyncPadDocument>;
  findById(id: string): Promise<AsyncPadDocument | null>;
  update(
    id: string,
    updates: AsyncPadDocumentUpdate
  ): Promise<AsyncPadDocument>;

  delete(id: string): Promise<AsyncPadDocument>;
  findManyByOwnerId(ownerId: string): Promise<AsyncPadDocument[]>;
}
