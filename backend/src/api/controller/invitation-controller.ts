import { Request, Response } from "express";
import { InvitationService } from "../../service/invitation-service";
import { CustomError } from "../../error/custom-error";
import { InvitationStatus } from "../../types/invitation-types";

export class InvitationController {
  private invitationService = new InvitationService();
  async invitationPost(req: Request, res: Response) {
    try {
      const { username, message } = req.body;
      const user = req.user;

      const { docfileId } = req.params;
      if (!docfileId) throw Error("Include docfileId in path");

      const invitationResponse =
        await this.invitationService.sendProjectInvitation({
          inviteeUsername: username,
          message: message,
          inviterId: user.userId,
          docfileId: docfileId,
        });

      res.status(201).json(invitationResponse);
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }

  async invitationRespondPatch(req: Request, res: Response) {
    try {
      const { accepted } = req.body;
      const user = req.user;

      const { invitationId } = req.params;
      if (!invitationId) throw Error("Include invitationId in path");

      const invitationResponse =
        await this.invitationService.respondToInvitation(
          invitationId,
          user.userId,
          accepted ? InvitationStatus.ACCEPTED : InvitationStatus.REJECTED
        );

      res.status(200).json(invitationResponse);
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }
}
