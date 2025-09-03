import { User } from "../data/model/user-model";
import { RefreshToken } from "../data/model/refresh-token-model";
import { AuthResponseDTO } from "../dto/auth-dto";
import { UserProfileResponseDTO } from "../dto/user-dto";

export function mapToAuthResponseDTO(
  userProfile: UserProfileResponseDTO,
  refreshTokenData: RefreshToken,
  accessToken: string
) {
  const { _id: tokenId, token, expiresAt } = refreshTokenData;
  const authResponse: AuthResponseDTO = {
    user: userProfile,
    accessToken: accessToken,
    refreshTokenData: {
      id: tokenId.toString(),
      token: token,
      expiresAt: expiresAt,
    },
  };
  return authResponse;
}
