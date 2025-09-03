export interface User {
  id: string;
  username: string;
  name: string;
  bio?: string;
  accessToken: string;
  refreshToken: string;
  documents: {
    id: string;
    name: string;
  }[];
}

export interface UserRegister {
  username: string;
  password: string;
  name: string;
  bio?: string;
}
