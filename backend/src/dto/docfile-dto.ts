export interface DocfileCreateDTO {
  name: string;
  content: string;
  creatorId: string;
}

export interface DocfileUpdateDTO
  extends Partial<Pick<DocfileCreateDTO, "content" | "name">> {}

export interface DocfileResponseDTO {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  creator: { username: string; name: string };
  editors: { username: string; name: string }[];
}
