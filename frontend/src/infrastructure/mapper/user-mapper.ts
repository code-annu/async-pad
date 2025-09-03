import { type User } from "../../domain/model/user-model";
import { type AuthResponse } from "../response/auth-response";

export function mapToUser(authResponse: AuthResponse): User {
  const { username, id, name, bio, documents } = authResponse.user;
  const user: User = {
    id: id,
    username: username,
    name: name,
    bio: bio,
    accessToken: authResponse.accessToken,
    refreshToken: authResponse.refreshTokenData.token,
    documents: documents,
  };
  return user;
}
