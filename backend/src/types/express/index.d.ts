import { JWTPayload } from "../../dto/jwt-dto";

declare global {
  namespace Express {
    interface Request {
      user: JWTPayload;
    }
  }
}

export {};
