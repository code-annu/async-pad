export interface User {
  id: string;
  username: string;
  fullname: string;
  about: string | null;
  avatarUrl: string | null;
  passwordHash: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  username: string;
  fullname: string;
  about?: string;
  avatarUrl?: string;
  passwordHash: string;
}

export interface UserUpdate {
  username?: string;
  fullname?: string;
  about?: string;
  avatarUrl?: string;
}
