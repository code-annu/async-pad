export interface DocumentResponse {
  id: string;
  name: string;
  content: string;
  creator: {
    username: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
