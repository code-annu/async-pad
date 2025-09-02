export interface AuthResponseDTO {
  user:{id: string;
  username: string;
  name: string;}
  accessToken: string;
  refreshTokenData: {
    id: string;
    token: string;
    expiresAt: Date;
  };
}
