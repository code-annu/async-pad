import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { UpdateProfileUsecase } from "../../application/usecases/profile/UpdateProfileUsecase";
import { GetProfileUsecase } from "../../application/usecases/profile/GetProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecases/profile/DeleteProfileUsecase";
import { AuthRequest } from "../middleware/validate-authorization";
import { ProfileResponseMapper } from "../response/profile-response";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.UpdateProfileUsecase)
    private updateProfileUsecase: UpdateProfileUsecase,
    @inject(TYPES.GetProfileUsecase)
    private getProfileUsecase: GetProfileUsecase,
    @inject(TYPES.DeleteProfileUsecase)
    private deleteProfileUsecase: DeleteProfileUsecase
  ) {}

  public async updateMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.updateProfileUsecase.execute(userId!, req.body);
      const response = ProfileResponseMapper.toProfileDetailsResponse(
        output,
        "Profile updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.getProfileUsecase.execute(userId!);
      const response = ProfileResponseMapper.toProfileDetailsResponse(
        output,
        "Profile retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;

      const output = await this.deleteProfileUsecase.execute(userId!);
      const response = ProfileResponseMapper.toProfileDetailsResponse(
        output,
        "Profile deleted successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
