import { useState } from "react";
import type {
  Document,
  DocumentCreate,
} from "../../domain/model/document-model";
import { useApp } from "../context/AppContext";
import { createDocumentUsecase } from "../usecase/document/create-document-usecase";
import { getUserDocumentsUsecase } from "../usecase/document/get-user-documents-usecase";
import { getDocumentUsecase } from "../usecase/document/get-document-usecase";

export function useDocument() {
  const { user } = useApp();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [document, setDocument] = useState<Document | null>(null);
  const createDocument = async (documentData: DocumentCreate) => {
    const document = await createDocumentUsecase(documentData);
    console.log(document);
    getMyDocuments();
  };

  const getMyDocuments = async () => {
    if (user) {
      const documents = await getUserDocumentsUsecase(user.username);
      console.log("Your documents are: ", documents);
      setDocuments(documents);
    }
  };

  const getDocument = async (id: string) => {
    setDocument(await getDocumentUsecase(id));
  };

  return { createDocument, getMyDocuments, documents, getDocument, document };
}
