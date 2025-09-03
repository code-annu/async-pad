export interface User {
  id: string;
  username: string;
  name: string;
  bio?: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserRegister {
  username: string;
  password: string;
  name: string;
  bio?: string;
}
