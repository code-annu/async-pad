import { DocfileResponseDTO } from "./docfile-dto";

export interface UserRegisterDTO {
  username: string;
  password: string;
  name: string;
  bio: string;
}

export interface UserProfileResponseDTO {
  username: string;
  name: string;
  id: string;
  bio?: string | null | undefined;
  documents: { id: string; name: string }[];
  invitations: { id: string; message: string }[] | null;
}

export interface UserDocfilesResponseDTO {
  username: string;
  name: string;
  docfiles: DocfileResponseDTO[];
}
