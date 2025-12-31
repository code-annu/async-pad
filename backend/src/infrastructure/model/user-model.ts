import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  fullname: string;
  about: string | null;
  avatarUrl: string | null;
  passwordHash: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    about: { type: String, default: null },
    avatarUrl: { type: String, default: null },
    passwordHash: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
