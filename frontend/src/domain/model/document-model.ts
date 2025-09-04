export interface Document {
  id: string;
  name: string;
  content: string;
  creator: {
    username: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  // editors:[]
}

export interface DocumentCreate {
  name: string;
  content: string;
}

export interface DocumentUpdate {
  name?: string;
  content?: string;
}
