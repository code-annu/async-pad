import { useEffect, useState } from "react";
import CreateDocumentTab from "../../components/document/CreateDocumentTab";
import CreateDocumentDialog from "../../components/document/CreateDocumentDialog";
import { useDocument } from "../../../application/hooks/document-hook";

function DocumentsPage() {
  const [showCreateDocumentPage, setShowCreateDocumentPage] = useState(false);
  const { createDocument, documents, getMyDocuments } = useDocument();

  useEffect(() => {
    console.log("this is executed......");
    getMyDocuments();
    return
  },[]);

  const toggleShowCreateDocumentPage = () => {
    setShowCreateDocumentPage(!showCreateDocumentPage);
  };

  return (
    <div className="mt-20 ml-10">
      <div>
        <h1>You have {documents.length} documents</h1>
        <CreateDocumentTab onClick={toggleShowCreateDocumentPage} />
      </div>
      {showCreateDocumentPage ? (
        <CreateDocumentDialog saveDocument={createDocument} />
      ) : null}
    </div>
  );
}

export default DocumentsPage;
