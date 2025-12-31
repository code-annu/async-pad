export interface ProfileResponse {
  code: number;
  status: number;
  message: string;
  data: Profile;
}

export interface Profile {
  id: string;
  username: string;
  fullname: string;
  avatarUrl: string | null;
  about: string | null;
  joinedAt: string;
  updatedAt: string;
}

export interface ProfileUpdate {
  username?: string;
  fullname?: string;
  avatarUrl?: string;
  about?: string;
}
