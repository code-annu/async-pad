import React from "react";
import type { AsyncPadDocumentSummary } from "../types";

interface DocumentViewProps {
  document: AsyncPadDocumentSummary;
  onClick: (id: string) => void;
}

export const DocumentView: React.FC<DocumentViewProps> = ({
  document,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(document.id)}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={document.title}
        >
          {document.title}
        </h3>
        {document.isPrivate && (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            Private
          </span>
        )}
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-4">
        <div className="flex items-center">
          {document.owner.avatarUrl ? (
            <img
              src={document.owner.avatarUrl}
              alt={document.owner.username}
              className="w-6 h-6 rounded-full mr-2"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
              {document.owner.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{document.owner.username}</span>
        </div>
      </div>
    </div>
  );
};
