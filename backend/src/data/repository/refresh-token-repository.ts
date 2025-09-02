import { Types } from "mongoose";
import { RefreshToken, RefreshTokenModel } from "../model/refresh-token-model";
import { BaseRepository } from "./base-repository";

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor() {
    super(RefreshTokenModel);
  }
  async saveRefreshToken(
    newTokenData: Pick<RefreshToken, "token" | "userId" | "expiresAt">
  ): Promise<RefreshToken> {
    return await super.save(newTokenData);
  }

  async deleteRefreshToken(token: string) {
    await RefreshTokenModel.deleteOne({ token: token });
  }

  async deleteRefreshTokenByUserId(userId: string | Types.ObjectId) {
    await super.deleteById(userId);
  }

  async isRefreshTokenExists(token: string): Promise<boolean> {
    const foundToken = await RefreshTokenModel.findOne({ token: token });
    return foundToken != null;
  }
}
