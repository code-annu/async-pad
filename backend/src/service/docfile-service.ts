import {
  DocfileCreateDTO,
  DocfileResponseDTO,
  DocfileUpdateDTO,
} from "../dto/docfile-dto";
import { DocfileRepository } from "../data/repository/docfile-repository";
import { CustomError } from "../error/custom-error";
import { ErrorType } from "../error/error-type";
import { UserRepository } from "../data/repository/user-repository";
import { Types } from "mongoose";
import { mapToDocfileResponseDTO } from "../mapper/docfile-mapper";

export class DocfileService {
  private docfileRepository = new DocfileRepository();
  private userRepository = new UserRepository();

  async createNewDocfile(
    docfileData: DocfileCreateDTO
  ): Promise<DocfileResponseDTO> {
    const { creatorId } = docfileData;
    let creator = await this.userRepository.getUserById(creatorId);
    if (!creator)
      throw new CustomError("Creator not found", ErrorType.NOT_FOUND);

    const docfile = await this.docfileRepository.saveDocfile({
      ...docfileData,
      creatorId: new Types.ObjectId(creatorId),
    });

    creator = await this.userRepository.addDocfileId(creatorId, docfile._id);
    if (!creator) throw Error("Cannot update user");

    return mapToDocfileResponseDTO(docfile, creator, []);
  }

  async getDocfile(docfileId: string): Promise<DocfileResponseDTO> {
    const docfile = await this.docfileRepository.getDocfileById(docfileId);
    if (!docfile)
      throw new CustomError("Document not found!", ErrorType.NOT_FOUND);

    const creator = await this.userRepository.getUserById(docfile.creatorId);
    if (!creator)
      throw new CustomError("Creator not found", ErrorType.NOT_FOUND);

    const editors = await this.userRepository.listUsersByIds(docfile.editorIds);

    return mapToDocfileResponseDTO(docfile, creator, editors);
  }

  async updateDocfile(
    editorId: string,
    docfileId: string,
    updates: DocfileUpdateDTO
  ): Promise<DocfileResponseDTO> {
    const {} = updates;
    let editor = await this.userRepository.getUserById(editorId);
    if (!editor) throw new CustomError("Editor not found", ErrorType.NOT_FOUND);

    let docfile = await this.docfileRepository.getDocfileById(docfileId);
    if (!docfile)
      throw new CustomError("Document not found!", ErrorType.NOT_FOUND);

    const editorIds = docfile.editorIds.map((editorId) => editorId.toString());
    if (
      docfile.creatorId.toString() != editorId &&
      !editorIds.includes(editorId)
    )
      throw new CustomError(
        "You are not authorized to edit this document",
        ErrorType.FORBIDDEN
      );
    console.log("edited");
    docfile = await this.docfileRepository.updateDocfileById(
      docfileId,
      updates
    );

    if (!docfile) throw Error("Cannot update file");

    const creator = await this.userRepository.getUserById(docfile.creatorId);
    if (!creator)
      throw new CustomError("Creator not found", ErrorType.NOT_FOUND);

    const editors = await this.userRepository.listUsersByIds(docfile.editorIds);

    return mapToDocfileResponseDTO(docfile, creator, editors);
  }

  async deleteDocfile(docfileId: string, userId: string) {
    const docfile = await this.docfileRepository.getDocfileById(docfileId);
    if (!docfile)
      throw new CustomError("Document not found!", ErrorType.NOT_FOUND);

    if (
      docfile.creatorId.toString() != userId &&
      !docfile.editorIds.includes(new Types.ObjectId(userId))
    )
      throw new CustomError(
        "You are not authorized to delete this document",
        ErrorType.FORBIDDEN
      );

    await this.docfileRepository.deleteDocfileById(docfileId);
    await this.userRepository.removeDocfileId(docfile.creatorId, docfileId);
    for (const editorId of docfile.editorIds) {
      await this.userRepository.removeDocfileId(editorId, docfileId);
    }
  }
}
