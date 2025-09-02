import { Types } from "mongoose";
import { InvitationModel, Invitation } from "../model/invitation-model";
import { BaseRepository } from "./base-repository";
import { InvitationStatus } from "../../types/invitation-types";

export class InvitationRepository extends BaseRepository<Invitation> {
  constructor() {
    super(InvitationModel);
  }

  saveInvitation = (
    invitationData: Pick<
      Invitation,
      "inviterId" | "inviteeId" | "docfileId" | "message"
    >
  ) => this.save(invitationData);

  getInvitationById = (invitationId: Types.ObjectId | string) =>
    this.getById(invitationId);

  listInvitationsByIds = (invitationIds: Types.ObjectId[] | string[]) =>
    this.listByIds(invitationIds);

  deleteInvitationById = (invitationId: Types.ObjectId | string) =>
    this.deleteById(invitationId);

  async updateInvitationStatus(
    invitationId: Types.ObjectId | string,
    updatedStatus: InvitationStatus | string
  ): Promise<Invitation | null> {
    const updatedInvitation = await InvitationModel.findByIdAndUpdate(
      invitationId,
      { status: updatedStatus },
      { new: true }
    );
    return updatedInvitation ? updatedInvitation.toObject() : null;
  }
}
