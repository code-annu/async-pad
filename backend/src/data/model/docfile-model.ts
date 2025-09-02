import { Document, Schema, model, Types } from "mongoose";

export interface Docfile extends Document {
  _id: Types.ObjectId;
  name: string;
  content: string;
  creatorId: Types.ObjectId;
  editorIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const DocfileSchema = new Schema<Docfile>(
  {
    name: {
      type: String,
      required: [true, "Docfile name is required"],
      maxLength: [100, "Name should not exceeds the limit of 100 characters"],
    },
    content: { type: String, required: [true, "Content is required"] },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Creator id is required"],
      ref: "User",
    },
    editorIds: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Editor id is required"],
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const DocfileModel = model<Docfile>("Docfile", DocfileSchema);
