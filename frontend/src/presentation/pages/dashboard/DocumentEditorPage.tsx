import { useParams } from "react-router-dom";
import { useDocument } from "../../../application/hooks/document-hook";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../../util/date-format-util";

function DocumentEditorPage() {
  const { documentId } = useParams();
  const { document, getDocument } = useDocument();
  const [content, setContent] = useState("");

  // Fetch document only once, on initial mount (or when documentId changes)
  useEffect(() => {
    if (documentId) {
      getDocument(documentId);
    }
  }, [documentId]); // <- Only re-run if documentId changes

  // Initialize content once when document appears
  useEffect(() => {
    if (document && content === "") {
      setContent(document.content);
    }
  }, [document]); // <- Only when `document` updates

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 space-y-6">
      {document ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800">{document.name}</h1>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-600">
            <div>
              <dt className="font-medium">Creator Username</dt>
              <dd>{document.creator.username}</dd>
            </div>
            <div>
              <dt className="font-medium">Creator Name</dt>
              <dd>{document.creator.name}</dd>
            </div>
            <div>
              <dt className="font-medium">Created At</dt>
              <dd>{formatDateTime(document.createdAt)}</dd>
            </div>
            <div>
              <dt className="font-medium">Updated At</dt>
              <dd>{formatDateTime(document.updatedAt)}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading document...</p>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[400px] p-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Edit document content..."
      />
    </div>
  );
}

export default DocumentEditorPage;
