import { Types } from "mongoose";
import { Docfile, DocfileModel } from "../model/docfile-model";
import { BaseRepository } from "./base-repository";

export class DocfileRepository extends BaseRepository<Docfile> {
  constructor() {
    super(DocfileModel);
  }

  saveDocfile = (
    docfileData: Pick<Docfile, "name" | "content" | "creatorId">
  ) => super.save(docfileData);

  getDocfileById = (docfileId: string | Types.ObjectId) =>
    super.getById(docfileId);

  listDocfilesByIds = (docfileIds: string[] | Types.ObjectId[]) =>
    super.listByIds(docfileIds);

  updateDocfileById = (
    docfileId: string | Types.ObjectId,
    updates: Partial<Pick<Docfile, "name" | "content">>
  ) => super.updateById(docfileId, updates);

  deleteDocfileById = (docfileId: string | Types.ObjectId) =>
    super.deleteById(docfileId);

  async addEditorId(
    docfileId: Types.ObjectId | string,
    editorId: Types.ObjectId | string
  ): Promise<Docfile | null> {
    const updatedDocfile = await DocfileModel.findByIdAndUpdate(
      docfileId,
      { $addToSet: { editorIds: editorId } },
      { new: true }
    );
    return updatedDocfile ? updatedDocfile.toObject() : null;
  }

  async removeEditorId(
    docfileId: Types.ObjectId | string,
    editorId: Types.ObjectId | string
  ): Promise<Docfile | null> {
    const updatedDocfile = await DocfileModel.findByIdAndUpdate(
      docfileId,
      { $pull: { editorIds: editorId } },
      { new: true }
    );
    return updatedDocfile ? updatedDocfile.toObject() : null;
  }
}
