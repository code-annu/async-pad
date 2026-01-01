import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getDocument, updateDocument, deleteDocument } from "../document-thunk";
import { CircularLoadingBar } from "../../../common/components/progress/CircularLoadingBar";
import debounce from "lodash/debounce";
import { DangerButton } from "../../../common/components/buttons/DangerButton";
import { AppRoutes } from "../../../router";
import { ArrowLeft, Clock, User, Trash2 } from "lucide-react";

export const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentDocument, loading, error } = useAppSelector(
    (state) => state.document
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch document on mount
  useEffect(() => {
    if (id) {
      dispatch(getDocument(id))
        .unwrap()
        .then((doc) => {
          setTitle(doc.title);
          setContent(doc.currentContent);
          setIsInitializing(false);
        })
        .catch(() => setIsInitializing(false));
    }
  }, [dispatch, id]);

  // Debounced update function for content and title
  const debouncedUpdate = useRef(
    debounce(
      (docId: string, data: { title?: string; currentContent?: string }) => {
        if (
          data.title &&
          data.currentContent &&
          data.title.length > 0 &&
          data.currentContent.length > 0
        ) {
          dispatch(updateDocument({ id: docId, data }));
        }
      },
      1000
    )
  ).current;

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (id) {
      debouncedUpdate(id, { title: newTitle });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (id) {
      debouncedUpdate(id, { currentContent: newContent });
    }
  };

  const handleDelete = async () => {
    if (id && confirm("Are you sure you want to delete this document?")) {
      setIsDeleting(true);
      try {
        await dispatch(deleteDocument(id)).unwrap();
        navigate(AppRoutes.DOCUMENTS);
      } catch (error) {
        console.error("Failed to delete document", error);
        setIsDeleting(false);
      }
    }
  };

  if (isInitializing && loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <CircularLoadingBar size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Error loading document</p>
          <p>{error.error?.message || "Unknown error"}</p>
          <button
            onClick={() => navigate(AppRoutes.DOCUMENTS)}
            className="mt-4 text-blue-500 hover:underline"
          >
            Go back to documents
          </button>
        </div>
      </div>
    );
  }

  if (!currentDocument && !loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p className="text-xl mb-4">Document not found.</p>
          <button
            onClick={() => navigate(AppRoutes.DOCUMENTS)}
            className="text-blue-500 hover:underline"
          >
            Go back to documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate(AppRoutes.DOCUMENTS)}
              className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400 flex items-center">
                {loading ? "Saving..." : "Saved"}
              </span>
              <DangerButton
                onClick={handleDelete}
                isLoading={isDeleting}
                className="text-sm px-3 py-1"
                title="Delete Document"
              >
                <Trash2 className="w-4 h-4" />
              </DangerButton>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="text-2xl md:text-3xl font-bold bg-transparent border-none focus:ring-0 focus:outline-none placeholder-gray-300 text-gray-800 w-full"
              placeholder="Untitled Document"
            />
            {currentDocument && (
              <div className="flex items-center space-x-6 text-sm text-gray-500 flex-shrink-0">
                <div className="flex items-center" title="Owner">
                  <User className="w-4 h-4 mr-2" />
                  <span>{currentDocument.owner.username}</span>
                </div>
                <div className="flex items-center" title="Last Updated">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(currentDocument.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {currentDocument.isPrivate && (
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Private
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[600px] relative">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Start typing your thoughts..."
              className="w-full h-full resize-none border-none focus:ring-0 focus:outline-none text-gray-700 text-lg leading-relaxed bg-transparent"
              style={{ minHeight: "calc(100vh - 300px)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
