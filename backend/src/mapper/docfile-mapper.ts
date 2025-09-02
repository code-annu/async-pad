import { Docfile } from "../data/model/docfile-model";
import { User } from "../data/model/user-model";
import { DocfileResponseDTO } from "../dto/docfile-dto";

export function mapToDocfileResponseDTO(
  docfile: Docfile,
  creator: User,
  editors: User[]
): DocfileResponseDTO {
  const docfileEditors = editors.map((editor) => {
    return { username: editor.username, name: editor.name };
  });

  const docfileResponse: DocfileResponseDTO = {
    id: docfile._id.toString(),
    name: docfile.name,
    content: docfile.content,
    createdAt: docfile.createdAt,
    updatedAt: docfile.updatedAt,
    creator: { username: creator.username, name: creator.name },
    editors: docfileEditors,
  };

  return docfileResponse;
}
