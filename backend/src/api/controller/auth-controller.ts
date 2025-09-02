import { Request, Response } from "express";
import { AuthService } from "../../service/auth-service";
import { CustomError } from "../../error/custom-error";

export class AuthController {
  private authService = new AuthService();

  async registerPost(req: Request, res: Response) {
    try {
      const { username, password, name, bio } = req.body;
      const authResponse = await this.authService.registerUser({
        username,
        password,
        bio,
        name,
      });
      res.status(201).json({ ...authResponse });
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

  async loginPost(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const authResponse = await this.authService.loginUser(username, password);
      res.status(200).json({ ...authResponse });
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

  async refreshTokenPost(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw Error("Refresh token is required");
      const authResponse = await this.authService.refreshToken(refreshToken);
      res.status(200).json({ ...authResponse });
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
