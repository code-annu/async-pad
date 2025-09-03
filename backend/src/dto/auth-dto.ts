import { UserProfileResponseDTO } from "./user-dto";

export interface AuthResponseDTO {
  user: UserProfileResponseDTO;
  accessToken: string;
  refreshTokenData: {
    id: string;
    token: string;
    expiresAt: Date;
  };
}
