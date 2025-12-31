import { ProfileOutput } from "../../application/dto/profile-dto";

export abstract class ProfileResponseMapper {
  static toProfileDetailsResponse(
    profile: ProfileOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: {
        id: profile.id,
        username: profile.isDeleted ? "deleted_user" : profile.username,
        fullname: profile.isDeleted ? "Deleted User" : profile.fullname,
        avatarUrl: profile.isDeleted ? null : profile.avatarUrl,
        about: profile.isDeleted ? null : profile.about,
        isDeleted: profile.isDeleted,
        joinedAt: profile.isDeleted ? null : profile.createdAt,
        updatedAt: profile.isDeleted ? null : profile.updatedAt,
      },
    };
  }

  static toProfileListResponse(
    profiles: ProfileOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: profiles.map((profile) => {
        return {
          id: profile.id,
          username: profile.isDeleted ? "deleted_user" : profile.username,
          avatarUrl: profile.isDeleted ? null : profile.avatarUrl,
          about: profile.isDeleted ? null : profile.about,
          isDeleted: profile.isDeleted,
        };
      }),
    };
  }
}
