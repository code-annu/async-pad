import { BaseRepository } from "./base-repository";
import { User, UserModel } from "../model/user-model";
import { Types } from "mongoose";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  async saveNewUser(
    userData: Pick<User, "username" | "passwordHash" | "name" | "bio">
  ): Promise<User> {
    const user = await super.save(userData);
    return user;
  }

  async getUserById(userId: string | Types.ObjectId): Promise<User | null> {
    return await super.getById(userId);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username: username });
    return user ? user.toObject() : null;
  }

  async listUsersByIds(userIds: string[] | Types.ObjectId[]): Promise<User[]> {
    return super.listByIds(userIds);
  }

  async updateUserById(
    userId: string,
    updatedData: Partial<User>
  ): Promise<User | null> {
    return super.updateById(userId, updatedData);
  }

  async addProjectId(
    userId: string | Types.ObjectId,
    projectId: string | Types.ObjectId
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { projectIds: projectId } }, // Append projectIds array with Safely avoid duplicates: $addToSet
      { new: true }
    );

    return updatedUser ? updatedUser.toObject() : null;
  }

  async deleteProjectId(
    userId: string | Types.ObjectId,
    projectId: string | Types.ObjectId
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { projectIds: projectId } },
      { new: true }
    );

    return updatedUser ? updatedUser.toObject() : null;
  }

  async addInvitationId(
    userId: string | Types.ObjectId,
    invitationId: string | Types.ObjectId
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { invitationIds: invitationId } },
      { new: true }
    );
    return updatedUser ? updatedUser.toObject() : null;
  }

  async removeInvitationId(
    userId: string | Types.ObjectId,
    invitationId: string | Types.ObjectId
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { invitationIds: invitationId } },
      { new: true }
    );
    return updatedUser ? updatedUser.toObject() : null;
  }
}
