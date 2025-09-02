import { Schema, model, Types, Document } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  username: string;
  passwordHash: string;
  name: string;
  bio?: string | null;
  projectIds: Types.ObjectId[];
  invitationIds?: Types.ObjectId[];
  docfileIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      maxLength: [100, "Username cannot exceeds the length of 100"],
    },
    passwordHash: { type: String, required: [true, "Password is required"] },
    name: {
      type: String,
      maxLength: [100, "Name cannot exceed 100 length"],
      required: [true, "Name is required"],
      minLength: [2, "Name should be at least 2 characters long"],
    },
    projectIds: [{ type: Types.ObjectId, required: true, ref: "Project" }],
    docfileIds: [{ type: Types.ObjectId, required: true, ref: "Docfile" }],
    invitationIds: [
      { type: Types.ObjectId, required: true, ref: "Invitation" },
    ],
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceeds the length of 500"],
    },
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", UserSchema);
