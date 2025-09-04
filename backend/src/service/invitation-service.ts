import { InvitationRepository } from "../data/repository/invitation-repository";
import { DocfileRepository } from "../data/repository/docfile-repository";
import {
  InvitationCreateDTO,
  InvitationResponseDTO,
} from "../dto/invitation-dto";
import { Types } from "mongoose";
import { UserRepository } from "../data/repository/user-repository";
import { InvitationStatus } from "../types/invitation-types";
import { CustomError } from "../error/custom-error";
import { ErrorType } from "../error/error-type";
import { mapToInvitationResponseDTO } from "../mapper/invitation-mapper";

export class InvitationService {
  private invitationRepository = new InvitationRepository();
  private userRepository = new UserRepository();
  private docfileRepository = new DocfileRepository();

  async sendDocfileInvitation(
    invitationData: InvitationCreateDTO
  ): Promise<InvitationResponseDTO> {
    const { inviterId, inviteeUsername, docfileId, message } = invitationData;

    const inviter = await this.userRepository.getUserById(inviterId);
    if (!inviter)
      throw new CustomError("Inviting sender not found!", ErrorType.NOT_FOUND);

    const invitee = await this.userRepository.getUserByUsername(
      inviteeUsername
    );
    if (!invitee)
      throw new CustomError("Invited user not found!", ErrorType.NOT_FOUND);

    const docfile = await this.docfileRepository.getDocfileById(docfileId);
    if (!docfile)
      throw new CustomError("Document not found!", ErrorType.NOT_FOUND);

    const invitation = await this.invitationRepository.saveInvitation({
      inviterId: new Types.ObjectId(inviterId),
      inviteeId: invitee._id,
      docfileId: new Types.ObjectId(docfileId),
      message: message,
    });

    const updatedInviter = await this.userRepository.addInvitationId(
      inviterId,
      invitation._id
    );

    const updatedInvitee = await this.userRepository.addInvitationId(
      invitee._id,
      invitation._id
    );

    if (!updatedInviter || !updatedInvitee)
      throw Error("Cannot update Inviting and invited user");

    return mapToInvitationResponseDTO(
      invitation,
      updatedInviter,
      updatedInvitee,
      docfile
    );
  }

  async respondToInvitation(
    invitationId: string,
    inviteeId: string,
    status: InvitationStatus | string
  ): Promise<InvitationResponseDTO> {
    const invitation = await this.invitationRepository.getInvitationById(
      invitationId
    );
    if (!invitation) throw Error("Invitation not found!");

    if (invitation.inviteeId.toString() != inviteeId)
      throw Error("You are not invitee to this invitation");

    const updatedInvitation =
      await this.invitationRepository.updateInvitationStatus(
        invitationId,
        status
      );
    if (!updatedInvitation) throw Error("Invitation cannot be updated"!);

    const docfile = await this.docfileRepository.addEditorId(
      invitation.docfileId,
      inviteeId
    );
    if (!docfile) throw Error("Cannot update document!");

    const inviter = await this.userRepository.getUserById(invitation.inviterId);
    if (!inviter) throw Error("Invitation sender not found!");

    const updatedInvitee = await this.userRepository.addDocfileId(
      inviteeId,
      docfile._id
    );

    return mapToInvitationResponseDTO(
      updatedInvitation,
      inviter,
      updatedInvitee!,
      docfile
    );
  }

  async getInvitationDetails(invitationId: string) {
    const invitation = await this.invitationRepository.getInvitationById(
      invitationId
    );
    if (!invitation) throw Error("Invitation not found!");

    const docfile = await this.docfileRepository.getDocfileById(
      invitation.docfileId
    );
    if (!docfile)
      throw new CustomError("Document not found!", ErrorType.NOT_FOUND);

    const inviter = await this.userRepository.getUserById(invitation.inviterId);
    if (!inviter)
      throw new CustomError("Inviting user not found!", ErrorType.NOT_FOUND);

    const invitee = await this.userRepository.getUserById(invitation.inviteeId);
    if (!invitee)
      throw new CustomError("Invited user not found!", ErrorType.NOT_FOUND);

    return mapToInvitationResponseDTO(invitation, inviter, invitee, docfile);
  }
}
