export interface AsyncPadDocument {
  readonly id: string;
  readonly title: string;
  readonly currentContent: string;
  readonly ownerId: string;
  readonly isPrivate: boolean;
  readonly isDeleted: boolean; // for now it true by default
  readonly currentVersion: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface AsyncPadDocumentCreate {
  title: string;
  currentContent: string;
  ownerId: string;
}

export interface AsyncPadDocumentUpdate {
  title?: string;
  currentContent?: string;
}
