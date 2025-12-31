import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { CreateAsyncPadDocumentUsecase } from "../../application/usecases/asyncpad_document/CreateAsyncPadDocumentUsecase";
import { GetAsyncPadDocumentUsecase } from "../../application/usecases/asyncpad_document/GetAsyncPadDocumentUsecase";
import { GetUserAsyncPadDocumentsUsecase } from "../../application/usecases/asyncpad_document/GetUserAsyncPadDocumentsUsecase";
import { UpdateAsyncPadDocumentUsecase } from "../../application/usecases/asyncpad_document/UpdateAsyncPadDocumentUsecase";
import { DeleteAsyncPadDocumentUsecase } from "../../application/usecases/asyncpad_document/DeleteAsyncPadDocumentUsecase";
import { AuthRequest } from "../middleware/validate-authorization";
import { AsyncPadDocumentResponseMapper } from "../response/asyncpad-document-response";

@injectable()
export class AsyncPadDocumentController {
  constructor(
    @inject(TYPES.CreateAsyncPadDocumentUsecase)
    private createAsyncPadDocumentUsecase: CreateAsyncPadDocumentUsecase,
    @inject(TYPES.GetAsyncPadDocumentUsecase)
    private getAsyncPadDocumentUsecase: GetAsyncPadDocumentUsecase,
    @inject(TYPES.GetUserAsyncPadDocumentsUsecase)
    private getUserAsyncPadDocumentsUsecase: GetUserAsyncPadDocumentsUsecase,
    @inject(TYPES.UpdateAsyncPadDocumentUsecase)
    private updateAsyncPadDocumentUsecase: UpdateAsyncPadDocumentUsecase,
    @inject(TYPES.DeleteAsyncPadDocumentUsecase)
    private deleteAsyncPadDocumentUsecase: DeleteAsyncPadDocumentUsecase
  ) {}

  public async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const output = await this.createAsyncPadDocumentUsecase.execute({
        ...req.body,
        ownerId: userId,
      });
      const response =
        AsyncPadDocumentResponseMapper.mapToDocumentDetailResponse(
          output,
          "Document created successfully",
          201
        );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id } = req.params;
      const output = await this.getAsyncPadDocumentUsecase.execute(userId!, id);
      const response =
        AsyncPadDocumentResponseMapper.mapToDocumentDetailResponse(
          output,
          "Document retrieved successfully",
          200
        );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getUserDocuments(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const output = await this.getUserAsyncPadDocumentsUsecase.execute(
        userId!
      );
      const response = AsyncPadDocumentResponseMapper.mapToDocumentListResponse(
        output,
        "Documents retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id } = req.params;
      const output = await this.updateAsyncPadDocumentUsecase.execute(
        userId!,
        id,
        req.body
      );
      const response =
        AsyncPadDocumentResponseMapper.mapToDocumentDetailResponse(
          output,
          "Document updated successfully",
          200
        );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { id } = req.params;
      const output = await this.deleteAsyncPadDocumentUsecase.execute(
        userId!,
        id
      );
      const response =
        AsyncPadDocumentResponseMapper.mapToDocumentDetailResponse(
          output,
          "Document deleted successfully",
          200
        );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
