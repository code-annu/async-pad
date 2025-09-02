import {
  DocfileCreateDTO,
  DocfileResponseDTO,
  DocfileUpdateDTO,
} from "../dto/docfile-dto";
import { DocfileRepository } from "../data/repository/docfile-repository";
import { Docfile } from "../data/model/docfile-model";
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
    const { name, content, creatorId, editorIds } = docfileData;
    const creator = await this.userRepository.getUserById(creatorId);
    if (!creator)
      throw new CustomError("Creator not found", ErrorType.NOT_FOUND);

    const editors = await this.userRepository.listUsersByIds(editorIds);
    const docfile = await this.docfileRepository.saveDocfile({
      ...docfileData,
      creatorId: new Types.ObjectId(creatorId),
      editorIds: editors.map((editor) => editor._id),
    });

    return mapToDocfileResponseDTO(docfile, creator, editors);
  }

  /*async updateDocfile(
    editorId: string,
    docfileId: string,
    updates: DocfileUpdateDTO
  ): Promise<DocfileResponseDTO> {
    const docfile = await this.docfileRepository.getDocfileById(docfileId);
    if (!docfile)
      throw new CustomError("Docfile not found", ErrorType.NOT_FOUND);

    const editor = await this.userRepository.
  }*/
}
