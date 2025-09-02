export interface UserRegisterDTO {
  username: string;
  password: string;
  name: string;
  bio: string;
}

export interface UserResponseDTO {
  username: string;
  name: string;
  id: string;
  bio?: string | null;
  //   projects:{}[]
}
