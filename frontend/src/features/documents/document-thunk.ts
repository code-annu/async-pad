import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentApi } from "./DocumentApi";
import type {
  AsyncPadDocument,
  AsyncPadDocumentCreate,
  AsyncPadDocumentSummary,
  AsyncPadDocumentUpdate,
} from "./types";
import {
  mapToCustomError,
  type AsyncPadError,
} from "../../util/error-handler-util";

export const createDocumentThunk = createAsyncThunk<
  AsyncPadDocument,
  AsyncPadDocumentCreate,
  { rejectValue: AsyncPadError }
>("documents/createDocument", async (data, { rejectWithValue }) => {
  try {
    return await DocumentApi.createDocument(data);
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const getDocuments = createAsyncThunk<
  AsyncPadDocumentSummary[],
  void,
  { rejectValue: AsyncPadError }
>("documents/getDocuments", async (_, { rejectWithValue }) => {
  try {
    return await DocumentApi.getDocumentList();
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const getDocument = createAsyncThunk<
  AsyncPadDocument,
  string,
  { rejectValue: AsyncPadError }
>("documents/getDocument", async (id, { rejectWithValue }) => {
  try {
    return await DocumentApi.getDocumentById(id);
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const createDocument = createAsyncThunk<
  AsyncPadDocument,
  AsyncPadDocumentCreate,
  { rejectValue: AsyncPadError }
>("documents/createDocument", async (data, { rejectWithValue }) => {
  try {
    return await DocumentApi.createDocument(data);
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const updateDocument = createAsyncThunk<
  AsyncPadDocument,
  { id: string; data: AsyncPadDocumentUpdate },
  { rejectValue: AsyncPadError }
>("documents/updateDocument", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await DocumentApi.updateDocument(id, data);
    return res;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const deleteDocument = createAsyncThunk<
  AsyncPadDocument,
  string,
  { rejectValue: AsyncPadError }
>("documents/deleteDocument", async (id, { rejectWithValue }) => {
  try {
    return await DocumentApi.deleteDocument(id);
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});
