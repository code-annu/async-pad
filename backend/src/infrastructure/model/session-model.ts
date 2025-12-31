import mongoose, { Schema, Document, Types } from "mongoose";

export interface SessionDocument extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User", unique: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Index for auto-expiry if desired, but business logic handles it too.
// SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SessionModel = mongoose.model<SessionDocument>(
  "Session",
  SessionSchema
);
