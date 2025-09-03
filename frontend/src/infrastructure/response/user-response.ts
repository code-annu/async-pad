export interface UserProfileResponse {
  id: string;
  username: string;
  name: string;
  bio: string;
  documents: {
    id: string;
    name: string;
  }[];
}
