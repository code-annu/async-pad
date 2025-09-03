export interface Document {
  id: string;
  name: string;
  content: string;
  creator: {
    username: string;
    name: string;
  };
}

export interface DocumentCreate {
  name: string;
  content: string;
}
