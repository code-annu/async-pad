export interface ProfileUpdateInput {
  username?: string;
  about?: string;
  fullname?: string;
  avatarUrl?: string;
}

export interface ProfileOutput {
  id: string;
  username: string;
  fullname: string;
  avatarUrl: string | null;
  about: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
