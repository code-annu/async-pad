import { createSlice } from "@reduxjs/toolkit";
import type { AsyncPadError } from "../../util/error-handler-util";
import type { AsyncPadDocument, AsyncPadDocumentSummary } from "./types";
import {
  createDocumentThunk,
  deleteDocument,
  getDocument,
  getDocuments,
  updateDocument,
} from "./document-thunk";

export interface DocumentState {
  documents: AsyncPadDocumentSummary[];
  currentDocument: AsyncPadDocument | null;
  loading: boolean;
  error: AsyncPadError | null;
  isCreating: boolean;
}

export const initialDocumentState: DocumentState = {
  documents: [],
  currentDocument: null,
  loading: false,
  error: null,
  isCreating: false,
};

const documentSlice = createSlice({
  name: "document",
  initialState: initialDocumentState,
  reducers: {},
  extraReducers: (builder) => {
    // createDocument
    builder.addCase(createDocumentThunk.pending, (state) => {
      state.isCreating = true;
      state.error = null;
    });
    builder.addCase(createDocumentThunk.fulfilled, (state, action) => {
      state.isCreating = false;
      state.error = null;
      state.documents.push(action.payload);
    });
    builder.addCase(createDocumentThunk.rejected, (state, action) => {
      state.isCreating = false;
      state.error = action.payload as AsyncPadError;
    });

    // getDocuments
    builder.addCase(getDocuments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(getDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AsyncPadError;
    });

    // getDocument
    builder.addCase(getDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.currentDocument = action.payload;
    });
    builder.addCase(getDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AsyncPadError;
    });

    // updateDocument
    builder.addCase(updateDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.currentDocument = action.payload;
      // Update in list if exists
      const index = state.documents.findIndex(
        (doc) => doc.id === action.payload.id
      );
      if (index !== -1) {
        state.documents[index] = {
          ...state.documents[index],
          title: action.payload.title,
          isPrivate: action.payload.isPrivate,
          // Update other summary fields if necessary
        };
      }
    });
    builder.addCase(updateDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AsyncPadError;
    });

    // deleteDocument
    builder.addCase(deleteDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload.id
      );
      if (state.currentDocument?.id === action.payload.id) {
        state.currentDocument = null;
      }
    });
    builder.addCase(deleteDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AsyncPadError;
    });
  },
});

export const documentReducer = documentSlice.reducer;
export default documentSlice;
