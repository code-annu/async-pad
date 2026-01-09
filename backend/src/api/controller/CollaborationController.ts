import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../di/types";
import { SendCollaborationInvitationUsecase } from "../../application/usecases/collaboration/SendCollaborationInvitationUsecase";
import { ReactCollaborationInvitationUsecase } from "../../application/usecases/collaboration/ReactCollaborationInvitationUsecase";
import { UpdateCollaborationUsecase } from "../../application/usecases/collaboration/UpdateCollaborationUsecase";
import { GetCollaborationUsecase } from "../../application/usecases/collaboration/GetCollaborationUsecase";
import { GetUserCollaborationsUsecase } from "../../application/usecases/collaboration/GetUserCollaborationsUsecase";
import { GetDocumentCollaborationsUsecase } from "../../application/usecases/collaboration/GetDocumentCollaborationsUsecase";
import { CollaborationResponse } from "../response/collaboration-response";
import { AuthRequest } from "../middleware/validate-authorization";

@injectable()
export class CollaborationController {
  constructor(
    @inject(TYPES.SendCollaborationInvitationUsecase)
    private sendInvitationUsecase: SendCollaborationInvitationUsecase,
    @inject(TYPES.ReactCollaborationInvitationUsecase)
    private reactInvitationUsecase: ReactCollaborationInvitationUsecase,
    @inject(TYPES.UpdateCollaborationUsecase)
    private updateCollaborationUsecase: UpdateCollaborationUsecase,
    @inject(TYPES.GetCollaborationUsecase)
    private getCollaborationUsecase: GetCollaborationUsecase,
    @inject(TYPES.GetUserCollaborationsUsecase)
    private getUserCollaborationsUsecase: GetUserCollaborationsUsecase,
    @inject(TYPES.GetDocumentCollaborationsUsecase)
    private getDocumentCollaborationsUsecase: GetDocumentCollaborationsUsecase
  ) {}

  async sendInvitation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const senderId = req.auth!.userId;
      const documentId = req.params.id;
      const { username, role } = req.body;

      const collaboration = await this.sendInvitationUsecase.execute({
        documentId,
        username,
        senderId,
        role,
      });

      res
        .status(201)
        .json(
          CollaborationResponse.toDetailResponse(
            collaboration,
            "Invitation sent successfully",
            201
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async reactToInvitation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { id } = req.params;
      const { accept } = req.body;

      const collaboration = await this.reactInvitationUsecase.execute({
        userId,
        id,
        accepted: accept,
      });

      console.log(collaboration);
      res
        .status(200)
        .json(
          CollaborationResponse.toDetailResponse(
            collaboration,
            `Invitation ${accept ? "accepted" : "rejected"} successfully`,
            200
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { id } = req.params;
      const { role } = req.body;

      const collaboration = await this.updateCollaborationUsecase.execute({
        userId,
        id,
        role,
      });

      res
        .status(200)
        .json(
          CollaborationResponse.toDetailResponse(
            collaboration,
            "Role updated successfully",
            200
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const collaboration = await this.getCollaborationUsecase.execute(id);

      res
        .status(200)
        .json(
          CollaborationResponse.toDetailResponse(
            collaboration,
            "Collaboration retrieved successfully",
            200
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async getUserCollaborations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth!.userId;
      const collaborations = await this.getUserCollaborationsUsecase.execute(
        userId
      );

      res
        .status(200)
        .json(
          CollaborationResponse.toListResponse(
            collaborations,
            "User collaborations retrieved successfully",
            200
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async getDocumentCollaborations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth!.userId;
      const { id: documentId } = req.params;

      const collaborations =
        await this.getDocumentCollaborationsUsecase.execute(userId, documentId);

      res
        .status(200)
        .json(
          CollaborationResponse.toListResponse(
            collaborations,
            "Document collaborations retrieved successfully",
            200
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
