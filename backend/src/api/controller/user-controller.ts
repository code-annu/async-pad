import { CustomError } from "../../error/custom-error";
import { UserService } from "../../service/user-service";
import { Request, Response } from "express";

export class UserController {
  private userService = new UserService();

  async userProfileGet(req: Request, res: Response) {
    try {
      const { username } = req.params;
      if (!username) throw Error("Include username in path");

      const user = req.user;
      const userProfileResponse = await this.userService.getUserProfile(
        username,
        user.username === username
      );

      res.status(200).json(userProfileResponse);
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

  async userDocfilesGet(req: Request, res: Response) {
    try {
      const { username } = req.params;
      if (!username) throw Error("Include username in path");

      const userDocfilesResponse = await this.userService.getUserDocfiles(
        username
      );

      res.status(200).json(userDocfilesResponse);
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
