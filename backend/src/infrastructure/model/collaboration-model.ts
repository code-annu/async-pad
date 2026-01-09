import mongoose, { Schema, Document, Types } from "mongoose";
import {
  CollaborationRole,
  CollaborationStatus,
} from "../../domain/entities/collaboration-entity";

export interface CollaborationDoc extends Document {
  documentId: Types.ObjectId;
  userId: Types.ObjectId;
  senderId: Types.ObjectId;
  role: CollaborationRole;
  status: CollaborationStatus;
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const CollaborationSchema: Schema = new Schema(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "AsyncPadDocument",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: Object.values(CollaborationRole),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CollaborationStatus),
      default: CollaborationStatus.PENDING,
    },
    acceptedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const CollaborationModel = mongoose.model<CollaborationDoc>(
  "Collaboration",
  CollaborationSchema
);
