export interface AuthResponse {
  status: string;
  message: string;
  code: number;
  data: AuthUser;
}

export interface AuthUser {
  user: {
    id: string;
    username: string;
    joinedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
  fullname: string;
  about?: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
