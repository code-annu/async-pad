import { UserRepository } from "../data/repository/user-repository";
import { RefreshTokenRepository } from "../data/repository/refresh-token-repository";
import { UserRegisterDTO } from "../dto/user-dto";
import { AuthResponseDTO } from "../dto/auth-dto";
import { RefreshToken } from "../data/model/refresh-token-model";
import { User } from "../data/model/user-model";
import { JWTPayload } from "../dto/jwt-dto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../util/jwt-util";
import { mapToAuthResponseDTO } from "../mapper/auth-mapper";
import bcrypt from "bcrypt";
import { CustomError } from "../error/custom-error";
import { ErrorType } from "../error/error-type";

const SALT_NUM = 10;

export class AuthService {
  private userRepository = new UserRepository();
  private refreshTokenRepository = new RefreshTokenRepository();

  async registerUser(userData: UserRegisterDTO): Promise<AuthResponseDTO> {
    const { username, password, name, bio } = userData;
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser) {
      throw new CustomError(
        "Username not available!",
        ErrorType.RESOURCE_ALREADY_EXISTS
      );
    }

    const passwordHash = await bcrypt.hash(userData.password, SALT_NUM);

    const newUser = await this.userRepository.saveNewUser({
      username,
      name,
      bio,
      passwordHash,
    });

    const [refreshTokenData, accessToken] = await this.generateAndSaveTokens(
      newUser
    );

    return mapToAuthResponseDTO(newUser, refreshTokenData, accessToken);
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<AuthResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user)
      throw new CustomError("Username not found!", ErrorType.NOT_FOUND);

    const match = bcrypt.compare(password, user.passwordHash);
    if (!match) throw new CustomError("Invalid password!", ErrorType.NOT_FOUND);

    await this.refreshTokenRepository.deleteRefreshTokenByUserId(
      user._id.toString()
    );

    const [refreshTokenData, accessToken] = await this.generateAndSaveTokens(
      user
    );

    return mapToAuthResponseDTO(user, refreshTokenData, accessToken);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDTO> {
    const decoded = verifyRefreshToken(refreshToken);
    const refreshTokenExists =
      await this.refreshTokenRepository.isRefreshTokenExists(refreshToken);
    if (!refreshTokenExists)
      throw new CustomError(
        "Refresh token is not found in database!",
        ErrorType.NOT_FOUND
      );

    const user = await this.userRepository.getUserByUsername(decoded.username);
    if (!user)
      throw new CustomError(
        "User not found! User deleted or deactivated their account",
        ErrorType.NOT_FOUND
      );

    await this.refreshTokenRepository.deleteRefreshToken(refreshToken);

    const [refreshTokenData, accessToken] = await this.generateAndSaveTokens(
      user
    );
    return mapToAuthResponseDTO(user, refreshTokenData, accessToken);
  }

  private async generateAndSaveTokens(
    user: User
  ): Promise<[RefreshToken, string]> {
    const payload: JWTPayload = {
      username: user.username,
      userId: user._id.toString(),
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const savedRefreshToken =
      await this.refreshTokenRepository.saveRefreshToken({
        token: refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

    return [savedRefreshToken, accessToken];
  }
}
