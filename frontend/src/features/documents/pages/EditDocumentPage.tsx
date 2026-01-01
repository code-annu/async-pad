import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getDocument, updateDocument } from "../document-thunk";
import { CircularLoadingBar } from "../../../common/components/progress/CircularLoadingBar";
import debounce from "lodash/debounce";

export const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentDocument, loading, error } = useAppSelector(
    (state) => state.document
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

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
  // Using a ref to hold the debounced function to persist across renders
  const debouncedUpdate = useRef(
    debounce(
      (docId: string, data: { title?: string; currentContent?: string }) => {
        dispatch(updateDocument({ id: docId, data }));
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

  if (isInitializing && loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularLoadingBar size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading document: {error.error?.message || "Unknown error"}
      </div>
    );
  }

  if (!currentDocument && !loading) {
    return <div className="text-center mt-10">Document not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full text-3xl font-bold border-none focus:ring-0 focus:outline-none placeholder-gray-400 bg-transparent text-gray-800"
          placeholder="Untitled Document"
        />
      </div>
      <div className="flex-grow">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing..."
          className="w-full h-full p-4 text-lg border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div className="mt-2 text-right text-xs text-gray-400">
        {loading ? "Saving..." : "Saved"}
      </div>
    </div>
  );
};
