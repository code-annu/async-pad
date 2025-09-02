import { User } from "../data/model/user-model";
import { RefreshToken } from "../data/model/refresh-token-model";
import { AuthResponseDTO } from "../dto/auth-dto";

export function mapToAuthResponseDTO(
  user: User,
  refreshTokenData: RefreshToken,
  accessToken: string
) {
  const { _id: userId, username, name } = user;
  const { _id: tokenId, token, expiresAt } = refreshTokenData;
  const authResponse: AuthResponseDTO = {
    user: {
      id: userId.toString(),
      username: username,
      name: name,
    },
    accessToken: accessToken,
    refreshTokenData: {
      id: tokenId.toString(),
      token: token,
      expiresAt: expiresAt,
    },
  };
  return authResponse;
}
