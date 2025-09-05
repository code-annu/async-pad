import { useEffect, useState } from "react";
import type {
  Document,
  DocumentCreate,
  DocumentUpdate,
} from "../../domain/model/document-model";
import { useApp } from "../context/AppContext";
import { createDocumentUsecase } from "../usecase/document/create-document-usecase";
import { getUserDocumentsUsecase } from "../usecase/document/get-user-documents-usecase";
import { getDocumentUsecase } from "../usecase/document/get-document-usecase";
import { updateDocumentUsecase } from "../usecase/document/update-document-usecase";
import { socket } from "../../config/socket";

export function useDocument() {
  const { user } = useApp();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    socket.connect();
    console.log("connecting...");

    const handler = (data: unknown) => {
      const document = data as Document;
      if (document.editedBy && document.editedBy.id !== user?.id) {
        // setDocument(document);
      }
    };

    socket.on("document:updated", handler);
  }, []);

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

  const updateDocument = async (id: string, updates: DocumentUpdate) => {
    const updatedDocument = await updateDocumentUsecase(id, updates);
    return updatedDocument;
  };

  return {
    createDocument,
    getMyDocuments,
    documents,
    getDocument,
    document,
    updateDocument,
  };
}
