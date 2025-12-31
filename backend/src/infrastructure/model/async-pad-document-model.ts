import mongoose, { Schema, Document, Types } from "mongoose";

export interface AsyncPadDocumentDoc extends Document {
  title: string;
  currentContent: string;
  ownerId: Types.ObjectId;
  isPrivate: boolean;
  isDeleted: boolean;
  currentVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const AsyncPadDocumentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    currentContent: { type: String, required: true },
    ownerId: { type: Types.ObjectId, required: true },
    isPrivate: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    currentVersion: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const AsyncPadDocumentModel = mongoose.model<AsyncPadDocumentDoc>(
  "AsyncPadDocument",
  AsyncPadDocumentSchema
);
