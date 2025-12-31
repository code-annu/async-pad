import { User } from "../../domain/entities/user-entity";
import { UserDocument } from "../model/user-model";

export class UserMapper {
  static toDomain(doc: UserDocument): User {
    return {
      id: doc._id.toString(),
      username: doc.username,
      fullname: doc.fullname,
      about: doc.about,
      avatarUrl: doc.avatarUrl,
      passwordHash: doc.passwordHash,
      isDeleted: doc.isDeleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
