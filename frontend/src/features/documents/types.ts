export interface AsyncPadDocumentResponse {
  status: string;
  code: number;
  message: string;
  data: AsyncPadDocument;
}

export interface AsyncPadDocumentListResponse {
  status: string;
  code: number;
  message: string;
  data: AsyncPadDocumentSummary[];
}

export interface AsyncPadDocument {
  id: string;
  title: string;
  currentContent: string;
  owner: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  currentVersion: number;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AsyncPadDocumentSummary {
  id: string;
  title: string;
  owner: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  isPrivate: boolean;
}

export interface AsyncPadDocumentCreate {
  title: string;
  currentContent: string;
}

export interface AsyncPadDocumentUpdate {
  title?: string;
  currentContent?: string;
}
