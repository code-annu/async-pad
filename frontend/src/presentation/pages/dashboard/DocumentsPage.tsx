import { useEffect, useState } from "react";
import CreateDocumentTab from "../../components/document/CreateDocumentTab";
import CreateDocumentDialog from "../../components/document/CreateDocumentDialog";
import { useDocument } from "../../../application/hooks/document-hook";
import { useApp } from "../../../application/context/AppContext";
import DocumentsCard from "../../components/document/DocumentCard";
import { useNavigate } from "react-router-dom";

function DocumentsPage() {
  const [showCreateDocumentPage, setShowCreateDocumentPage] = useState(false);
  const { createDocument, documents, getMyDocuments } = useDocument();
  const { user } = useApp();
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log("this is executed......");
    getMyDocuments();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleShowCreateDocumentPage = () => {
    setShowCreateDocumentPage(!showCreateDocumentPage);
  };

  const onDocumentCardClick = (id: string) => {
    if (user) {
      navigateTo(`${id}`);
    }
  };

  return (
    <div className="mt-20 ml-10">
      <div className="flex flex-wrap space-x-10 space-y-15">
        {documents.map((document) => (
          <DocumentsCard document={document} onClick={onDocumentCardClick} />
        ))}

        <CreateDocumentTab onClick={toggleShowCreateDocumentPage} />
      </div>
      {showCreateDocumentPage ? (
        <CreateDocumentDialog saveDocument={createDocument} />
      ) : null}
    </div>
  );
}

export default DocumentsPage;
