import React, { useEffect, useState } from "react";
import { getDocuments, createDocument } from "../document-thunk";
import { DocumentView } from "../components/DocumentView";
import { useAppSelector, useAppDispatch } from "../../../app/app-hook";
import { CircularLoadingBar } from "../../../common/components/progress/CircularLoadingBar";
import { PrimaryButton } from "../../../common/components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router";

export const DocumentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { documents, loading, isCreating } = useAppSelector(
    (state) => state.document
  );

  useEffect(() => {
    if (documents.length === 0) {
      dispatch(getDocuments());
    }
  }, [dispatch, documents.length]);

  const handleCreateDocument = async () => {
    const newDoc = await dispatch(
      createDocument({
        title: "Untitled Document",
        currentContent: "Write here",
      })
    ).unwrap();
    navigate(`${AppRoutes.DOCUMENTS}/${newDoc.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Documents</h1>
        <PrimaryButton onClick={handleCreateDocument} isLoading={isCreating}>
          + Create Document
        </PrimaryButton>
      </div>

      {loading && documents.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <CircularLoadingBar size={48} />
        </div>
      ) : documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentView
              key={doc.id}
              document={doc}
              onClick={(id) => navigate(`${AppRoutes.DOCUMENTS}/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No documents found.</p>
        </div>
      )}
    </div>
  );
};
