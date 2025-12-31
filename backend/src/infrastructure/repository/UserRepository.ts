import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import {
  User,
  UserCreate,
  UserUpdate,
} from "../../domain/entities/user-entity";
import { UserModel } from "../model/user-model";
import { UserMapper } from "../mapper/user-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: UserCreate): Promise<User> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return UserMapper.toDomain(savedUser);
  }

  async update(id: string, updates: UserUpdate): Promise<User> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    if (!updatedUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(deletedUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    const users = await UserModel.find({ _id: { $in: ids } });
    return users.map(UserMapper.toDomain);
  }

  async findManyByUsername(username: string): Promise<User[]> {
    const users = await UserModel.find({
      username: { $regex: username, $options: "i" },
    });
    return users.map(UserMapper.toDomain);
  }
}
