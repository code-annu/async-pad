import type { Document } from "../../../domain/model/document-model";

interface DocumentsCardProps {
  document: Document; // ensure creatorName is available
  onClick: (id: string) => void;
}

function DocumentsCard({ document, onClick }: DocumentsCardProps) {
  // Format createdAt
  const formattedDate = new Date(document.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div
      className="max-w-md p-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(document.id)}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {document.name}
      </h2>
      <p className="text-sm text-gray-600 mt-5">
        Created:{" "}
        <span className="font-medium text-gray-700">{formattedDate}</span>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Creator:{" "}
        <span className="font-medium text-gray-700">
          {document.creator.name}
        </span>
      </p>
    </div>
  );
}

export default DocumentsCard;
