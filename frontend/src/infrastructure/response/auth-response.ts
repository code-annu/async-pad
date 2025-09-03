import type { UserProfileResponse } from "./user-response";

export interface AuthResponse {
  user: UserProfileResponse;
  accessToken: string;
  refreshTokenData: {
    id: string;
    token: string;
    expiresAt: Date;
  };
}
