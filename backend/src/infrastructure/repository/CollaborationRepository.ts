import { injectable } from "inversify";
import { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";
import {
  Collaboration,
  CollaborationCreate,
  CollaborationUpdate,
} from "../../domain/entities/collaboration-entity";
import { CollaborationModel } from "../model/collaboration-model";
import { CollaborationMapper } from "../mapper/collaboration-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class CollaborationRepository implements ICollaborationRepository {
  async create(collaboration: CollaborationCreate): Promise<Collaboration> {
    const newCollaboration = new CollaborationModel(collaboration);
    const savedCollaboration = await newCollaboration.save();
    return CollaborationMapper.toDomain(savedCollaboration);
  }

  async update(
    id: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration> {
    const updatedCollaboration = await CollaborationModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updates,
          ...(updates.status === "accepted" ? { acceptedAt: new Date() } : {}),
        },
      },
      { new: true }
    );

    if (!updatedCollaboration) {
      throw new NotFoundError(`Collaboration with id ${id} not found`);
    }

    return CollaborationMapper.toDomain(updatedCollaboration);
  }

  async delete(id: string): Promise<Collaboration> {
    const deletedCollaboration = await CollaborationModel.findByIdAndDelete(id);

    if (!deletedCollaboration) {
      throw new NotFoundError(`Collaboration with id ${id} not found`);
    }

    return CollaborationMapper.toDomain(deletedCollaboration);
  }

  async findById(id: string): Promise<Collaboration | null> {
    const collaboration = await CollaborationModel.findById(id);
    return collaboration ? CollaborationMapper.toDomain(collaboration) : null;
  }

  async findByDocumentId(documentId: string): Promise<Collaboration[]> {
    const collaborations = await CollaborationModel.find({ documentId });
    return collaborations.map(CollaborationMapper.toDomain);
  }

  async findByUserId(userId: string): Promise<Collaboration[]> {
    const collaborations = await CollaborationModel.find({ userId });
    return collaborations.map(CollaborationMapper.toDomain);
  }

  async findByDocumentIdAndUserId(
    documentId: string,
    userId: string
  ): Promise<Collaboration | null> {
    const collaboration = await CollaborationModel.findOne({
      documentId,
      userId,
    });
    return collaboration ? CollaborationMapper.toDomain(collaboration) : null;
  }
}
