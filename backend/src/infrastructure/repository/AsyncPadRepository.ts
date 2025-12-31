import { injectable } from "inversify";
import { IAsyncPadRepository } from "../../domain/repository/IAsyncPadRepository";
import {
  AsyncPadDocument,
  AsyncPadDocumentCreate,
  AsyncPadDocumentUpdate,
} from "../../domain/entities/async-pad-document-entity";
import { AsyncPadDocumentModel } from "../model/async-pad-document-model";
import { AsyncPadDocumentMapper } from "../mapper/async-pad-document-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class AsyncPadRepository implements IAsyncPadRepository {
  async create(document: AsyncPadDocumentCreate): Promise<AsyncPadDocument> {
    const newDocument = new AsyncPadDocumentModel(document);
    const savedDocument = await newDocument.save();
    return AsyncPadDocumentMapper.toDomain(savedDocument);
  }

  async findById(id: string): Promise<AsyncPadDocument | null> {
    const document = await AsyncPadDocumentModel.findById(id);
    return document ? AsyncPadDocumentMapper.toDomain(document) : null;
  }

  async update(
    id: string,
    updates: AsyncPadDocumentUpdate
  ): Promise<AsyncPadDocument> {
    const updatedDocument = await AsyncPadDocumentModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedDocument) {
      throw new NotFoundError(`Document with id ${id} not found`);
    }

    return AsyncPadDocumentMapper.toDomain(updatedDocument);
  }

  async delete(id: string): Promise<AsyncPadDocument> {
    const deletedDocument = await AsyncPadDocumentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedDocument) {
      throw new NotFoundError(`Document with id ${id} not found`);
    }

    return AsyncPadDocumentMapper.toDomain(deletedDocument);
  }

  async findManyByOwnerId(ownerId: string): Promise<AsyncPadDocument[]> {
    const documents = await AsyncPadDocumentModel.find({ ownerId });
    return documents.map(AsyncPadDocumentMapper.toDomain);
  }
}
