import { Schema, Types, model } from "mongoose";

export interface RefreshToken extends Document {
  _id: Types.ObjectId;
  token: string;
  userId: Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema = new Schema<RefreshToken>(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const RefreshTokenModel = model<RefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);
