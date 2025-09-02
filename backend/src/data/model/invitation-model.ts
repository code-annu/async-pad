import { Document, Schema, Types, model } from "mongoose";
import { InvitationStatus } from "../../types/invitation-types";

export interface Invitation extends Document {
  _id: Types.ObjectId;
  inviterId: Types.ObjectId;
  inviteeId: Types.ObjectId;
  docfileId: Types.ObjectId;
  status: InvitationStatus;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const invitationSchema = new Schema<Invitation>(
  {
    inviterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    inviteeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    docfileId: { type: Schema.Types.ObjectId, ref: "Docfile", required: true },
    status: {
      type: String,
      enum: Object.values(InvitationStatus),
      default: InvitationStatus.PENDING,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const InvitationModel = model<Invitation>(
  "Invitation",
  invitationSchema
);
