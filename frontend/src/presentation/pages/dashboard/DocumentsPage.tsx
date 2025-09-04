import { useEffect, useState } from "react";
import CreateDocumentTab from "../../components/document/CreateDocumentTab";
import CreateDocumentDialog from "../../components/document/CreateDocumentDialog";
import { useDocument } from "../../../application/hooks/document-hook";
import { useApp } from "../../../application/context/AppContext";
import DocumentsCard from "../../components/document/DocumentCard";

function DocumentsPage() {
  const [showCreateDocumentPage, setShowCreateDocumentPage] = useState(false);
  const { createDocument, documents, getMyDocuments } = useDocument();
  const { user } = useApp();

  useEffect(() => {
    console.log("this is executed......");
    getMyDocuments();
    return;
  }, [user]);

  const toggleShowCreateDocumentPage = () => {
    setShowCreateDocumentPage(!showCreateDocumentPage);
  };

  return (
    <div className="mt-20 ml-10">
      <div className="flex flex-wrap space-x-10 space-y-15">
        {documents.map((document) => (
          <DocumentsCard document={document} onClick={() => {}} />
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
