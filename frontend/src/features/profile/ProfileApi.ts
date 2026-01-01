import { deleteRequest } from "../../services/api/delete-client";
import { getRequest } from "../../services/api/get-client";
import { patchRequest } from "../../services/api/patch-client";
import type { Profile, ProfileResponse, ProfileUpdate } from "./types";

export abstract class ProfileApi {
  static async getMyProfile(): Promise<Profile> {
    const res = await getRequest<ProfileResponse>("/profile/me");
    return res.data;
  }

  static async updateProfile(profile: ProfileUpdate): Promise<Profile> {
    console.log(profile);
    const res = await patchRequest<ProfileResponse>("/profile/me", profile);
    console.log(res.data);
    return res.data;
  }

  static async deleteProfile(): Promise<Profile> {
    const res = await deleteRequest<ProfileResponse>("/profile/me");
    return res.data;
  }
}
